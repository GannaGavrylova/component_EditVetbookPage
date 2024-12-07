import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import classes from './EditProfilePage.module.css'
import { PageHeader, CustomInput, CustomButtonSubmit, FileUploader } from '@shared/components'

export const EditProfilePage = () => {
  const { t } = useTranslation()

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      telegram: '',
      email: '',
      file: null,
    },
  })

  // const file = watch('file')

  const submitForm = (data) => {
    alert(JSON.stringify(data, null, 2))
    reset()
  }

  return (
    <div className={classes.editProfilePage}>
      <PageHeader pathArrow={'/profile'} titleKey={t('burgerMenu.editProfile')} />
      <form className={classes.editForm} onSubmit={handleSubmit(submitForm)} method="post">
        <FileUploader maxFiles={1} boxSize={160} onUpload={(fileData) => setValue('file', fileData[0])} />

        <label className={classes.formLabel}>
          {t('registrationPage.nameLabel')}
          <CustomInput placeholder={t('userPage.userName')} {...register('name')} />
        </label>
        <label className={classes.formLabel}>
          {t('registrationPage.phoneLabel')}
          <CustomInput placeholder={'+382 68 109 018'} {...register('phone')} />
        </label>

        <p className={classes.divideText}>{t('userPage.addDataToKeepInTouch')}</p>

        <label className={classes.formLabel}>
          {t('vetVerificationPage.telegramLabel')}
          <CustomInput placeholder={'@andrew_yeremin'} {...register('telegram')} />
        </label>
        <label className={classes.formLabel}>
          {t('vetVerificationPage.emailLabel')}
          <CustomInput placeholder={'andrew_yeremin@email.com'} {...register('email')} />
        </label>
        <CustomButtonSubmit text={t('userPage.saveChangesBtn')} onClick={handleSubmit(submitForm)} />
      </form>
    </div>
  )
}
