import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import classes from "./DescriptionAnimalPage.module.css"
import close from "@/assets/close.svg"
import { addQuestion } from "@shared/utils/apiService"
import {
  FormHeader,
  LineHeader,
  FileUploader,
  CustomInput,
  CustomCheckbox,
  ErrorMessage,
  CustomButtonSubmit,
} from "@/shared/components"

export const DescriptionAnimalPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")
  const [files, setFiles] = useState([])
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async ({ formData }) =>
      await addQuestion(formData),
    onSuccess: (_response, variables) => {
      navigate("/main/ask-question/question-text", {
        state: { ...variables.submissionData },
      })
    },
    onError: (error) => {
      console.error("Error submitting form:", error)
    },
  })

  const onUpload = useCallback(
    (uploadedFiles) => {
      const newFiles = uploadedFiles.filter(
        (file) => !files.some((f) => f.name === file.name)
      )
      if (newFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles])
      }
    },
    [files]
  )

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.url) {
          URL.revokeObjectURL(file.url)
        }
      })
    }
  }, [files])

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("petArt", data.petArt)
    formData.append("petWeight", data.petWeight)
    formData.append("petGender", data.petGender)
    formData.append("isHomeless", isCheckboxChecked)

    files.forEach((fileObj) => {
      formData.append("files", fileObj.file)
    })

    const submissionData = {
      userId,
      petArt: data.petArt,
      petWeight: data.petWeight,
      petGender: data.petGender,
      isHomeless: isCheckboxChecked,
      files,
    }

    mutate({ formData, submissionData })
  }

  const handleHomelessChange = (e) => {
    setIsCheckboxChecked(e.target.checked)
  }

  const petArt = watch("petArt")
  const petWeight = watch("petWeight")
  const petGender = watch("petGender")

  const isFormValid = isValid && petArt && petWeight && petGender

  return (
    <div className={classes.q_descriptionAnimalPage}>
      <div className={classes.q_descriptionAnimalPage_header}>
        <FormHeader
          path="/main/ask-question"
          fontSize={36}
          titleKey={t("questionPage.title")}
        />
        <Link to={"/main"}>
          <img className={classes.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{t("descriptionAnimalPage.addMedia")}</p>
        <FileUploader
          maxFiles={3}
          boxSize={104}
          borderRadius={20}
          onUpload={onUpload}
        />
        <label style={{ alignSelf: "start" }}>
          {t("descriptionAnimalPage.petArt")}{" "}
          <span style={{ color: "#2A9D8F" }}>
            {t("descriptionAnimalPage.requiredSymbol")}
          </span>
        </label>
        <CustomInput
          {...register("petArt", {
            required: t(
              "descriptionAnimalPage.validationMessages.petArt.required"
            ),
            minLength: {
              value: 2,
              message: t(
                "descriptionAnimalPage.validationMessages.petArt.minLength"
              ),
            },
          })}
          color={"var(--color-text-dark)"}
          borderColor="var(--color-main)"
          width={328}
        />
        {errors.petArt && (
          <p style={{ color: "red" }}>{errors.petArt.message}</p>
        )}
        <label style={{ alignSelf: "start" }}>
          {t("descriptionAnimalPage.petWeight")}{" "}
          <span style={{ color: "#2A9D8F" }}>
            {t("descriptionAnimalPage.requiredSymbol")}
          </span>
        </label>
        <CustomInput
          {...register("petWeight", {
            required: t(
              "descriptionAnimalPage.validationMessages.petWeight.required"
            ),
            minLength: {
              value: 2,
              message: t(
                "descriptionAnimalPage.validationMessages.petWeight.minLength"
              ),
            },
          })}
          color={"var(--color-text-dark)"}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petWeight && (
          <p style={{ color: "red" }}>{errors.petWeight.message}</p>
        )}
        <label style={{ alignSelf: "start" }}>
          {t("descriptionAnimalPage.petGender")}{" "}
          <span style={{ color: "#2A9D8F" }}>
            {t("descriptionAnimalPage.requiredSymbol")}
          </span>
        </label>
        <CustomInput
          {...register("petGender", {
            required: t(
              "descriptionAnimalPage.validationMessages.petGender.required"
            ),
            minLength: {
              value: 2,
              message: t(
                "descriptionAnimalPage.validationMessages.petGender.minLength"
              ),
            },
          })}
          color={"var(--color-text-dark)"}
          borderColor="var(--color-main)"
          width={153}
        />
        {errors.petGender && (
          <p style={{ color: "red" }}>{errors.petGender.message}</p>
        )}
        <span className={classes.checkboxBox}>
          <CustomCheckbox
            {...register("confirmation")}
            name="confirmation"
            onChange={handleHomelessChange}
            checked={isCheckboxChecked}
          />{" "}
          <span>{t("descriptionAnimalPage.homelessCheckbox")}</span>
        </span>
        {error && (
          <div className={classes.errorBox}>
            <ErrorMessage message={t("errorMessages.formSendError")} />
          </div>
        )}
        <div className={classes.btnBox}>
          <CustomButtonSubmit
            text={t("descriptionAnimalPage.continueButton")}
            padding={"16px 120.5px"}
            disabled={!isFormValid || isLoading}
          />
        </div>
      </form>
    </div>
  )
}
