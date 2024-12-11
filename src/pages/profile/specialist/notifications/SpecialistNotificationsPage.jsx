import classes from './SpecialistNotificationsPage.module.css'
import { useTranslation } from 'react-i18next'
import { PageHeader, Toggler } from '@shared/components'

export const SpecialistNotificationsPage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.specialistNotificationsPage}>
      <PageHeader pathArrow={'/specialist-profile/settings'} titleKey={t('settings.notifications')} padding="24px 0" fontSize={22} showClose={false} />
      <label className={classes.switchNotifications}>
        {t('E_settingsNotificationProfileUserPage.vetAnswers')}
        <Toggler />
      </label>

      <label className={classes.switchNotifications}>
        {t('E_settingsNotificationProfileUserPage.serviceNews')}
        <Toggler />
      </label>
    </div>
  )
}
