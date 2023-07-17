import React from 'react'
import { notFound } from 'next/navigation'

import { Product, Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { PaywallBlocks } from '../../../_components/PaywallBlocks'
import { ProductHero } from '../../../_heros/Product'

const Product = async ({ params: { slug } }) => {
  const product = await fetchDoc<Product>({
    collection: 'products',
    slug,
  })

  if (!product) return notFound()

  const { layout } = product

  return (
    <React.Fragment>
      <ProductHero product={product} />
      <Blocks blocks={layout} />
      <PaywallBlocks productSlug={slug as string} disableTopPadding />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  const products = await fetchDocs<ProductType>('products')

  return products?.map(({ slug }) => slug)
}

export default Product
