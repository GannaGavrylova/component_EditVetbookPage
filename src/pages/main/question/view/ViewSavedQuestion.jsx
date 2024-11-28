import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import close from "@/assets/close.svg"
import classes from "./ViewSavedQuestion.module.css"
import Loader from "@shared/components/loader/Loader"
import { FormHeader } from '@shared/components/formHeader/FormHeader'
import { getUserQuestions } from '@shared/utils/apiService'
import { Modal } from '@shared/components/modal/Modal'
import { Question } from '@shared/components/question/Question'

export const ViewSavedQuestion = () => {
  const { t } = useTranslation()
  const userId = localStorage.getItem("userId")
  const [question, setQuestion] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getUserQuestions(userId)
      const len = response.length - 1
      setQuestion(response[len])
      setIsLoading(false)
    }
    fetchQuestions()
  }, [userId])

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={classes.q_confirmationPage}>
      <div className={classes.header}>
        <FormHeader
          path="/main/ask-question"
          fontSize={36}
          titleKey={t("questionPage.title")}
        />
        <Link to="/main/question/ask">
          <img className={classes.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <div className={classes.question_box}>
        <Question {...question} openModal={() => setIsOpen(true)} />
        {isOpen ? (
          <Modal
            linksArr={[
              {
                link: `/profile/message/add/${question.id}`,
                text: t("Modal_locales.addMessage"), //TODO: handle user or spec 
              },
              {
                link: `/profile/my-questions/${question.id}/close-question`,
                text: t("closeQuestionPage.header"),
              },
            ]}
            onClose={() => setIsOpen(false)}
          />
        ) : null}
      </div>
    </div>
  )
}

