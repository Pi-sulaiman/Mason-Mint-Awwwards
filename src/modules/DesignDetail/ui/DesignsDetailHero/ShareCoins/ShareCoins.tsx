import { FC, memo, useCallback } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'next-share'
import { ProductProps } from '@/utils/types'
import LinkIcon from 'public/icons/link.svg'
import Facebook from 'public/icons/facebook.svg'
import Twitter from 'public/icons/X.svg'
import Linkedin from 'public/icons/linkedin.svg'

import styles from './ShareCoins.module.scss'

const AnimatedElement = dynamic(
  () => import('@/ui/AnimatedElement/AnimatedElement')
)

type ShareCoinsProps = {
  className?: string
  product?: ProductProps
}

const ShareCoins: FC<ShareCoinsProps> = ({ className }) => {
  const { asPath } = useRouter()
  const [_, copy] = useCopyToClipboard()
  const sharedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`

  const handleCopy = useCallback(() => {
    copy(sharedUrl)
      .then(() => {
        toast.success('Link copied!', {
          className: classNames(styles['toast'], styles['toast-success']),
        })
      })
      .catch(() => {
        toast.error('Something went wrong!', {
          className: classNames(styles['toast'], styles['toast-error']),
        })
      })
  }, [sharedUrl, copy])

  return (
    <div className={classNames(styles['ShareCoins'], className)}>
      <AnimatedElement>
        <h6>share coins</h6>
      </AnimatedElement>
      <AnimatedElement className={styles['linksList']}>
        <span>
          <LinkIcon className={styles['icon']} onClick={handleCopy} />
        </span>
        <FacebookShareButton url={sharedUrl}>
          <Facebook className={styles['icon']} />
        </FacebookShareButton>
        <TwitterShareButton url={sharedUrl}>
          <Twitter className={styles['icon']} />
        </TwitterShareButton>
        <LinkedinShareButton url={sharedUrl}>
          <Linkedin className={styles['icon']} />
        </LinkedinShareButton>
      </AnimatedElement>
    </div>
  )
}

export default memo(ShareCoins)
