// import Image from 'next/image'

import HTMLRender from '@/partials/html-render'
import ModuleContent from '@/modules/content'
import useSecretCode from '@/hooks/use-secret-code'

import styles from '../content-blocks/index.module.scss'
import workStyles from './index.module.scss'

const WorkLink = ({ link }) => {
  return (
    <div className='cell _12 smmd_6'>
      <HTMLRender tag='h3' content={link.title} />
      <p><a href={link.url} target='_blank' rel='noopener noreferrer'>{link.label}</a></p>
    </div>
  )
}

const WorkLinks = ({ links }) => {
  if (links && links.length) {
    return (
      <div className='grid links'>
        {links.map((link, i) => <WorkLink key={link.title} link={link} />)}
      </div>
    )
  }
  return null
}

// const Images = ({ images }) => {
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
// }

const Work = ({ item }) => {
  return (
    <div className={`cell _12 ${styles.block} ${workStyles.work}`}>
      <div className='inner'>
        <header>
          <HTMLRender tag='h2' content={item.client} />
          <HTMLRender tag='p' tagAttr={{ className: 'soft' }} content={item.project} />
        </header>
        <HTMLRender content={item.content} manipulateNodes />
        <WorkLinks links={item.links} />
      </div>
    </div>
  )
}

const Works = ({ items }) => {
  const showSecret = useSecretCode(['KeyP', 'KeyS', 'KeyS', 'KeyT', 'Enter'])

  if (items && items.length) {
    return (
      <div className={`grid ${styles.blocks}`}>
        {items.map((item, i) => {
          if (!item.hidden || showSecret) {
            // <Images images={item.images} />

            return <Work key={`${item.client}-${item.role}`} item={item} />
          }
          return null
        })}
      </div>
    )
  }
  return null
}

const ModuleWorks = ({ moduleData, works }) => {
  if (moduleData) {
    return (
      <ModuleContent moduleData={moduleData}>
        {works && works.works ? <Works items={works.works} /> : null}
      </ModuleContent>
    )
  }
  return null
}

export default ModuleWorks
