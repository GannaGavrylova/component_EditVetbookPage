import { useTranslation } from "react-i18next"
import close from "@/assets/close.svg"
import s from "./viewPageHeader.module.css"
import { Link } from "react-router-dom"

export const ViewPageHeader = ({ path, titleKey, headerPadding = "0", fontSize }) => {
  const { t } = useTranslation()

  return (
    <div className={s.viewPageHeader}>
      <h2 style={{ padding: headerPadding, fontSize: fontSize || "22px" }}>
        {t(titleKey)}
      </h2>
      <Link to={path} className={s.viewPageHeader_closeBtn}>
        <img src={close} alt={t("formHeader.backButtonAlt")} />
      </Link>
    </div>
  )
};

