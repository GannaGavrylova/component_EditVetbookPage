
import { useTranslation } from "react-i18next"
import classes from "./donatePage.module.css"
import logo from "@/assets/VectorLogo.png"
import { useNavigate } from "react-router-dom"
import { CustomButtonSubmit, CustomStickTitle } from '@shared/components'
import { MainFooter } from '@/pages/main/components'

export const DonatePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className={classes.donateContainer}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </div>
      <h2 className={classes.mainTitle}>{t("DonatePage.title")}</h2>
      <h3 className={classes.supportTitle}>
        {t("DonatePage.financialSupportTitle")}
      </h3>

      <div className={classes.donateSection}>
        <CustomStickTitle
          text={t("DonatePage.oneTimeSupportTitle")}
          style={{
            backgroundColor: "var(--color-main)",
            color: "white",
            marginLeft: "auto",
          }}
        />
        {/* <p style={{ marginTop: "-10px" }}>
          {t("DonatePage.amountPlaceholder")}
        </p> */}

        {/* Инпут суммы */}
        {/* <CustomInput
          placeholder={t("DonatePage.amountPlaceholder")}
          type="number"
          defaultValue={5}
          className={classes.donateInput}
          style={{
            backgroundColor: "rgba(42, 157, 143, 0.08)",
            border: "1px solid var(--color-main)",
            padding: "10px",
            borderRadius: "12px",
            width: "100%",
            boxSizing: "border-box",
          }}
        /> */}

        {/* Текст-подсказка под инпутом суммы */}
        <p style={{ width: "80%", marginBottom: "22px", marginTop: "10px" }}>
          {t("DonatePage.amountHelpText")}
        </p>

        {/* Кнопка оплаты */}

        <CustomButtonSubmit
          text={t("DonatePage.payButton")}
          onClick={() => {
            window.open(
              "https://www.patreon.com/tailbook/membership?showCustomPledge=true",
              "_blank"
            )
            navigate("/profile")
          }}
          className={classes.payButton}
          customStyle={{
            width: "98%",
          }}
        />
      </div>

      <div className={classes.otherSupportSection}>
        <CustomStickTitle
          text={t("DonatePage.otherSupportOptionsTitle")}
          style={{
            backgroundColor: "var(--color-main)",
            color: "white",
            marginBottom: "5px",
            marginLeft: "auto",
          }}
          className={classes.donateStickTitle}
        />

        <p style={{ width: "75%", marginBottom: "30px", marginTop: "24px" }}>
          {t("DonatePage.moreSupportInfo")}
        </p>

        {/* Кнопка "Ознакомиться" */}
        <CustomButtonSubmit
          text={t("DonatePage.learnMoreButton")}
          onClick={() =>
            window.open("https://tailbook.me/supporttheproject", "_blank")
          }
          customStyle={{
            width: "98%",
          }}
        />
      </div>

      {/* Текст о поддержке FreeVet в любое время */}
      <p className={classes.supportAnytimeText}>
        {t("DonatePage.supportAnytimeText")}
      </p>
      <h3 className={classes.joinTitle}>{t("DonatePage.joinProjectTitle")}</h3>

      <div className={classes.joinSection}>
        <CustomStickTitle
          text={t("DonatePage.applyButton")}
          style={{
            backgroundColor: "var(--color-main)",
            color: "white",
            marginLeft: "auto",
          }}
          className={classes.donateStickTitle}
        />
        <p style={{ width: "75%" }}>{t("DonatePage.joinProjectDescription")}</p>

        <div className={classes.buttonGroup}>
          {/* Кнопка "Заполнить форму" */}
          <CustomButtonSubmit
            text={t("DonatePage.fillFormButton")}
            onClick={() =>
              window.open("https://tailbook.me/services/freevet", "_blank")
            }
            className={classes.fillFormButton}
            customStyle={{
              padding: "15px 12px",
              fontSize: "14px",
              width: "50%",
            }}
          />

          {/* Кнопка "Написать нам" */}
          <CustomButtonSubmit
            text={t("DonatePage.contactUsButton")}
            onClick={() => window.open("mailto:tailbookme@gmail.com")}
            className={classes.contactUsButton}
            customStyle={{
              padding: "15px 12px",
              fontSize: "14px",
              width: "50%",
            }}
          />
        </div>
      </div>

      <h4 className={classes.joinTitle}>{t("DonatePage.footerThankYou")}</h4>

      <MainFooter />
    </div>
  )
};

