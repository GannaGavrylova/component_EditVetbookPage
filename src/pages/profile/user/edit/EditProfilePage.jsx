import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classes from './EditProfilePage.module.css'
import {
  FormHeader,
  CustomInput,
  CustomButtonSubmit,
  FileUploader,
} from '@shared/components'
import close from '@/assets/close.svg'

export const EditProfilePage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.editProfilePage}>
      <div className={classes.headerContainer}>
        <FormHeader
          path={'/profile'}
          fontSize={36}
          titleKey={t('burgerMenu.editProfile')}
        />
        <Link to={'/profile'}>
          <img src={close} alt="close" />
        </Link>
      </div>
      <FileUploader maxFiles={1} boxSize={160} />
      <form className={classes.editForm} action="" method="post">
        <label className={classes.formLabel}>
          {t('registrationPage.nameLabel')}
          <CustomInput placeholder={t('userPage.userName')} />
        </label>
        <label className={classes.formLabel}>
          {t('registrationPage.phoneLabel')}
          <CustomInput placeholder={t('userPage.userName')} />
        </label>

        <p className={classes.divideText}>
          {t('userPage.addDataToKeepInTouch')}
        </p>

        <label className={classes.formLabel}>
          {t('vetVerificationPage.telegramLabel')}
          <CustomInput placeholder={t('userPage.userName')} />
        </label>
        <label className={classes.formLabel}>
          {t('vetVerificationPage.emailLabel')}
          <CustomInput placeholder={t('userPage.userName')} />
        </label>
        <CustomButtonSubmit text={t('userPage.saveChangesBtn')} />
      </form>
    </div>
  )
}
