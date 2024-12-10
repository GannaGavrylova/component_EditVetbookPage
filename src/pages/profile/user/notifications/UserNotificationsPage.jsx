import classes from './UserNotificationsPage.module.css'
import { useTranslation } from 'react-i18next'
import { PageHeader, CustomCheckbox } from '@shared/components'

export const UserNotificationsPage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.userNotificationsPage}>
      <PageHeader />
      <div className={classes.swichNotifications}>
        <p className={classes.h5Notifications}>{t('E_settingsNotificationProfileUserPage.vetAnswers')}</p>
        <CustomCheckbox />
      </div>

      <div className={classes.swichNotifications}>
        <p className={classes.h5Notifications}>{t('E_settingsNotificationProfileUserPage.vetAnswers')}</p>
        <CustomCheckbox />
      </div>
    </div>
  )
}
