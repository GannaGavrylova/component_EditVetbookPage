import { Link } from "react-router-dom"
import clases from "./Modal.module.css"
import { useTranslation } from "react-i18next"

export const Modal = ({ linksArr, onClose }) => {
  const { t } = useTranslation()

  return (
    <div className={clases.modal}>
      <div className={clases.modalContent}>
        <ul>
          {linksArr.map((link) => (
            <Link key={link.link} to={link.link}>
              <li>
                <p>{t(link.text)}</p>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4L16.5 12L8 20.5"
                    stroke="#242424"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            </Link>
          ))}
        </ul>
        <button type="button" className={clases.close} onClick={onClose}>
          <h5>{t("formHeader.backButtonAlt")}</h5>
        </button>
      </div>
    </div>
  )
};



