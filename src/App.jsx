import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


function App() {
  const { t } = useTranslation()

  return (

    <Router>
      <Routes>
        <Route path="/" element={<p>{t("aboutServicePage.benefitsTitle2")}</p>} />
      </Routes>
    </Router>
  )
}

export default App
