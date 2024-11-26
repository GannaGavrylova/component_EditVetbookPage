import { useTranslation } from "react-i18next"
import leftArrow from "@/assets/left-arrow.svg"
import s from "./formHeader.module.css"
import { Link } from "react-router-dom"

export const FormHeader = ({ path, titleKey, headerPadding = "0", fontSize }) => {
  const { t } = useTranslation()

  return (
    <div className={s.formHeader}>
      <Link to={path} className={s.formHeader_leftArrowBtn}>
        <img src={leftArrow} alt={t("formHeader.backButtonAlt")} />
      </Link>
      <h2 style={{ padding: headerPadding, fontSize: fontSize || "22px" }}>{t(titleKey)}</h2>
    </div>
  )
};

