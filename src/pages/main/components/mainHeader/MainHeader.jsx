import { useTranslation } from "react-i18next"
import classes from "./mainHeader.module.css"
import leftPaw from "@/assets/main_header_img/path_to_left_paw.png"
import catAndDog from "@/assets/main_header_img/path_to_cat_and_dog.png"
import rightPaw from "@/assets/main_header_img/path_to_right_paw.png"

export const MainHeader = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <h1 className={classes.title}>{t("mainHeader.title")}</h1>
        <p className={classes.description}>{t("mainHeader.description")}</p>
        <div className={classes.imagesContainer}>
          <img src={leftPaw} alt="Left Paw" className={classes.leftPaw} />
          <img src={catAndDog} alt="Cat and Dog" className={classes.mainImage} />
          <img src={rightPaw} alt="Right Paw" className={classes.rightPaw} />
        </div>
      </div>
    </div>
  )
}

