import s from "./AllQuestionsPage.module.css"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getUserQuestions } from '@shared/utils/apiService'
import { ErrorMessage, FormHeader } from '@shared/components'
import { Question } from '@shared/components/question/Question'
import Loader from '@shared/components/loader/Loader'
import { useQuery } from '@tanstack/react-query'
import close from "@/assets/close.svg"

export const AllQuestionsPage = () => {
  const { t } = useTranslation()
  const userId = localStorage.getItem("userId")
  const { data: questions, isLoading, error } = useQuery({ queryKey: ['questions'], queryFn: () => getUserQuestions(userId) })

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
        <Link to={"/main"}>
          <img src={close} alt="close" />
        </Link>
      </div>
      <div className={s.subtitle}>{t("userPage.myQuestions_subtitle")}</div>
      <div className={s.questions_wrapper}>
        {questions?.map((q) => (
          <Question {...q} key={q.id} />
        ))}
        {error ? <ErrorMessage message={error.message} /> : null}
      </div>
    </div>
  )
}

