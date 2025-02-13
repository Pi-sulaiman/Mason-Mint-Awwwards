import { FC, useContext } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Container from '@/app/layouts/Container'
import ContactInfo from '@/ui/ContactInfo/ContactInfo'
import PrestoLogo from '../../../public/icons/presto-logo.svg'
import routes from '@/utils/routes'

import styles from './Footer.module.scss'
import { Store } from '@/utils/Store'
import { useWindowSize } from 'usehooks-ts'
import { breakpointMob } from '@/utils/variables'
import { LogoComponent } from '../../ui/Logo'

const LogoBlock = () => {
  return (
    <Link scroll={false} href={routes.public.index} className={styles['logo']}>
      <LogoComponent className={styles['logo__item']} />
    </Link>
  )
}

const navigationFooterLinks = [
  {
    category: 'Sitemap',
    links: [
      { title: 'About Us', href: routes.public.about },
      { title: 'Contact Us', href: routes.public.contactUs },
    ],
  },
  {
    category: 'Products',
    links: [
      { title: 'Designs', href: routes.public.designs },
      { title: 'Custom Minting', href: routes.public.customMinting },
      { title: 'Packaging', href: routes.public.packaging },
    ],
  },
  // {
  //   category: 'follow us',
  //   links: [
  //     { title: 'Facebook', href: '' },
  //     { title: 'Instagram', href: '' },
  //     { title: 'Twitter', href: '' },
  //     { title: 'Linkedin', href: '' },
  //   ],
  // },
]

const NavigationBlock = () => {
  return (
    <div className={styles['navigation']}>
      {navigationFooterLinks.map((item) => (
        <div className={styles['navigation__column']} key={item.category}>
          <h6 className={classNames('h6', styles['navigation__column_title'])}>
            {item.category}
          </h6>
          <nav className={styles['links']}>
            {item.links.map((link) => (
              <Link
                scroll={false}
                className={styles['links__link']}
                href={link.href}
                key={link.title}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </div>
  )
}

export const Footer: FC = () => {
  const store = useContext(Store)
  const { width } = useWindowSize()
  const isVisible =
    width > breakpointMob && store?.state.isBecomeDistributorVisible

  return (
    <footer
      style={{
        position: isVisible ? 'sticky' : 'static',
      }}
      className={styles['footer']}
    >
      <Container>
        <div className={styles['footer__content']}>
          <div className={styles['footer__content_top']}>
            <LogoBlock />
            <ContactInfo />
            <NavigationBlock />
          </div>
          <div className={styles['footer__content_bottom']}>
            <Link
              scroll={false}
              href={'https://www.studiopresto.com/'}
              className={styles['creators']}
            >
              Made by <PrestoLogo className={styles['creators__logo']} />{' '}
              Studiopresto
            </Link>
            <div>
              2024 Mason Mint excellence in minting. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
