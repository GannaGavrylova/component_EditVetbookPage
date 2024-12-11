import classes from './SpecialistSettingsPage.module.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader, LanguageSwitcher } from '@shared/components'

export const SpecialistSettingsPage = () => {
  const { t } = useTranslation()
  return (
    <div className={classes.specialistSettingsPage}>
      <PageHeader pathArrow={'/profile'} pathClose={'/profile'} titleKey={t('burgerMenu.settings')} />

      <Link to={'/specialist-profile/settings/notifications'}>
        <div className={classes.linkContainer}>
          <p>{t('settings.notifications')}</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L16.5 12L8 20.5" stroke="#242424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>

      <div className={classes.langContainer}>
        <p>{t('settings.language')}</p>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
