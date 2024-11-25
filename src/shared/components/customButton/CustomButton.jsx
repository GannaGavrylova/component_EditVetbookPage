import { Link } from "react-router-dom"
import s from "./customButton.module.css"
import { useTranslation } from "react-i18next"

export const CustomButton = ({
  backgroundColor,
  border,
  padding,
  text = "Submit",
  link = "/",
  color,
  disabled,
  customStyle = {},
}) => {
  const { t } = useTranslation()
  const buttonClasses = disabled ? `${s.button} ${s.disabled}` : s.button

  return (
    <Link
      to={disabled ? "#" : link}
      className={buttonClasses}
      style={{
        backgroundColor: disabled
          ? backgroundColor
          : backgroundColor || "var(--color-main)",
        border: border || "none",
        padding: padding || "16px 51px",
        color: color || "var(--color-text-white)",
        lineHeight: 1.1,
        pointerEvents: disabled ? "none" : "auto",
        ...customStyle,
      }}
    >
      {text || t("customButton.submitText")}
    </Link>
  )
}

