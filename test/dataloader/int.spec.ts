import type { Payload } from 'payload'

import type { NextRESTClient } from '../helpers/NextRESTClient.js'

import { devUser } from '../credentials.js'
import { initPayloadInt } from '../helpers/initPayloadInt.js'
import configPromise, { postDoc } from './config.js'

let restClient: NextRESTClient
let payload: Payload
let token: string

describe('dataloader', () => {
  beforeAll(async () => {
    ;({ payload, restClient } = await initPayloadInt(configPromise))

    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    if (loginResult.token) token = loginResult.token
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy()
    }
  })

  describe('graphql', () => {
    it('should allow querying via graphql', async () => {
      const query = `query {
        Posts {
          docs {
            title
            owner {
              email
            }
          }
        }
      }`

      const { data } = await restClient
        .GRAPHQL_POST({
          body: JSON.stringify({ query }),
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then((res) => res.json())

      const { docs } = data.Posts
      expect(docs[0].title).toStrictEqual(postDoc.title)
    })

    it('should avoid infinite loops', async () => {
      const relationA = await payload.create({
        collection: 'relation-a',
        data: {
          richText: [
            {
              children: [
                {
                  text: 'relation a',
                },
              ],
            },
          ],
        },
      })

      const relationB = await payload.create({
        collection: 'relation-b',
        data: {
          relationship: relationA.id,
          richText: [
            {
              children: [
                {
                  text: 'relation b',
                },
              ],
            },
          ],
        },
      })

      expect(relationA.id).toBeDefined()
      expect(relationB.id).toBeDefined()

      await payload.update({
        id: relationA.id,
        collection: 'relation-a',
        data: {
          relationship: relationB.id,
          richText: [
            {
              children: [
                {
                  text: 'relation a',
                },
              ],
            },
            {
              type: 'relationship',
              children: [
                {
                  text: '',
                },
              ],
              relationTo: 'relation-b',
              value: {
                id: relationB.id,
              },
            },
          ],
        },
      })

      const relationANoDepth = await payload.findByID({
        id: relationA.id,
        collection: 'relation-a',
        depth: 0,
      })

      expect(relationANoDepth.relationship).toStrictEqual(relationB.id)

      const relationAWithDepth = await payload.findByID({
        id: relationA.id,
        collection: 'relation-a',
        depth: 4,
      })

      const innerMostRelationship =
        relationAWithDepth.relationship.relationship.richText[1].value.relationship.relationship

      expect(innerMostRelationship).toStrictEqual(relationB.id)
    })
  })
})
