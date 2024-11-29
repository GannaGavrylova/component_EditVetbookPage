import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import classes from "./CloseQuestionPage.module.css"
import { useTranslation } from "react-i18next"
import { closeMessage } from '@shared/utils/apiService'
import { CustomCheckbox, CustomTextarea, CustomButtonSubmit, ErrorMessage } from '@shared/components'
import { useMutation } from '@tanstack/react-query'

//TODO Добавить URL-адрес

export const CloseQuestionPage = () => {
  const { questionId } = useParams()

  const { t } = useTranslation()
  const [selectedRating, setSelectedRating] = useState(null)
  const [textareaValue, setTextareaValue] = useState("")
  //TODO: selectedRating&textareaValue rewrite with useForm
  const navigate = useNavigate()

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (formData) => await closeMessage(questionId, formData),
    onSuccess: () => navigate("/donate"),
    onError: (error) => {
      console.error("Error submitting form:", error)
    },
  })

  const handleCheckboxChange = (e) => {
    const { name } = e.target
    setSelectedRating(parseInt(name))
  }

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedRating) return

    const formData = new FormData()
    formData.append("text", textareaValue)
    formData.append("score", selectedRating)
    mutate(formData)
  }

  return (
    <div className={classes.closeQuestionPage}>
      <h2>{t("closeQuestionPage.header")}</h2>
      <h5>{t("closeQuestionPage.confirmation")}</h5>
      <p
        className={classes.closeQuestionText}
        dangerouslySetInnerHTML={{
          __html: t("closeQuestionPage.ratingPrompt"),
        }}
      />{" "}
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.checkboxContainer}>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index + 1} className={classes.checkboxWrapper}>
              <CustomCheckbox
                checked={selectedRating === index + 1}
                onChange={handleCheckboxChange}
                name={(index + 1).toString()}
              />
              <span>{index + 1}</span>
            </div>
          ))}
        </div>
        <div className={classes.areaContainer}>
          <p>{t("closeQuestionPage.feedbackPrompt")}</p>
          <CustomTextarea
            backgroundColor="#2A9D8F16"
            value={textareaValue}
            onChange={handleTextareaChange}
          />
          {error ? <ErrorMessage message={error} /> : null}
        </div>
        <CustomButtonSubmit
          text={t("closeQuestionPage.submitButton")}
          type="submit"
          disabled={!selectedRating || isLoading}
          customStyle={{ marginTop: "80px" }}
        />
      </form>
    </div>
  )
}

