import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import s from './customSelect.module.css'

export const CustomSelect = forwardRef((props, ref) => {
  const { t } = useTranslation()
  const [selectedValue, setSelectedValue] = useState('unknown')
  const { backgroundColor, border, borderColor, borderRadius, padding, color, width, margin, optionsKey, errorMessage, showError, onChange, ...rest } = props

  const options =
    optionsKey === 'gender'
      ? [
          { value: 'male', label: t('customSelect.option.male') },
          { value: 'female', label: t('customSelect.option.female') },
          { value: 'unknown', label: t('customSelect.option.unknown') },
        ]
      : []
  const handleChange = (event) => {
    setSelectedValue(event.target.value)
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
        value={selectedValue}
        onChange={handleChange}
        defaultValue="unknow"
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
