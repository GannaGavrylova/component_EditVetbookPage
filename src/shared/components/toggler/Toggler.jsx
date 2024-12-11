import { useState } from 'react'
import classes from './Toggler.module.css'

export const Toggler = () => {
  const [isOn, setIsOn] = useState(false)

  const toggle = () => {
    setIsOn((prev) => !prev)
  }

  return (
    <div className={`${classes.toggler} ${isOn ? classes.on : classes.off}`} onClick={toggle} role="button" aria-pressed={isOn}>
      <div className={classes.innerToggler}></div>
    </div>
  )
}
