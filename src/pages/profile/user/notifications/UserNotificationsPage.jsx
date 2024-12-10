import classes from './UserNotificationsPage.module.css'
import { useTranslation } from 'react-i18next'
import { PageHeader, CustomCheckbox } from '@shared/components'

export const UserNotificationsPage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.userNotificationsPage}>
      <PageHeader pathArrow={'/profile/settings'} titleKey={t('settings.notifications')} padding="24px 0" fontSize={22} showClose={false} />
      <label className={classes.swichNotifications}>
        {t('E_settingsNotificationProfileUserPage.vetAnswers')}
        <CustomCheckbox />
      </label>

      <label className={classes.swichNotifications}>
        {t('E_settingsNotificationProfileUserPage.serviceNews')}
        <CustomCheckbox />
      </label>
    </div>
  )
}
