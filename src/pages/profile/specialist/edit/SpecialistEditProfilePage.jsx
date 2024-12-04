import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classes from './SpecialistEditProfilePage.module.css'
import { FormHeader } from '@shared/components'
import close from '@/assets/close.svg'

export const SpecialistEditProfilePage = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.specialistEditProfilePage}>
      <div className={classes.headerContainer}>
        <FormHeader
          path={'/specialist-profile'}
          fontSize={36}
          titleKey={t('burgerMenu.editProfile')}
        />
        <Link to={'/specialist-profile'}>
          <img src={close} alt="close" />
        </Link>
      </div>
      <p>Profile specialist</p>
    </div>
  )
}
