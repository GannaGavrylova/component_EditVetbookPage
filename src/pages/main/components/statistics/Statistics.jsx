import { useTranslation } from "react-i18next"
import s from "./statistics.module.css"

export const Statistics = () => {
  const { t } = useTranslation()

  return (
    <section className={s.statistics}>
      <h2>{t("statistics.title")}</h2>
      <div className={s.stats}>
        <div className={s.statItem}>
          <span>203</span>
          <p className={s.statNarrowText}>{t("statistics.helpedAnimals")}</p>
        </div>
        <div className={s.statItem}>
          <span>75</span>
          <p className={s.statNarrowText}>{t("statistics.helpedThisMonth")}</p>
        </div>
        <div className={s.statItem}>
          <span>550</span>
          <p>{t("statistics.donatedAmount")}</p>
        </div>
      </div>
      <h3>{t("statistics.thankYou")}</h3>
    </section>
  )
};

