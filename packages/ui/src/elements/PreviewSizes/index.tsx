import type {
  Data,
  FileSizes,
  SanitizedCollectionConfig,
  SanitizedUploadConfig,
} from 'payload/types'

import React, { useEffect, useMemo, useState } from 'react'

import Meta from '../FileDetails/Meta'
import './index.scss'

const baseClass = 'preview-sizes'

const sortSizes = (sizes: FileSizes, imageSizes: SanitizedUploadConfig['imageSizes']) => {
  if (!imageSizes || imageSizes.length === 0) return sizes

  const orderedSizes: FileSizes = {}

  imageSizes.forEach(({ name }) => {
    if (sizes[name]) {
      orderedSizes[name] = sizes[name]
    }
  })

  return orderedSizes
}

type PreviewSizeCardProps = {
  active: boolean
  meta: FileSizes[0]
  name: string
  onClick?: () => void
  previewSrc: string
}
const PreviewSizeCard: React.FC<PreviewSizeCardProps> = ({
  name,
  active,
  meta,
  onClick,
  previewSrc,
}) => {
  return (
    <div
      className={[`${baseClass}__sizeOption`, active && `${baseClass}--selected`]
        .filter(Boolean)
        .join(' ')}
      onClick={typeof onClick === 'function' ? onClick : undefined}
      onKeyDown={(e) => {
        if (typeof onClick !== 'function') return
        if (e.key === 'Enter') onClick()
      }}
      role="button"
      tabIndex={0}
    >
      <div className={`${baseClass}__image`}>
        <img alt={meta.filename} src={previewSrc} />
      </div>
      <div className={`${baseClass}__sizeMeta`}>
        <div className={`${baseClass}__sizeName`}>{name}</div>
        <Meta {...meta} />
      </div>
    </div>
  )
}

const PreviewSizes: React.FC<{
  doc: Data & {
    sizes?: FileSizes
  }
  imageCacheTag?: string
  uploadConfig: SanitizedCollectionConfig['upload']
}> = ({ doc, imageCacheTag, uploadConfig }) => {
  const { imageSizes } = uploadConfig
  const { sizes } = doc

  const [orderedSizes, setOrderedSizes] = useState<FileSizes>(() => sortSizes(sizes, imageSizes))
  const [selectedSize, setSelectedSize] = useState<null | string>(null)

  const generateImageUrl = (doc) => {
    if (!doc.filename) return null
    if (doc.url) return `${doc.url}${imageCacheTag ? `?${imageCacheTag}` : ''}`
  }
  useEffect(() => {
    setOrderedSizes(sortSizes(sizes, imageSizes))
  }, [sizes, imageSizes, imageCacheTag])

  const mainPreviewSrc = selectedSize
    ? generateImageUrl(doc.sizes[selectedSize])
    : generateImageUrl(doc)

  const originalImage = useMemo(
    (): FileSizes[0] => ({
      filename: doc.filename,
      filesize: doc.filesize,
      height: doc.height,
      mimeType: doc.mimeType,
      width: doc.width,
    }),
    [doc],
  )
  const originalFilename = 'Original'

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__imageWrap`}>
        <div className={`${baseClass}__meta`}>
          <div className={`${baseClass}__sizeName`}>{selectedSize || originalFilename}</div>
          <Meta {...(selectedSize ? orderedSizes[selectedSize] : originalImage)} />
        </div>
        <img alt={doc.filename} className={`${baseClass}__preview`} src={mainPreviewSrc} />
      </div>
      <div className={`${baseClass}__listWrap`}>
        <div className={`${baseClass}__list`}>
          <PreviewSizeCard
            active={!selectedSize}
            meta={originalImage}
            name={originalFilename}
            onClick={() => setSelectedSize(null)}
            previewSrc={generateImageUrl(doc)}
          />

          {Object.entries(orderedSizes).map(([key, val]) => {
            const selected = selectedSize === key
            const previewSrc = generateImageUrl(val)

            if (previewSrc) {
              return (
                <PreviewSizeCard
                  active={selected}
                  key={key}
                  meta={val}
                  name={key}
                  onClick={() => setSelectedSize(key)}
                  previewSrc={previewSrc}
                />
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
export default PreviewSizes
