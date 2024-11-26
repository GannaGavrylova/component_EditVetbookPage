import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotFoundPage } from './pages/notFound/NotFoundPage'
import Layout from './shared/layout/Layout'
import { IndexPage } from './pages/index/IndexPage'
import { VerificationPage } from './pages/auth/user/VerificationPage'
import { MainPage } from './pages/main/index/user/MainPage'
import { ChooseAnimalQuestionPage } from './pages/main/question/choose/ChooseAnimalQuestionPage'
import { DescriptionAnimalPage } from './pages/main/question/description/DescriptionAnimalPage'


export const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/registration/by-phone/verification" element={<VerificationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/ask-question" element={<ChooseAnimalQuestionPage />} />
          <Route path="/main/ask-question/new-animal/add-question-photo" element={<DescriptionAnimalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

