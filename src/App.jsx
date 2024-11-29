import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotFoundPage } from './pages/notFound/NotFoundPage'
import Layout from './shared/layout/Layout'
import { IndexPage } from './pages/index/IndexPage'
import { VerificationPage } from './pages/auth/user/VerificationPage'
import { MainPage } from './pages/main/index/user/MainPage'
import { ChooseAnimalQuestionPage } from './pages/main/question/choose/ChooseAnimalQuestionPage'
import { DescriptionAnimalPage } from './pages/main/question/description/DescriptionAnimalPage'
import { SendTextQuestionPage } from './pages/main/question/send/SendTextQuestionPage'
import { ViewSavedQuestion } from './pages/main/question/view/ViewSavedQuestion'
import { CloseQuestionPage } from './pages/main/question/close/CloseQuestionPage'
import { DonatePage } from './pages/donate/user/DonatePage'
import { ViewQuestionPage } from './pages/profile/my-questions/view/ViewQuestionPage'
import { AllQuestionsPage } from './pages/profile/my-questions/allQuestions/AllQuestionsPage'

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
          <Route path="/main/ask-question/question-text" element={<SendTextQuestionPage />} />
          <Route path="/main/ask-question/new-animal/question-saved" element={<ViewSavedQuestion />} />

          <Route path="/profile/my-questions" element={<AllQuestionsPage />} />
          <Route
            path="/profile/my-questions/:questionId"
            element={<ViewQuestionPage />}
          />
          <Route path="/profile/my-questions/:questionId/close-question" element={<CloseQuestionPage />} />

          <Route path="/donate" element={<DonatePage />} />


          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

