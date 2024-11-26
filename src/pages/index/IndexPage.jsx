import { useTranslation } from "react-i18next"
import logo from "@/assets/TailBook_ecosystem.png"
import banner from "@/assets/banner.png"
import { LanguageSwitcher } from '@shared/components/languageSwitcher/LanguageSwitcher'
import { AuthProvidersList } from './components/AuthProvidersList'
import classes from "./IndexPage.module.css"

export const IndexPage = () => {
    const { t } = useTranslation()

    return (
        <div className={classes.l_authorizationPage}>
            <div className={classes.header}>
                <img src={logo} alt="logo" />
                <LanguageSwitcher />
            </div>
            <div className={classes.banner}>
                <img src={banner} alt="" />
                <p>{t("authorizationPage.bannerText")}</p>
            </div>
            <AuthProvidersList />
        </div>
    )
}
