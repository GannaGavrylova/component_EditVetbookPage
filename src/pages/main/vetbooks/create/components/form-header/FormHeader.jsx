import { useTranslation } from 'react-i18next'
import leftArrow from '@/assets/left-arrow.svg'
import s from './formHeader.module.css'
import { Link } from 'react-router-dom'
import closeIcon from '@/assets/close.svg'

const FormHeader = ({ backPath, closePath, titleKey, size = 'default', className }) => {
  const { t } = useTranslation()
  console.log(className)
  return (
    <header className={`${s.formHeader} ${className || ''}`}>
      {backPath && (
        <Link to={backPath} className={s.backBtn} aria-label={t('formHeader.backButtonAlt')}>
          <img src={leftArrow} alt="" />
        </Link>
      )}
      <h2 className={s[`size-${size}`]}>{t(titleKey)}</h2>
      {closePath && (
        <Link to={closePath} className={s.closeBtn}>
          <img src={closeIcon} alt="" />
        </Link>
      )}
    </header>
  )
}

export default FormHeader
