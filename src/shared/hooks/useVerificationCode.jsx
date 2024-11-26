import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { API_BASE_URL } from '../const'
import useInputRefs from './useInputRefs'

export const useVerificationCode = (pnone, initialSeconds = 90) => {
  const { handleSubmit, control, setValue, watch, reset } = useForm()
  const inputRefs = useInputRefs(6)
  const [isFormValid, setIsFormValid] = useState(false)
  const [seconds, setSeconds] = useState(initialSeconds)
  const [resendAvailable, setResendAvailable] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorTimer, setErrorTimer] = useState(null)
  const watchAllFields = watch()

  useEffect(() => {
    if (inputRefs[0] && inputRefs[0].current) {
      inputRefs[0].current.focus()
    }
  }, [inputRefs])

  useEffect(() => {
    const allFieldsFilled = Object.values(watchAllFields).every((val) => val && val.length === 1)
    setIsFormValid(allFieldsFilled)
  }, [watchAllFields])

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setResendAvailable(true)
    }
  }, [seconds])

  const submitVerificationCode = async (code) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/verify/`, {
        pnone,
        code,
      })
      return response.data
    } catch (error) {
      console.error("Error verifying code:", error)
      throw error
    }
  }

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length === 1) {
      setValue(`digit${index}`, value)
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus()
      }
    } else if (value === "") {
      if (index > 0) {
        inputRefs[index - 1].current.focus()
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      if (e.target.value === "") {
        if (index > 0) {
          inputRefs[index - 1].current.focus()
        }
      } else {
        setValue(`digit${index}`, "")
      }
    }
  }

  const handleResendCode = async (code) => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/verify/`, {
        pnone,
        code,
      })
      setSeconds(initialSeconds)
      setResendAvailable(false)
      setCodeError(false)
      setErrorVisible(false)
      reset()
    } catch (error) {
      console.error("Error resending code:", error)
    }
  }

  const validateCode = (expectedCode, inputCode) => {
    const isValid = expectedCode === inputCode

    if (!isValid) {
      setCodeError(true)
      setErrorVisible(true)

      if (errorTimer) {
        clearTimeout(errorTimer)
      }

      const newTimer = setTimeout(() => setErrorVisible(false), 5000)
      setErrorTimer(newTimer)

      reset()
      setIsFormValid(false)
      inputRefs[0].current.focus()
    } else {
      setCodeError(false)
      setErrorVisible(false)
    }

    return isValid
  }


  return {
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
  }
}

