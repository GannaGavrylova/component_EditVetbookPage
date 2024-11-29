import styles from "./SpecialistAnswer.module.css"
import { useTranslation } from "react-i18next"

export const SpecialistAnswer = ({ text, isUser }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.answer_container}>
      {isUser ? (
        <h5 className={styles.answer_heading}>{t("userPage.vetAnswer")}</h5>
      ) : (
        <h5 className={styles.answer_heading}>
          {t("userPage.additionalQuestion")}
        </h5>
      )}
      <p className={styles.answer_contents}>{text}</p>
    </div>
  )
};

