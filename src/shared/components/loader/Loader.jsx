import { useEffect, useState } from "react"
import s from "./loader.module.css"
import pawImage from "@/assets/paw-loader.png"
import { getCircleColor } from '../../utils/helpers'

const Loader = () => {
  const [activeCircle, setActiveCircle] = useState(0)
  const totalCircles = 12

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCircle((prevIndex) => (prevIndex + 1) % totalCircles)
    }, 200)
    return () => clearInterval(interval)
  }, [totalCircles])



  return (
    <div className={s.loader}>
      <img src={pawImage} alt="paw" className={s.paw} />
      {Array.from({ length: totalCircles }).map((_, i) => (
        <div
          key={i}
          className={s.loaderCircle}
          style={{
            backgroundColor: getCircleColor(i, activeCircle, totalCircles),
            transform: `rotate(${i * 30}deg) translate(40px)`,
          }}
        ></div>
      ))}
    </div>
  )
}

export default Loader
