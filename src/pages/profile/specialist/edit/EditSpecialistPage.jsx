import { useTranslation } from 'react-i18next'
import classes from './EditSpecialistPage.module.css'
import { PageHeader, CustomInput, CustomButtonSubmit, FileUploader } from '@shared/components'

export const EditSpecialistPage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.specialistEditProfilePage}>
      <PageHeader titleKey={t('burgerMenu.editProfile')} />
      <FileUploader maxFiles={1} boxSize={160} />
      <form className={classes.editForm} action="" method="post">
        <label className={classes.formLabel}>
          {t('registrationPage.nameLabel')}
          <CustomInput placeholder={t('userPage.userName')} />
        </label>
        <label className={classes.formLabel}>
          {t('registrationPage.phoneLabel')}
          <CustomInput placeholder={'+382 68 109 018'} />
        </label>

        <p className={classes.divideText}>{t('userPage.addDataToKeepInTouch')}</p>

        <label className={classes.formLabel}>
          {t('vetVerificationPage.telegramLabel')}
          <CustomInput placeholder={'@andrew_yeremin'} />
        </label>
        <label className={classes.formLabel}>
          {t('vetVerificationPage.emailLabel')}
          <CustomInput placeholder={'andrew_yeremin@email.com'} />
        </label>
        <CustomButtonSubmit text={t('userPage.saveChangesBtn')} />
      </form>

      <p>Profile specialist</p>
    </div>
  )
}
