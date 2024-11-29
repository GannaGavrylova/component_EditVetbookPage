import { useTranslation } from "react-i18next"
import styles from './aboutServicePage.module.css'
import banner from "@/assets/banner.png"
import FreeVetIcon from "@/assets/FreeVetIcon.svg"
import tgIcon from "@/assets/tgIcon.svg"
import TailBookBackground from "@/assets/TailBookBackground.svg"
import web from "@/assets/web.svg"
import inst from "@/assets/inst.svg"
import tg from "@/assets/tg.svg"
import linkedin from "@/assets/linkedin.svg"
import { MainFooter } from '@/pages/main/components'

export const AboutServicePage = () => {
  const { t } = useTranslation()
  const serviceDescription = t("aboutServicePage.serviceDescription")
  const tailbookDescription = t("aboutServicePage.tailbookDescription")

  const formattedDescription = serviceDescription.split(/(FreeVet|TailBook Ecosystem)/g).map((part, index) => {
    if (part === "FreeVet") {
      return <span key={index} className={styles.highlightFreeVet}>{part}</span>
    } else if (part === "TailBook Ecosystem") {
      return <span key={index} className={styles.highlightTailBook}>{part}</span>
    }
    return part
  })

  const formattedTailbookDescription = tailbookDescription.split(/(TailBook)/g).map((part, index) => {
    if (part === "TailBook") {
      return <span key={index} className={styles.highlightTailBook}>{part}</span>
    }
    return part
  })

  return (
    <div className={styles.container}>
      {/* Логотип и заголовок */}
      <div className={styles.logoSection}>
        <img src={banner} alt="Logo" className={styles.logo} />
        <h2>{t("aboutServicePage.serviceTitle")}</h2>
      </div>

      {/* Описание сервиса */}
      <p className={styles.serviceDescription}>
        {formattedDescription}
      </p>

      {/* Преимущества сервиса */}
      <div className={styles.benefitsSection}>

        <div className={styles.benefitsGrid}>
          <div className={styles.headerContainer}><h4>{t("aboutServicePage.benefitsTitle")}</h4>
            {/* <h5>{t("aboutServicePage.benefitsTitle2")}</h5> */}</div>
          <div className={`${styles.benefit} ${styles.benefit1}`}>
            <p className={styles.headerGrid}>{t("aboutServicePage.benefit1")}</p>
            <p className={styles.parGrid}>{t("aboutServicePage.benefitP1")}</p>
          </div>
          <div className={`${styles.benefit} ${styles.benefit2}`}>
            <p className={styles.headerGrid}>{t("aboutServicePage.benefit2")}</p>
            <p className={styles.parGrid}>{t("aboutServicePage.benefitP2")}</p>
          </div>
          <div className={`${styles.benefit} ${styles.benefit3}`}>
            <p className={styles.headerGrid}>{t("aboutServicePage.benefit3")}</p>
            <p className={styles.parGrid}>{t("aboutServicePage.benefitP3")}</p>
          </div>
          <div className={`${styles.benefit} ${styles.benefit4}`}>
            <p className={styles.headerGrid}>{t("aboutServicePage.benefit4")}</p>
            <p className={styles.parGrid}>{t("aboutServicePage.benefitP4")}</p>
          </div>
          <div className={`${styles.benefit} ${styles.benefit5}`}>
            <p className={styles.headerGrid}>{t("aboutServicePage.benefit5")}</p>
            <p className={styles.parGrid}>{t("aboutServicePage.benefitP5")}</p>
          </div>
          <h2>{t("aboutServicePage.statisticsTitle")}</h2>
          <div className={`${styles.stat} ${styles.stat1}`}>
            <span>{t("aboutServicePage.stat1span")}</span>
            <p>{t("aboutServicePage.stat1")}</p>
          </div>
          <div className={`${styles.stat} ${styles.stat2}`}>
            <span>{t("aboutServicePage.stat2span")}</span>
            <p>{t("aboutServicePage.stat2")}</p>
          </div>
          <div className={`${styles.stat} ${styles.stat3}`}>
            <span>{t("aboutServicePage.stat3span")}</span>
            <p>{t("aboutServicePage.stat3")}</p>
          </div>
          <div className={`${styles.stat} ${styles.stat4}`}>
            <span>{t("aboutServicePage.stat4span")}</span>
            <p>{t("aboutServicePage.stat4")}</p>
          </div>
        </div>
      </div>
      {/* Информация */}
      <div className={styles.infoSection}>
        <h3 className={styles.infoHeader}>{t("aboutServicePage.infoTitle")}</h3>
        <div className={styles.infoGrid}>
          <a
            href="https://tailbook.me/services/freevet/usersmanual"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoGridPar}
          >
            {t("aboutServicePage.info1")}
          </a>
          <a
            href="https://tailbook.me/services/freevet/termsofuse"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoGridPar}
          >
            {t("aboutServicePage.info2")}
          </a>
          <a
            href="https://tailbook.me/services/freevet/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoGridPar}
          >
            {t("aboutServicePage.info3")}
          </a>
        </div>
        <div className={styles.info}>
          <a href="https://tailbook.me/services/freevet" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
            <img src={FreeVetIcon} alt="Icon for Service 1" />
            <p>{t("aboutServicePage.linkServ1")}</p>
          </a>

          <a href="https://t.me/tailbook" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
            <img src={tgIcon} alt="Icon for Service 2" />
            <p>{t("aboutServicePage.linkServ2")}</p>
          </a>
        </div>

        {/* Отзывы о сервисе */}
        <div className={styles.info2}>
          <h3 className={styles.infoHeader}>{t("aboutServicePage.reviewsTitle")}</h3>
          <a href="https://tailbook.me/services/freevet" target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
            <img src={FreeVetIcon} alt="Icon for Service 1" />
            <p>{t("aboutServicePage.learnMoreButton")}</p>
          </a>
        </div>
      </div>

      {/* Tailbook Ecosystem */}
      <div
        className={styles.tailbookSection}
        style={{
          backgroundImage: `url(${TailBookBackground})`,
          // backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h3>{t("aboutServicePage.tailbookTitle")}</h3>
        <p>{formattedTailbookDescription}</p>
      </div>

      {/* Иконки социальных сетей */}
      <div className={styles.socialIcons}>
        <a href="https://tailbook.me" target="_blank" rel="noopener noreferrer">
          <img src={web} alt="TailBook" />
        </a>
        <a href="https://www.instagram.com/tailbook.me/" target="_blank" rel="noopener noreferrer">
          <img src={inst} alt="Instagram" />
        </a>
        <a href="https://me.linkedin.com/company/tailbookme" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="LinkedIn" />
        </a>
        <a href="https://t.me/tailbookme" target="_blank" rel="noopener noreferrer">
          <img src={tg} alt="Telegram" />
        </a>
      </div>
      <MainFooter />
    </div>
  )
}

