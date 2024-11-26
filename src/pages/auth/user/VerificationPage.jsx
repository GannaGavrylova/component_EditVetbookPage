import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import clases from "./VerificationPage.module.css"

import { useState } from "react"
import { useVerificationCode } from '@shared/hooks/useVerificationCode'
import { ErrorMessage } from '@shared/components/errorMessage/ErrorMessasge'
import { FormHeader } from '../components/formHeader/FormHeader'
import { CodeInputBox } from '../components/codeInputBox/CodeInputBox'

export const VerificationPage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const { phone_number } = location.state || {} //TODO: renam to phoneNumber if it possible 
    console.log(phone_number) //TODO: delete after testing
    const {
        control,
        setValue,
        handleSubmit,
        inputRefs,
        isFormValid,
        seconds,
        resendAvailable,
        codeError,
        errorVisible,
        handleInputChange,
        handleKeyDown,
        handleResendCode,
        validateCode,
        submitVerificationCode,
    } = useVerificationCode(phone_number)
    const [errorMessage, setErrorMessage] = useState("")

    const onSubmit = async (data) => {
        const code = Object.values(data).join("")
        try {
            const response = await submitVerificationCode(code)
            if (response.success) {
                if (validateCode(response.expectedCode, code)) {
                    navigate("/verification/role")
                } else {
                    setErrorMessage(t("errorMessages.invalidCode"))
                }
            } else {
                setErrorMessage(t("errorMessages.formSendError"))
                console.error("Verification failed:", response.error)
            }
        } catch (error) {
            setErrorMessage(t("errorMessages.formSendError"))
            console.error("Verification error:", error)
        }
    }

    return (
        <div className={clases.l_verificationPage}>
            <FormHeader path="/register" titleKey={t("verificationPage.header")} />
            <p
                className={clases.enterCode}
                dangerouslySetInnerHTML={{ __html: t("verificationPage.enterCode") }}
            />
            <form className={clases.form} onSubmit={handleSubmit(onSubmit)}>
                <CodeInputBox
                    control={control}
                    setValue={setValue}
                    inputRefs={inputRefs}
                    handleInputChange={handleInputChange}
                    handleKeyDown={handleKeyDown}
                    errorVisible={errorVisible}
                    codeError={codeError}
                    resendAvailable={resendAvailable}
                    handleResendCode={handleResendCode}
                    seconds={seconds}
                />
                <ErrorMessage message={errorMessage} />
                <button className={clases.button} type="submit" disabled={!isFormValid}>
                    {t("verificationPage.confirm")}
                </button>
            </form>
        </div>
    )
}

