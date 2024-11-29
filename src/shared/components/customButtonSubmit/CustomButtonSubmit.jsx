import s from "./customButtonSubmit.module.css"
import { useTranslation } from "react-i18next"

export const CustomButtonSubmit = ({
  backgroundColor,
  border,
  padding,
  text,
  type = "submit",
  color,
  disabled,
  customStyle = {},
  onClick,
}) => {
  const { t } = useTranslation()
  const buttonClasses = disabled ? `${s.button} ${s.disabled}` : s.button

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      style={{ //TODO: refactor to class
        backgroundColor: disabled
          ? backgroundColor
          : backgroundColor || "var(--color-main)",
        border: border || "none",
        padding: padding || "16px 51px",
        color: color || "var(--color-text-white)",
        lineHeight: 1.1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...customStyle,
      }}
    >
      {text || t("customButton.submitText")}
    </button>
  )
};


