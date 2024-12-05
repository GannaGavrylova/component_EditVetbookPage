import { updateUserRole } from '@shared/utils/apiService'
import classes from './ChooseRolePage.module.css'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CustomButtonSubmit, CustomCheckbox, CustomStickTitle, ErrorMessage, FormHeader } from '@shared/components'

export const ChooseRolePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [searchParams] = useSearchParams()
  const user_id = searchParams.get('user_id')

  useEffect(() => {
    if (user_id) {
      localStorage.setItem('userId', user_id)
    }
  }, [user_id])

  const [userRoles, setUserRoles] = useState({
    user_id,
    homelessAnimals: false,
    pets: false,
    volunteer: false,
    shelterWorker: false,
    petOwner: false,
  })

  const [vetRoles, setVetRoles] = useState({
    user_id,
    vetDoctor: false,
    cynologist: false,
    zooPsychologist: false,
  })

  const isUserRoleSelected = Object.entries(userRoles)
    .filter(([key]) => key !== 'user_id')
    .some(([_, value]) => value === true)

  const isVetRoleSelected = Object.entries(vetRoles)
    .filter(([key]) => key !== 'user_id')
    .some(([_, value]) => value === true)

  const isAnyRoleSelected = isUserRoleSelected || isVetRoleSelected

  const roleBasedLink = isUserRoleSelected ? '/main' : isVetRoleSelected ? '/verification/role/vet/vet-verification' : '/'

  const handleUserRoleChange = (e) => {
    const { name, checked } = e.target
    setUserRoles((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
    if (checked) {
      setVetRoles({
        user_id,
        vetDoctor: false,
        cynologist: false,
        zooPsychologist: false,
      })
    }
  }

  const handleVetRoleChange = (e) => {
    const { name, checked } = e.target
    setVetRoles((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
    if (checked) {
      setUserRoles({
        user_id,
        homelessAnimals: false,
        pets: false,
        volunteer: false,
        shelterWorker: false,
        petOwner: false,
      })
    }
  }

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async () => {
    try {
      if (isUserRoleSelected) {
        await updateUserRole(userRoles)
      } else if (isVetRoleSelected) {
        await updateUserRole(vetRoles)
      }
      reset()
      navigate(roleBasedLink)
    } catch (error) {
      setErrorMessage(t('errorMessages.formSendError'))
      console.error('Ошибка при отправке формы:', error)
    }
  }

  return (
    <div className={classes.l_userRolePage}>
      <div className={classes.formHeader}>
        <FormHeader path="/" fontSize={36} titleKey={t('userRolePage.header')} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formBox}>
          <h5 className={classes.formBox_header}>{t('userRolePage.role')}</h5>

          <div className={`${classes.formBox_checkboxBox_user} ${isVetRoleSelected ? classes.disabledBox : ''}`}>
            <span>
              <p className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.helpWithFreeVet')}</p>
              <div className={classes.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox {...register('homelessAnimals')} name="homelessAnimals" onChange={handleUserRoleChange} checked={userRoles.homelessAnimals} disabled={isVetRoleSelected} /> <span className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.helpHomelessAnimals')}</span>
                </span>
                <span>
                  <CustomCheckbox {...register('pets')} name="pets" onChange={handleUserRoleChange} checked={userRoles.pets} disabled={isVetRoleSelected} /> <span className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.helpPets')}</span>
                </span>
              </div>
            </span>
            <span>
              <p className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.tellAboutYourself')}</p>
              <div className={classes.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox {...register('volunteer')} name="volunteer" onChange={handleUserRoleChange} checked={userRoles.volunteer} disabled={isVetRoleSelected} /> <span className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.volunteer')}</span>
                </span>
                <span style={{ position: 'relative', right: '5px' }}>
                  <CustomCheckbox {...register('shelterWorker')} name="shelterWorker" onChange={handleUserRoleChange} checked={userRoles.shelterWorker} disabled={isVetRoleSelected} /> <span className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.shelterWorker')}</span>
                </span>
              </div>
            </span>
            <span>
              <div className={classes.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox {...register('petOwner')} name="petOwner" onChange={handleUserRoleChange} checked={userRoles.petOwner} disabled={isVetRoleSelected} /> <span className={isVetRoleSelected ? classes.disabledText : ''}>{t('userRolePage.havePet')}</span>
                </span>
              </div>
              <span className={isVetRoleSelected ? classes.disabledText : ''} style={{ position: 'absolute', bottom: '-1px', right: '-1px' }}>
                <CustomStickTitle backgroundColor={'white'} text={t('userRolePage.userStick')} />
              </span>
            </span>
          </div>

          <div className={classes.lineBox}>
            <div className={classes.line}></div>
            <p>{t('userRolePage.or')}</p>
            <div className={classes.line}></div>
          </div>

          <div className={`${classes.formBox_checkboxBox_specialist} ${isUserRoleSelected ? classes.disabledBox : ''}`}>
            <span>
              <p className={isUserRoleSelected ? classes.disabledText : ''}>{t('userRolePage.wantToJoin')}</p>
              <div className={classes.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox {...register('vetDoctor')} name="vetDoctor" onChange={handleVetRoleChange} checked={vetRoles.vetDoctor} disabled={isUserRoleSelected} /> <span className={isUserRoleSelected ? classes.disabledText : ''}>{t('userRolePage.vetDoctor')}</span>
                </span>
              </div>
            </span>
            <span>
              <div className={classes.formBox_checkboxBox_pets}>
                <span>
                  <CustomCheckbox {...register('cynologist')} name="cynologist" onChange={handleVetRoleChange} checked={vetRoles.cynologist} disabled={isUserRoleSelected} /> <span className={isUserRoleSelected ? classes.disabledText : ''}>{t('userRolePage.cynologist')}</span>
                </span>
              </div>
            </span>
            <div className={classes.formBox_checkboxBox_pets}>
              <span>
                <CustomCheckbox {...register('zooPsychologist')} name="zooPsychologist" onChange={handleVetRoleChange} checked={vetRoles.zooPsychologist} disabled={isUserRoleSelected} /> <span className={isUserRoleSelected ? classes.disabledText : ''}>{t('userRolePage.zooPsychologist')}</span>
              </span>
              <span className={isUserRoleSelected ? classes.disabledText : ''} style={{ position: 'absolute', bottom: '-1px', right: '-1px' }}>
                <CustomStickTitle text={t('userRolePage.vetStick')} backgroundColor={'white'} />
              </span>
            </div>
          </div>
          <ErrorMessage message={errorMessage} />
        </div>
        <div className={classes.buttonBox}>
          <CustomButtonSubmit onClick={handleSubmit} text={t('userRolePage.saveBtn')} padding="16px 78px" disabled={!isAnyRoleSelected} />
        </div>
      </form>
    </div>
  )
}
