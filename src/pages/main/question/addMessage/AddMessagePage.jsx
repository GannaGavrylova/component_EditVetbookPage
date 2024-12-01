import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import classes from "./AddMessagePage.module.css"
import { useForm } from "react-hook-form"
import { sendMessage } from '@shared/utils/apiService'
import { CustomButtonSubmit, CustomTextarea, ErrorMessage, FileUploader, ViewPageHeader } from '@shared/components'
import { useMutation } from '@tanstack/react-query'

export const AddMessagePage = () => {
  const { t } = useTranslation()
  const { questionId } = useParams()
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()
  const [files, setFiles] = useState([])

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (formData) => await sendMessage(questionId, formData),
    onSuccess: (response) => {
      //TODO: add invalidateQueries
      navigate(`/profile/my-questions/${response.question}`)
    }
    ,
    onError: (error) => {
      console.error("Error submitting form:", error)
    },
  })
  // Функция для добавления изображений
  // const handleAddImage = (event) => {
  //   const files = Array.from(event.target.files);
  //   const newImages = files.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...newImages]);
  // };

  // Функция для удаления изображения
  // const handleRemoveImage = (index) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };

  const onUpload = useCallback(
    (uploadedFiles) => {
      const newFiles = uploadedFiles.filter(
        (file) => !files.some((f) => f.name === file.name)
      )
      if (newFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
      }
    },
    [files] //TODO: refacor to reusable 
  )
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()
  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("question_id", questionId)
    formData.append("user_id", userId)
    formData.append("text", data.question)
    files.forEach((fileObj) => {
      formData.append(`files`, fileObj.file)
    })
    for (let pair of formData.entries()) {
      console.log("FormData содержит:", pair[0], "=", pair[1])
    }
    mutate(formData)
  }

  return (
    <div className={classes.p_addMessagePage}>
      <ViewPageHeader
        path={`/profile/my-questions/${questionId}`}
        fontSize={36}
        titleKey={t("P_addMessagePage.header")}
      />
      <p className={classes.p_addMessagePage_p}>{t("P_addMessagePage.addPhoto")}</p>
      <FileUploader onUpload={onUpload} />

      <p className={classes.p_addMessagePage_p}>
        {t("P_addMessagePage.additionalMessage")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomTextarea
          {...register("question", {
            required: t("P_addMessagePage.requiredField"),
          })}
          rows={8}
          cols={50}
          placeholder=" "
          style={{
            borderColor: "var(--color-input-bg-grey)",
            backgroundColor: "rgba(42, 157, 143, 0.09)",
            height: "310px",
            marginBottom: "50px",
          }}
        />
        {errors.question && (
          <p className={classes.errorText}>{errors.question.message}</p>
        )}
        {error ? <ErrorMessage message={error} /> : null}
        <div className={classes.btnBox}>
          <CustomButtonSubmit
            text={t("P_addMessagePage.sendMessage")}
            disabled={!isValid || isLoading}
          />
        </div>
      </form>
    </div>
  )
}

