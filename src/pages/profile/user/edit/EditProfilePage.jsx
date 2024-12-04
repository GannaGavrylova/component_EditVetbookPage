import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classes from './EditProfilePage.module.css'
import { FormHeader } from '@shared/components'
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
      <p>тут работа кипит</p>
    </div>
  )
}
