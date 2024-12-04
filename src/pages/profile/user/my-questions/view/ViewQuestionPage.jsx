import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import classes from './ViewQuestionPage.module.css'
import Loader from '@shared/components/loader/Loader'
import { ErrorMessage, SpecialistAnswer, PageHeader } from '@shared/components'
import { Question } from '@shared/components/question/Question'
import { getMessages, getQuestionById } from '@shared/utils/apiService'

export const ViewQuestionPage = () => {
  const { t } = useTranslation()
  const { questionId } = useParams()

  const {
    data: question,
    isLoading: isLoadingQuestion,
    isError: errorQuestion,
  } = useQuery({
    queryKey: ['question'],
    queryFn: () => getQuestionById(questionId),
  })
  const {
    data: messages,
    isLoading: isLoadingMessages,
    isError: errorMessages,
  } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages(questionId),
  })

  if (isLoadingQuestion || isLoadingMessages) {
    return <Loader />
  }
  return (
    <div className={classes.p_viewQuestionPage}>
      <PageHeader
        path={'/profile/my-questions'}
        fontSize={36}
        titleKey={t('userPage.viewQuestion')}
      />
      {question ? <Question {...question} /> : <Navigate to={'/not-found'} />}
      {errorQuestion ? <ErrorMessage message={errorQuestion} /> : null}
      {messages?.map((answer, i) => (
        <SpecialistAnswer key={i} text={answer.text} isUser={answer.is_user} />
      ))}
      {errorMessages ? <ErrorMessage message={errorMessages} /> : null}
    </div>
  )
}
