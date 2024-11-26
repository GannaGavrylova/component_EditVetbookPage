import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import s from "./codeInputBox.module.css"

export const CodeInputBox = ({
  control,
  setValue,
  inputRefs,
  handleInputChange,
  handleKeyDown,
  errorVisible,
  codeError,
  resendAvailable,
  handleResendCode,
  seconds,
}) => {
  const { t } = useTranslation()

  return (
    <div className={s.inputBox}>
      <p className={s.codeText}>
        {t("codeInputBox.codeLabel")} <span>&#42;</span>
      </p>
      <div className={s.codeInputs}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Controller
            key={index}
            name={`digit${index}`}
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                ref={inputRefs[index]}
                type="text"
                maxLength="1"
                className={s.codeInput}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => {
                  const value = e.target.value.replace(/\D/, "")
                  setValue(`digit${index}`, value)
                }}
              />
            )}
          />
        ))}
      </div>
      {errorVisible && codeError ? (
        <p className={s.requestCodeError}>{t("codeInputBox.requiredError")}</p>
      ) : resendAvailable ? (
        <div className={s.requestCodeBox}>
          <p onClick={handleResendCode} className={s.resendCode}>
            {t("codeInputBox.resendText")}
          </p>
          <button type="button" onClick={handleResendCode}>
            {t("codeInputBox.resendButton")}
          </button>
        </div>
      ) : (
        <div className={s.requestCodeBox}>
          <p>{t("codeInputBox.resendWait", { seconds })}</p>
        </div>
      )}
    </div>
  )
};

