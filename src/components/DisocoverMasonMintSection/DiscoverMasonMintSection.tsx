import { FC, useRef } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useScroll } from 'framer-motion'
import { MarqueeText } from '@/ui/MarqueeText/MarqueeText'

const Coin = dynamic(() => import('./Coin/Coin'), { ssr: false })

import styles from './DiscoverMasonMintSection.module.scss'

type DiscoverMasonMintSectionProps = {
  className?: string
}

export const DiscoverMasonMintSection: FC<DiscoverMasonMintSectionProps> = ({
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  return (
    <section
      ref={targetRef}
      className={classNames(styles['DiscoverMasonMintSection'], className)}
    >
      <div className={styles['stickyContainer']}>
        <Coin scrollYProgress={scrollYProgress} />
        <MarqueeText
          text={'discover meet mason mint.'}
          scrollYProgress={scrollYProgress}
          outputRange={['75%', '-100%']}
        />
      </div>
    </section>
  )
}
