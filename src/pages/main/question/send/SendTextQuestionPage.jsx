import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import classes from "./sendTextQuestionPage.module.css"
import close from "@/assets/close.svg"

import { updateQuestion } from '@shared/utils/apiService'
import { CustomButtonSubmit, LineHeader, FormHeader, CustomTextarea } from '@/shared/components'
import { useMutation, useQueryClient, } from '@tanstack/react-query'
import { ErrorMessage } from '@shared/components'

export const SendTextQuestionPage = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { petArt, petWeight, petGender, isHomeless, files, userId } =
    location.state || {}

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  })
  const queryClient = useQueryClient()
  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data) => await updateQuestion(data),
    onSuccess: () => {
      navigate(`/profile/my-questions/`)
      queryClient.invalidateQueries({ queryKey: ['questions'] })
    },
    //TODO: response must include question Id to navigate to this question /profile/my-questions/questionId
    onError: (error) => {
      console.error("Error submitting form:", error)
    },
  })

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        user_id: userId,
        questions: data.question,
      }
      mutate(dataToSend)
    } catch (error) {
      console.error("Ошибка при отправке вопроса", error)
    }
  }

  return (
    <div className={classes.q_sendQuestionPage}>
      <div className={classes.q_sendQuestionPage_header}>
        <FormHeader
          path="//main/ask-question"
          fontSize={36}
          titleKey={t("questionPage.title")}
        />
        <Link to={"//main/ask-question"}>
          <img className={classes.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} right={"var(--color-main)"} />
      <p className={classes.q_sendQuestionPage_file_p}>
        {t("sendQuestionPage.addedMedia")}
      </p>
      <div className={classes.q_sendQuestionPage_fileBox}>
        {files?.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className={classes.fileBox}>
              {file.type.startsWith("image") ? (
                <img
                  src={file.url || URL.createObjectURL(file)}
                  alt={`uploaded-file-${index}`}
                />
              ) : file.type.startsWith("video") ? (
                <video controls src={file.data || URL.createObjectURL(file)} />
              ) : (
                <p>{t("sendQuestionPage.unsupportedFileFormat")}</p>
              )}
            </div>
          ))
        ) : (
          <p>{t("sendQuestionPage.noPhotos")}</p>
        )}
      </div>
      <div className={classes.q_sendQuestionPage_description}>
        <p>
          {/* {t("sendQuestionPage.petArt")}:  */}
          {petArt}
        </p>
        <p>
          {/* {t("sendQuestionPage.petWeight")}: */}
          {petWeight}
        </p>
        <p>
          {/* {t("sendQuestionPage.petGender")}: */}
          {petGender}
        </p>
        <p>{isHomeless ? t("sendQuestionPage.homeless") : null}</p>
      </div>
      <p className={classes.q_sendQuestionPage_p}>
        {t("sendQuestionPage.writeQuestion")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTextarea
          {...register("question", {
            required: t("sendQuestionPage.requiredField"),
          })}
          rows={8}
          cols={50}
          placeholder={t("sendQuestionPage.questionPlaceholder")}
          style={{
            borderColor: "var(--color-input-bg-grey)",
            backgroundColor: "var(--color-text-white)",
            height: "310px",
          }}
        />
        {errors.question && (
          <p className={classes.errorText}>{errors.question.message}</p>
        )}
        {error ? <ErrorMessage message={error} /> : null}
        <div className={classes.btnBox}>
          <CustomButtonSubmit
            text={t("sendQuestionPage.submitButton")}
            padding={"16px 99.5px"}
            disabled={!isValid || isLoading}
          />
        </div>
      </form>
    </div>
  )
}

