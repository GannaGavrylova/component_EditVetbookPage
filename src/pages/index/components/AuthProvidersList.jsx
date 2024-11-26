
import classes from "./AuthProvidersList.module.css"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import phone from "@/assets/loginIcons/phone.svg"
import facebook from "@/assets/loginIcons/facebook.svg"
import google from "@/assets/loginIcons/google.svg"
import apple from "@/assets/loginIcons/apple.svg"
import { useTranslation } from "react-i18next"
import { API_BASE_URL } from '@/shared/const'

export const AuthProvidersList = () => {
    const { t } = useTranslation()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const userId = params.get("user_id")

        if (userId) {
            localStorage.setItem("userId", userId)
            console.log("UserID saved to localStorage:", userId)
        }
    }, [])

    return (
        <div className={classes.container}>
            <p className={classes.title}>{t("authOptions.register")}</p>
            <div className={classes.buttonGroup}>
                <Link
                    to={"/register"}
                    className={classes.button}
                    onClick={(e) => e.preventDefault()}
                >
                    <img
                        src={phone}
                        alt="Phone Login"
                        className={classes.icon}
                        style={{ opacity: 0.5 }}
                    />
                </Link>

                <a
                    href={`${API_BASE_URL}/api/users/login/facebook`}
                    onClick={(e) => e.preventDefault()}
                >
                    <img
                        src={facebook}
                        alt="Facebook Login"
                        className={classes.icon}
                        style={{ opacity: 0.5 }}
                    />
                </a>

                <a href={`${API_BASE_URL}/api/users/login/google`}>
                    <img src={google} alt="Google Login" className={classes.icon} />
                </a>

                <a
                    href={`${API_BASE_URL}/api/users/login/apple`}
                    onClick={(e) => e.preventDefault()}
                >
                    <img src={apple} alt="Apple Login" className={classes.icon} />
                </a>
            </div>

            <div className={classes.lineBox}>
                <div className={classes.line}></div>
                <p>{t("authOptions.or")}</p>
                <div className={classes.line}></div>
            </div>

            <p className={classes.title}>{t("authOptions.login")}</p>
            <div className={classes.buttonGroup}>
                <Link
                    to={"/login"}
                    className={classes.button}
                    onClick={(e) => e.preventDefault()}
                >
                    <img
                        src={phone}
                        alt="Phone Login"
                        className={classes.icon}
                        style={{ opacity: 0.5 }}
                    />
                </Link>

                <a
                    href={`${API_BASE_URL}/api/users/login/facebook`}
                    onClick={(e) => e.preventDefault()}
                >
                    <img
                        src={facebook}
                        alt="Facebook Login"
                        className={classes.icon}
                        style={{ opacity: 0.5 }}
                    />
                </a>

                <a href={`${API_BASE_URL}/api/users/login/google`}>
                    <img src={google} alt="Google Login" className={classes.icon} />
                </a>

                <a
                    href={`${API_BASE_URL}/api/users/login/apple`}
                    onClick={(e) => e.preventDefault()}>
                    <img src={apple} alt="Apple Login" className={classes.icon} />
                </a>
            </div>
        </div>
    )
}

