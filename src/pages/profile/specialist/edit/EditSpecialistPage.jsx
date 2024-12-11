import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import classes from './EditSpecialistPage.module.css'
import { PageHeader, CustomInput, CustomButtonSubmit, FileUploader } from '@shared/components'

export const EditSpecialistPage = () => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      telegram: '',
      email: '',
      file: null,
    },
  })

  const submitForm = (data) => {
    alert(JSON.stringify(data, null, 2))
    reset()
  }

  return (
    <div className={classes.specialistEditProfilePage}>
      <PageHeader pathArrow={'/profile'} titleKey={t('burgerMenu.editProfile')} />

      <form className={classes.editForm} onSubmit={handleSubmit(submitForm)} method="post">
        <FileUploader maxFiles={1} boxSize={160} onUpload={(fileData) => setValue('file', fileData[0])} />

        <label className={classes.formLabel}>
          {t('registrationPage.nameLabel')}*
          <CustomInput placeholder={t('userPage.userName')} {...register('name', { required: t('sendQuestionPage.requiredField') })} showError={!!errors.name} errorMessage={errors.name?.message} />
        </label>

        <label className={classes.formLabel}>
          {t('registrationPage.phoneLabel')}*
          <CustomInput
            placeholder={'+382 68 109 018'}
            {...register('phone', {
              required: t('registrationPage.phoneErrorRequired'),
              validate: (value) => {
                if (!value.startsWith('+') && !/^\+\d+$/.test(value)) {
                  return t('registrationPage.phoneErrorPattern')
                }
              },
            })}
            showError={!!errors.phone}
            errorMessage={errors.phone?.message}
          />
        </label>

        <p className={classes.divideText}>{t('userPage.addDataToKeepInTouch')}</p>

        <label className={classes.formLabel}>
          {t('vetVerificationPage.telegramLabel')}
          <CustomInput placeholder={'@andrew_yeremin'} {...register('telegram', { validate: (value) => value.startsWith('@') })} showError={!!errors.telegram} errorMessage={errors.telegram?.message} />
        </label>

        <label className={classes.formLabel}>
          {t('vetVerificationPage.emailLabel')}
          <CustomInput placeholder={'andrew_yeremin@email.com'} {...register('email', { validate: (value) => /\S+@\S+\.\S+/.test(value) })} showError={!!errors.email} errorMessage={errors.email?.message} />
        </label>

        <CustomButtonSubmit text={t('userPage.saveChangesBtn')} onClick={handleSubmit(submitForm)} />
      </form>
    </div>
  )
}
