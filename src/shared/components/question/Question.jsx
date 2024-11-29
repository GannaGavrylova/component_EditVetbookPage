import { useModal } from '@shared/hooks/useModal'
import { Icon } from "./Icon"
import s from "./Question.module.css"
import { useTranslation } from "react-i18next"
import { Modal } from '@shared/components/modal/Modal'

export const Question = ({
  id = 55,
  files = [
    {
      file_url:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      file_url:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      file_url:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ],
  pet_art = "Кошка",
  pet_weight = "1 кг 200 г",
  pet_gender = "Самец",
  is_homeless = true,
  status = "IN_PROGRESS", // "IN_PROGRESS" | "COMPLETED"
  question = "Уличный кот, за которым я присматриваю, начал кашлять несколько раз в день в последние три недели. Кашель сухой, без выделений. Он активный, аппетит нормальный, но меня беспокоит частота кашля. Корм не меняли. Также прикладываю видео, где видно и слышно, как кот кашляет.",
  // openModal = () => { },
}) => {
  const { t } = useTranslation()
  const { isModalVisible, openModal, closeModal } = useModal()

  return (
    <section className={s.question_section}>
      <div className={s.question_header}>
        <p className={s.question_number}>
          {t("customMessage.questionTitle")}
          {id}
        </p>
        {status === "IN_PROGRESS" ? (
          <button className={`${s.btn} ${s.awaiting_btn}`}>
            {t("customMessage.awaitingResponse")}
          </button>
        ) : (
          <button className={`${s.btn} ${s.sentBtn}`}>
            {t("customMessage.completed")}
          </button>
        )}
        {status === "IN_PROGRESS" ? (
          <button className={`${s.btn} ${s.actions_btn}`} onClick={openModal}>
            <span>{t("userPage.actionsButton")}</span>
            <Icon />
          </button>
        ) : null}
      </div>
      <div className={s.question_images}>
        {files.length ? (
          files.map(({ file_url }, idx) => (
            <div key={idx} className={s.question_imgBox}>
              <img src={file_url} alt={`Image ${file_url}`} />
            </div>
          ))
        ) : (
          <p>{t("sendQuestionPage.noPhotos")}</p>
        )}
      </div>
      <div className={s.question_details}>
        <p>{pet_art}</p>
        <p>{pet_weight}</p>
        <p>{pet_gender}</p>
        {is_homeless ? (
          <p className={s.question_details__homeless}>
            {t("customMessage.homelessAnimal")}
          </p>
        ) : null}
      </div>
      <p className={s.question_text}>{question}</p>
      {isModalVisible ? (
        <Modal
          linksArr={[
            {
              link: `/profile/message/add/${id}`,
              text: t("Modal_locales.addMessage"),
            },
            {
              link: `/profile/my-questions/${id}/close-question`,
              text: t("closeQuestionPage.header"),
            },
          ]}
          onClose={closeModal}
        />
      ) : null}
    </section>
  )
}
