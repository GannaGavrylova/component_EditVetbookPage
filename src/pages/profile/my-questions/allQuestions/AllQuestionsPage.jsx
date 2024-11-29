import { useEffect, useState } from "react"
import s from "./AllQuestionsPage.module.css"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getUserQuestions } from '@shared/utils/apiService'
import { FormHeader } from '@shared/components'
import { Question } from '@shared/components/question/Question'
import Loader from '@shared/components/loader/Loader'

export const AllQuestionsPage = () => {
  const { t } = useTranslation()
  const [questions, setQuestions] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getUserQuestions(userId)
        setQuestions(response)
        console.log(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuestions()
  }, [userId])

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={s.p_allQuestionsPage}>
      <div className={s.header}>
        <FormHeader
          path={"/profile"}
          fontSize={36}
          titleKey={t("userPage.myQuestions")}
        />
        <Link to={"/profile"}>
          <img src={close} alt="close" />
        </Link>
      </div>
      <div className={s.subtitle}>{t("userPage.myQuestions_subtitle")}</div>
      <div className={s.questions_wrapper}>
        {questions?.map((q) => (
          <Question {...q} key={q.id} />
        ))}
      </div>
    </div>
  )
}

