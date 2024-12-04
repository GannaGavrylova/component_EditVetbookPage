import { useTranslation } from 'react-i18next'
import close from '@/assets/close.svg'
import leftArrow from '@/assets/left-arrow.svg'
import s from './pageHeader.module.css'
import { Link } from 'react-router-dom'

export const PageHeader = ({
  pathArrow,
  pathClose,
  titleKey,
  padding = '0',
  fontSize,
  showArrow = true,
  showClose = true,
}) => {
  const { t } = useTranslation()

  return (
    <div className={s.container} style={{ padding: padding }}>
      <div className={s.buttonSpace}>
        {showArrow && (
          <Link to={pathArrow} className={s.arrowBtn}>
            <img src={leftArrow} alt={t('formHeader.backButtonAlt')} />
          </Link>
        )}
      </div>

      <p style={{ fontSize: fontSize || '36px' }}>{t(titleKey)}</p>

      <div className={s.buttonSpace}>
        {showClose && (
          <Link to={pathClose} className={s.closeBtn}>
            <img src={close} alt={t('formHeader.backButtonAlt')} />
          </Link>
        )}
      </div>
    </div>
  )
}
