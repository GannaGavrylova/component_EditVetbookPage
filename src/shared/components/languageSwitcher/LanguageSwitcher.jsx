import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { languages } from '@shared/const'
import classes from "./languageSwitcher.module.css"

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(
        languages.find((lang) => lang.code === i18n.language) || languages[0]
    )

    useEffect(() => {
        const savedLanguageCode = localStorage.getItem("selectedLanguage")
        if (savedLanguageCode && savedLanguageCode !== i18n.language) {
            const savedLanguage = languages.find((lang) => lang.code === savedLanguageCode)
            if (savedLanguage) {
                setSelectedLanguage(savedLanguage)
                i18n.changeLanguage(savedLanguageCode)
            }
        }
    }, [i18n])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const changeLanguage = (language) => {
        setSelectedLanguage(language)
        i18n.changeLanguage(language.code)
        localStorage.setItem("selectedLanguage", language.code)
        setIsOpen(false)
    }

    return (
        <div className={classes.languageSwitcher}>
            <button className={classes.button} onClick={toggleMenu}>
                <img
                    src={selectedLanguage.flag}
                    alt={selectedLanguage.name}
                    className={classes.flagIcon}
                />
            </button>

            {isOpen && (
                <ul className={classes.languageList}>
                    {languages.map((language) => (
                        <li
                            key={language.code}
                            className={classes.languageItem}
                            onClick={() => changeLanguage(language)}
                        >
                            <img src={language.flag} alt={language.name} className={classes.flagIcon} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

