import { useTranslation } from 'react-i18next'
import {
  FileUploader,
  CustomInput,
  CustomButtonSubmit,
  ErrorMessage,
} from '@/shared/components'
import classes from '../CreateVetbookPage.module.css'

export const CreateVetbookForm = ({
  register,
  handleSubmit,
  errors,
  isLoading,
  error,
  onUpload,
  onSubmit,
  isFormValid,
}) => {
  const { t } = useTranslation(null, {
    keyPrefix: 'main/vetbooks/create-vetbook',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={classes.petNameLabel}>
        {t('petName')}
        <span>*</span>
      </label>
      <CustomInput
        {...register('petName', {
          required: t('validationMessages.required'),
          minLength: {
            value: 2,
            message: t('validationMessages.minLength'),
          },
        })}
        color={'var(--color-text-dark)'}
        borderColor="var(--color-main)"
        width={328}
      />
      {errors.petName && (
        <p className={classes.errorMessage}>{errors.petName.message}</p>
      )}
      <p>{t('addPhoto')}*</p>
      <FileUploader onUpload={onUpload} />
      <label className={classes.petSpeciesLabel}>
        {t('petSpecies')} <span>*</span>
      </label>
      <CustomInput
        {...register('petSpecies', {
          required: t('validationMessages.required'),
          minLength: {
            value: 2,
            message: t('validationMessages.minLength'),
          },
        })}
        color={'var(--color-text-dark)'}
        borderColor="var(--color-main)"
        width={328}
      />
      {errors.petSpecies && (
        <p className={classes.errorMessage}>{errors.petSpecies.message}</p>
      )}
      <label>
        {t('petWeight')} <span>*</span>
      </label>
      <CustomInput
        {...register('petWeight', {
          required: t('validationMessages.required'),
        })}
        color={'var(--color-text-dark)'}
        borderColor="var(--color-main)"
        width={153}
        placeholder=""
      />
      {errors.petWeight && (
        <p className={classes.errorMessage}>{errors.petWeight.message}</p>
      )}
      <label>
        {t('petGender')} <span>*</span>
      </label>
      <CustomInput
        {...register('petGender', {
          required: t('validationMessages.required'),
        })}
        color={'var(--color-text-dark)'}
        borderColor="var(--color-main)"
        width={153}
      />
      {errors.petGender && (
        <p className={classes.errorMessage}>{errors.petGender.message}</p>
      )}
      {error && (
        <div className={classes.errorBox}>
          <ErrorMessage message={t('errorMessages.formSendError')} />
        </div>
      )}

      <p className={classes.vetBookDescription}>{t('vetBookDescription')}</p>
      <div className={classes.btnBox}>
        <CustomButtonSubmit
          customStyle={{ width: '100%' }}
          text={t('createButton')}
          disabled={!isFormValid || isLoading}
        />
      </div>
    </form>
  )
}
