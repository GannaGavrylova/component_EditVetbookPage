import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { getUserQuestions } from '@shared/utils/apiService'

import classes from './MainFooter.module.css'
import PlusWhite from '@/assets/PlusWhite.png'
import Profile from '@/assets/Profile.png'
import Vectore from '@/assets/Vector.png'
import Paw from '@/assets/paw.png'

export const MainFooter = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const isVetPath = pathname.startsWith('/vet')
  const userId = localStorage.getItem('userId')

  const links = isVetPath
    ? [
        { icon: PlusWhite, label: t('footer.main'), path: '/vet/main' },
        { icon: Profile, label: t('footer.profile'), path: '/vet/profile' },
        { icon: Vectore, label: t('footer.donate'), path: '/vet/donate' },
        { icon: Paw, label: t('footer.service'), path: '/vet/about' },
      ]
    : [
        { icon: PlusWhite, label: t('footer.main'), path: '/main' },
        { icon: Profile, label: t('footer.profile'), path: '/profile' },
        { icon: Vectore, label: t('footer.donate'), path: '/donate' },
        { icon: Paw, label: t('footer.service'), path: '/about' },
      ]

  const handleLinkClick = (path) => {
    if (
      (pathname === '/main' && path === '/main') ||
      (pathname === '/vet/main' && path === '/vet/main')
    ) {
      window.location.reload()
    }
  }

  const handleProfileHover = () => {
    if (userId) {
      queryClient.prefetchQuery({
        queryKey: ['questions'],
        queryFn: () => getUserQuestions(userId),
      })
    }
  }

  return (
    <div className={classes.footer}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={classes.footerItem}
          onClick={() => handleLinkClick(link.path)}
          onMouseEnter={() => {
            if (link.label === t('footer.profile')) {
              handleProfileHover()
            }
          }}
        >
          <img
            src={link.icon}
            alt={link.label}
            className={classes.footerIcon}
          />
          <span className={classes.footer_links}>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
