import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import s from './customSelect.module.css'

export const CustomSelect = forwardRef((props, ref) => {
  const { t } = useTranslation()
  const { options = [], backgroundColor, border, borderColor, borderRadius, padding, color, width, margin, errorMessage, showError, onChange, value, ...rest } = props

  const handleChange = (event) => {
    if (onChange) {
      onChange(event)
    }
  }
  return (
    <div>
      <select
        className={s.customSelect}
        style={{
          backgroundColor: backgroundColor || 'var(--color-text-white)',
          border: border || '0.5px solid',
          borderColor: borderColor || 'var(--color-input-bg-grey)',
          borderRadius: borderRadius || '10px',
          padding: padding || '12px 10px',
          color: color || 'var(--color-input-bg-grey)',
          width: width || '100%',
          margin: margin || '0',
          lineHeight: 1.1,
        }}
        ref={ref}
        value={value}
        onChange={handleChange}
        {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
      {showError && <p style={{ color: 'red', marginTop: '5px' }}>{errorMessage || t('customSelect.defaultErrorMessage')}</p>}
    </div>
  )
})

CustomSelect.displayName = 'CustomSelect'
