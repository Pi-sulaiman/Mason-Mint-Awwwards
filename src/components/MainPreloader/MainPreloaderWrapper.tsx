import React, { FC, useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from '@studio-freight/react-lenis'
import { Store } from '@/utils/Store'

const MainPreloader = dynamic(
  () => import('@/components/MainPreloader/MainPreloader'),
  { ssr: false }
)

import styles from './MainPreloader.module.scss'

const MainPreloaderWrapper: FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(true)
  const store = useContext(Store)
  const isFirstLoading = store?.state.isFirstLoading
  const lenis = useLenis()

  // Disable scroll
  if (lenis && isFirstLoading) {
    lenis.stop()
  }

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevState) => {
        if (prevState === 3) {
          clearInterval(progressInterval)
          setIsVisible(false)
          return prevState
        }
        // Back to top
        window.scrollTo(0, 0)
        return prevState + 1
      })
    }, 800)
    return () => {
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <div className={styles['preloader__bg']} />
          <MainPreloader progress={progress} />
        </>
      )}
    </AnimatePresence>
  )
}

export default MainPreloaderWrapper
