import classes from "./ViewQuestionPage.module.css"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from '@shared/components/loader/Loader'
import { SpecialistAnswer, ViewPageHeader } from '@shared/components'
import { Question } from '@shared/components/question/Question'
import { getMessages, getQuestionById } from '@shared/utils/apiService'

export const ViewQuestionPage = () => {
  const { t } = useTranslation()
  const { questionId } = useParams()
  const userId = localStorage.getItem("userId")
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState([])
  const [answers, setAnswers] = useState(null)

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      const response = await getQuestionById(questionId)
      setQuestion(response)
      const messages = await getMessages(questionId)
      setAnswers(messages)
      setIsLoading(false)
    }
    fetchQuestionAndAnswers()
  }, [userId, questionId])

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={classes.p_viewQuestionPage}>
      <ViewPageHeader
        path={"/profile/questions"}
        fontSize={36}
        titleKey={t("userPage.viewQuestion")}
      />
      <Question {...question} />
      {answers.map((answer, i) => (
        <SpecialistAnswer key={i} text={answer.text} isUser={answer.is_user} />
      ))}
    </div>
  )
}

