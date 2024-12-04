import { useTranslation } from 'react-i18next'
import close from '@/assets/close.svg'
import leftArrow from '@/assets/left-arrow.svg'
import s from './pageHeader.module.css'
import { Link } from 'react-router-dom'

export const PageHeader = ({
  path,
  titleKey,
  headerPadding = '0',
  fontSize,
  showArrow = false,
  showClose = true,
}) => {
  const { t } = useTranslation()

  return (
    <div className={s.container}>
      {showArrow && (
        <Link to={path} className={s.arrowBtn}>
          <img src={leftArrow} alt={t('formHeader.backButtonAlt')} />
        </Link>
      )}
      <h2 style={{ padding: headerPadding, fontSize: fontSize || '22px' }}>
        {t(titleKey)}
      </h2>
      {showClose && (
        <Link to={path} className={s.closeBtn}>
          <img src={close} alt={t('formHeader.backButtonAlt')} />
        </Link>
      )}
    </div>
  )
}
