import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import close from "@/assets/close.svg"
import classes from "./ViewSavedQuestion.module.css"
import Loader from "@shared/components/loader/Loader"
import { FormHeader } from '@shared/components/formHeader/FormHeader'
import { getUserQuestions } from '@shared/utils/apiService'
import { Question } from '@shared/components/question/Question'
import { useQuery } from '@tanstack/react-query'
import { ErrorMessage } from '@shared/components'

export const ViewSavedQuestion = () => {
  const { t } = useTranslation()
  const userId = localStorage.getItem("userId")
  const { data: questions, isLoading, error } = useQuery({ queryKey: ['questions'], queryFn: () => getUserQuestions(userId) })

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
        <Link to="/main">
          <img className={classes.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <div className={classes.question_box}>
        <Question {...questions[questions.length - 1]} />
        {error ? <ErrorMessage message={error} /> : null}
      </div>
    </div>
  )
}

