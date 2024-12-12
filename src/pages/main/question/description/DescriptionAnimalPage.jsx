import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import classes from './DescriptionAnimalPage.module.css'
// import { useMutation } from '@tanstack/react-query'
// import { addQuestion } from '@shared/utils/apiService'
import close from '@/assets/close.svg'
import { FormHeader, LineHeader, FileUploader, CustomInput, CustomCheckbox, CustomSelect, useTranslatedOptions, CustomButtonSubmit } from '@/shared/components'

export const DescriptionAnimalPage = () => {
  const { t } = useTranslation()
  const { genderOptions, animalTypeOptions } = useTranslatedOptions()
  // const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [files, setFiles] = useState([])
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [isCustomAnimal, setIsCustomAnimal] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
  })

  // const { mutate, isLoading, error } = useMutation({
  //   mutationFn: async ({ formData }) => await addQuestion(formData),
  //   onSuccess: (_response, variables) => {
  //     navigate('/main/ask-question/question-text', {
  //       state: { ...variables.submissionData },
  //     })
  //   },
  //   onError: (error) => {
  //     console.error('Error submitting form:', error)
  //   },
  // })

  const onUpload = useCallback(
    (uploadedFiles) => {
      const newFiles = uploadedFiles.filter((file) => !files.some((f) => f.name === file.name))
      if (newFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
      }
    },
    [files]
  )

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.url) {
          URL.revokeObjectURL(file.url)
        }
      })
    }
  }, [files])

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('petArt', data.petArt)
    formData.append('petWeight', data.petWeight)
    formData.append('petGender', data.petGender)
    formData.append('isHomeless', isCheckboxChecked)

    files.forEach((fileObj) => {
      formData.append('files', fileObj.file)
    })

    const submissionData = {
      userId,
      petArt: data.petArt,
      petWeight: data.petWevalueight,
      petGender: data.petGender,
      isHomeless: isCheckboxChecked,
      files,
    }
    console.log({ formData, submissionData })
  }

  const handleHomelessChange = (e) => {
    setIsCheckboxChecked(e.target.checked)
  }
  const handleAnimalChange = (event) => {
    const selectedValue = event.target.value
    if (selectedValue === 'other') {
      setIsCustomAnimal(true)
      setValue('petArt', '')
    } else {
      setIsCustomAnimal(false)
      setValue('petArt', selectedValue)
    }

    setIsCustomAnimal(selectedValue === 'other')
  }
  const petArt = watch('petArt')
  const petWeight = watch('petWeight')
  const petGender = watch('petGender')

  const isFormValid = isValid && petArt && petWeight && petGender

  const validatePetWeight = (value, t) => {
    const normalizedValue = value.replace(',', '.')

    const isValidNumber = /^[0-9]+(\.[0-9]{1,3})?$/.test(normalizedValue)

    if (!isValidNumber) {
      return t('descriptionAnimalPage.validationMessages.petWeight.invalidFormat')
    }
    const weight = parseFloat(normalizedValue)
    if (weight <= 0 || weight > 100) {
      return t('descriptionAnimalPage.validationMessages.petWeight.permissibleWeight')
    }
    return true
  }

  return (
    <div className={classes.q_descriptionAnimalPage}>
      <div className={classes.q_descriptionAnimalPage_header}>
        <FormHeader path="/main/ask-question" fontSize={36} titleKey={t('questionPage.title')} />
        <Link to={'/main'}>
          <img className={classes.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={'var(--color-main)'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{t('descriptionAnimalPage.addMedia')}</p>
        <FileUploader maxFiles={3} boxSize={104} borderRadius={20} onUpload={onUpload} />
        <label className={classes.label}>
          {t('descriptionAnimalPage.petArt')}
          <span className={classes.requiredSymbol}>{t('descriptionAnimalPage.requiredSymbol')}</span>
        </label>
        {/* вид животного */}
        {!isCustomAnimal ? (
          <div>
            <CustomSelect
              {...register('petArt', {
                required: t('descriptionAnimalPage.validationMessages.petArt.selectAnimal'),
              })}
              options={animalTypeOptions}
              // defaultValue="cat"
              color={'var(--color-text-dark)'}
              borderColor="var(--color-main)"
              width={328}
              onChange={handleAnimalChange}
            />
            {/* {errors.petArt && <p style={{ color: 'red' }}>
            {error.petArt.message || t('descriptionAnimalPage.error.generic')}</p>} */}
          </div>
        ) : (
          <div>
            <CustomInput
              {...register('petArt', {
                required: t('descriptionAnimalPage.validationMessages.petArt.required'),

                minLength: {
                  value: 2,
                  message: t('descriptionAnimalPage.validationMessages.petArt.minLength'),
                },
              })}
              color={'var(--color-text-dark)'}
              borderColor="var(--color-main)"
              defaultValue=""
              width={328}
            />
            {errors.petArt && <p style={{ color: 'red' }}>{errors.petArt.message || t('descriptionAnimalPage.error.generic')}</p>}
          </div>
        )}
        <label className={classes.label}>
          {t('descriptionAnimalPage.petWeight')} <span className={classes.requiredSymbol}>{t('descriptionAnimalPage.requiredSymbol')}</span>
        </label>

        {/* Примерный вес животного */}
        <CustomInput
          {...register('petWeight', {
            required: t('descriptionAnimalPage.validationMessages.petWeight.required'),
            validate: (value) => validatePetWeight(value, t),
          })}
          color={'var(--color-text-dark)'}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petWeight && <p style={{ color: 'red' }}>{errors.petWeight.message}</p>}
        <label className={classes.label}>
          {t('descriptionAnimalPage.petGender')} <span className={classes.requiredSymbol}>{t('descriptionAnimalPage.requiredSymbol')}</span>
        </label>

        {/* пол животного  */}

        <CustomSelect
          padding={'10px'}
          {...register('petGender', {
            required: t('descriptionAnimalPage.validationMessages.petGender.required'),
          })}
          options={genderOptions}
          defaultValue="unknown"
          color={'var(--color-text-dark)'}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petGender && <p style={{ color: 'red' }}>{errors.petGender.message}</p>}
        <span className={classes.checkboxBox}>
          <CustomCheckbox {...register('confirmation')} name="confirmation" onChange={handleHomelessChange} checked={isCheckboxChecked} /> <span>{t('descriptionAnimalPage.homelessCheckbox')}</span>
        </span>
        {/* {error && (
          <div className={classes.errorBox}>
            <ErrorMessage message={t('errorMessages.formSendError')} />
          </div>
        )} */}
        <div className={classes.btnBox}>
          <CustomButtonSubmit
            text={t('descriptionAnimalPage.continueButton')}
            padding={'16px 120.5px'}
            disabled={
              !isFormValid
              // ||isLoading
            }
          />
        </div>
      </form>
    </div>
  )
}
