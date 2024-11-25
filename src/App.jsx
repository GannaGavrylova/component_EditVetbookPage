import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotFoundPage } from './pages/notFound/NotFoundPage'


function App() {
  const { t } = useTranslation()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>{t("authorizationPage.bannerText")}</p>} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  )
}

export default App
