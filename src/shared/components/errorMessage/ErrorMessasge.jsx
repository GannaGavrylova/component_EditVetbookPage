import s from "./errorMessage.module.css"

export const ErrorMessage = ({ message }) => {
  if (!message) return null

  return <div className={s.errorMessage}>{message}</div>
};

