import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import s from "./customInput.module.css"

export const CustomInput = forwardRef((props, ref) => {
  const { t } = useTranslation()

  const {
    backgroundColor,
    border,
    borderColor,
    borderRadius,
    padding,
    placeholder,
    color,
    width,
    margin,
    errorMessage,
    showError,
    ...rest
  } = props

  return (
    <div style={{ marginBottom: "10px" }}>
      {" "}
      <input
        className={s.customInput}
        style={{
          backgroundColor: backgroundColor || "var(--color-text-white)",
          border: border || "0.5px solid",
          borderColor: borderColor || "var(--color-input-bg-grey)",
          borderRadius: borderRadius || "10px",
          padding: padding || "12px 10px",
          color: color || "var(--color-input-bg-grey)",
          width: width || "100%",
          margin: margin || "0",
          lineHeight: 1.1,
        }}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {showError && (
        <p style={{ color: "red", marginTop: "5px" }}>
          {errorMessage || t("customInput.defaultErrorMessage")}
        </p>
      )}
    </div>
  )
})

CustomInput.displayName = "CustomInput"


