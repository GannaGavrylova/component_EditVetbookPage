import classes from "./opportunity.module.css"
import OppAdd from "@/assets/opportunityImg/oppAdd.svg"
import OppVetBook from "@/assets/opportunityImg/oppVetBook.svg"
import OppNavKl from "@/assets/opportunityImg/oppNavKl.svg"
import OppNavApt from "@/assets/opportunityImg/oppNavApt.svg"
import Online from "@/assets/opportunityImg/online.svg"
import More from "@/assets/opportunityImg/more.svg"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const Opportunity = () => {
  const { t } = useTranslation()

  return (
    <section className={classes.opportunity}>
      <h2>{t("opportunity.title")}</h2>
      <div className={classes.featureCards}>
        <div className={classes.cat}>
          <Link to="/main/ask-question">
            <div className={classes.heroImageBox}>
              <img
                src={OppAdd}
                alt={t("opportunity.catImageAlt")}
                className={classes.cardImage}
              />
            </div>
            <h4>{t("opportunity.askQuestion")}</h4>
          </Link>
        </div>
        <div className={classes.rightCatBox}>
          <div className={classes.card}>
            <img
              src={OppNavKl}
              alt={t("opportunity.clinicImageAlt")}
              className={classes.cardImage}
            />
            <h3 className={classes.titleWithStatus}>
              {t("opportunity.clinicNavigator")}
              <span className={classes.status}>{t("opportunity.inDevelopment")}</span>
            </h3>
          </div>
          <div className={classes.card}>
            <img
              src={OppNavApt}
              alt={t("opportunity.pharmacyImageAlt")}
              className={classes.cardImage}
            />
            <h3 className={classes.titleWithStatus}>
              {t("opportunity.pharmacyNavigator")}
              <span className={classes.status}>{t("opportunity.inDevelopment")}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className={classes.boxcard}>
        <div className={classes.toocard}>
          <img
            src={OppVetBook}
            alt={t("opportunity.dogImageAlt")}
            className={classes.cardImage}
          />
          <h3>
            {t("opportunity.veterinaryBooks")}
            <span className={classes.status}>{t("opportunity.inDevelopment")}</span>
          </h3>
        </div>
        <div className={classes.toocard}>
          <img
            src={Online}
            alt={t("opportunity.onlineCatImageAlt")}
            className={classes.cardImage}
          />
          <h3 className={classes.titleWithStatus}>
            {t("opportunity.onlineReception")}
            <span className={classes.status}>{t("opportunity.inDevelopment")}</span>
          </h3>
        </div>
        <div className={classes.toocard}>
          <img
            src={More}
            alt={t("opportunity.moreImageAlt")}
            className={classes.cardImage}
          />
          <h3 className={classes.titleWithStatus}>
            {t("opportunity.more")}
            <span className={classes.status}>{t("opportunity.inDevelopment")}</span>
          </h3>
        </div>
      </div>
    </section>
  )
}


