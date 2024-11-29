import { useState } from "react"
import { useTranslation } from "react-i18next"
import s from "./burgerMenu.module.css"
import { Modal } from '@shared/components/modal/Modal'

export const BurgerMenu = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // TODO: mock data replace with global storage or fetch data from back end
  const linksArr = [
    { text: t("userPage.modalOptions.editProfile"), link: "" },
    { text: t("userPage.modalOptions.preferences"), link: "/settings" },
  ]

  return (
    <div className={s.burgerMenu}>
      <div onClick={toggleMenu} className={s.burgerIcon}>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
      </div>
      {isOpen && <Modal linksArr={linksArr} onClose={toggleMenu} />}
    </div>
  )
};

