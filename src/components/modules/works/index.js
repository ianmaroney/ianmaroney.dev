import { memo } from 'react'

// import Image from 'next/image'

import HTMLRender from '@/partials/html-render'
import ContentRender from '@/partials/content-render'

import { stringToSlug } from '@/util'
import useSecretCode from '@/hooks/use-secret-code'

import styles from './index.module.scss'

const Links = memo(({ links }) => {
  if (links && links.length) {
    return (
      <>
        <div className='grid links'>
          {links.map((link, i) => {
            return (
              <div key={link.title} className='cell _12 smmd_6'>
                <HTMLRender tag='h3' content={link.title} />
                <p><a href={link.url} target='_blank' rel='noopener noreferrer'>{link.label}</a></p>
              </div>
            )
          })}
        </div>
      </>
    )
  }
  return null
})

// const Images = memo(({ images }) => {
//   if (images && images.length) {
//     return (
//       <div className='grid images'>
//         {images.map((image, i) => {
//           return (
//             <figure key={`${i} ${image.alt}`} className='cell _12 md_6'>
//               <Image src={`/images/${image.src}`} alt={image.alt} layout='responsive' width={image.width} height={image.height} />
//             </figure>
//           )
//         })}
//       </div>
//     )
//   }
//   return null
// })

const Works = memo(({ items, showSecret }) => {
  if (items && items.length) {
    return (
      <div className={`grid ${styles.works}`}>
        {items.map((item, i) => {
          if (!item.hidden || showSecret) {
            // <Images images={item.images} />

            return (
              <div className={`cell _12 ${styles.block}`} key={`${item.client}-${item.role}`}>
                <div className='inner'>
                  <header>
                    <HTMLRender tag='h2' content={item.client} />
                    <HTMLRender tag='p' tagAttr={{ className: 'soft' }} content={item.project} />
                  </header>
                  <ContentRender content={item.content} />
                  <Links links={item.links} />
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
  return null
})

const ModuleWorks = memo(({ moduleData, works }) => {
  const showSecret = useSecretCode(['KeyP', 'KeyS', 'KeyS', 'KeyT', 'Enter'])

  if (moduleData) {
    return (
      <section id={stringToSlug(moduleData.title)}>
        <header>
          <HTMLRender tag='h1' content={moduleData.heading} />
          <ContentRender content={moduleData.content} />
          <Works items={works.works} showSecret={showSecret} />
        </header>
      </section>
    )
  }
  return null
})

export default ModuleWorks
