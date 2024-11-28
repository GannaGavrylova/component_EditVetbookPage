import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import classes from "./DescriptionAnimalPage.module.css"
import close from "@/assets/close.svg"
import { addQuestion } from '@shared/utils/apiService'
import { FormHeader, LineHeader, FileUploader, CustomInput, CustomCheckbox, ErrorMessage, CustomButtonSubmit } from '@/shared/components'

export const DescriptionAnimalPage = () => {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  })

  const onUpload = useCallback( //TODO: @KonstantinChuper rewrite with cutom hook and change in whole App
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

  const onSubmit = async (data) => {
    try {
      console.log(
        "Файлы перед отправкой:",
        files.map((file) => ({
          имя: file.name,
          тип: file.type,
          размер: file.size,
          lastModified: file.lastModified,
        }))
      )
      const formData = new FormData()
      formData.append("userId", userId)
      formData.append("petArt", data.petArt)
      formData.append("petWeight", data.petWeight)
      formData.append("petGender", data.petGender)
      /*formData.append("isHomeless", isCheckboxChecked);*/
      files.forEach((fileObj) => {
        formData.append(`files`, fileObj.file)
      })

      // Проверяем что попало в FormData
      for (let pair of formData.entries()) {
        console.log("FormData содержит:", pair[0], "=", pair[1])
      }

      const response = await addQuestion(formData, isCheckboxChecked)
      console.log("Ответ сервера:", response)

      navigate("/main/ask-question/question-text", {
        state: {
          userId: userId,
          petArt: data.petArt,
          petWeight: data.petWeight,
          petGender: data.petGender,
          isHomeless: isCheckboxChecked,
          files: files,
        },
      })
    } catch (error) {
      setErrorMessage(t("errorMessages.formSendError"))
      console.error("Ошибка при отправке формы:", error)
    }
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
          path="//main/ask-question"
          fontSize={36}
          titleKey={t("questionPage.title")}
        />
        <Link to={"/main"}>
          <img className={classes.closeBtn} src={close} alt="close" />
        </Link>
      </div>
      <LineHeader middle={"var(--color-main)"} />
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, isCheckboxChecked))}
      >
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
          {/* TODO: add kg to all translations, fix validation */}
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
          {/* TODO: rewrite with select */}
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
        <div className={classes.errorBox}>
          <ErrorMessage message={errorMessage} />
        </div>
        <div className={classes.btnBox}>
          <CustomButtonSubmit
            text={t("descriptionAnimalPage.continueButton")}
            padding={"16px 120.5px"}
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  )
}

