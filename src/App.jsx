import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from '@/shared/layout/Layout'

import {
  IndexPage,
  VerificationPage,
  AllQuestionsPage,
  ChooseAnimalQuestionPage,
  CloseQuestionPage,
  DescriptionAnimalPage,
  DonatePage,
  MainPage,
  SendTextQuestionPage,
  ViewQuestionPage,
  ViewSavedQuestion,
  NotFoundPage,
  UserProfilePage,
  EditProfilePage,
  UserNotificationsPage,
  ProfileSettingsPage,
  AboutServicePage,
  AddMessagePage,
  CreateVetbookPage,
  ChooseRolePage,
  EditSpecialistPage,
  SpecialistSettingsPage,
  SpecialistNotificationsPage,
  VisitsHistory,
  AllVetBooksPage,
  EditVetbookPage,
} from './pages'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />

          <Route path="/registration/by-phone/verification" element={<VerificationPage />} />
          <Route path="/verification/role/" element={<ChooseRolePage />} />

          <Route path="/main" element={<MainPage />} />
          <Route path="/main/ask-question" element={<ChooseAnimalQuestionPage />} />
          <Route path="/main/ask-question/new-animal/add-question-photo" element={<DescriptionAnimalPage />} />
          <Route path="/main/ask-question/question-text" element={<SendTextQuestionPage />} />
          <Route path="/main/ask-question/new-animal/question-saved" element={<ViewSavedQuestion />} />
          <Route path="/main/vetbooks" element={<AllVetBooksPage />} />
          <Route path="/main/vetbooks/create" element={<CreateVetbookPage />} />
          <Route path="/main/vetbooks/:vetbookId/visits-history" element={<VisitsHistory />} />
          <Route path="/main/vetbooks/:vetbookId/vetpass/edit" element={<EditVetbookPage />} />

          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/settings" element={<ProfileSettingsPage />} />
          <Route path="/profile/settings/notifications" element={<UserNotificationsPage />} />
          <Route path="/profile/my-questions" element={<AllQuestionsPage />} />
          <Route path="/profile/my-questions/:questionId" element={<ViewQuestionPage />} />
          <Route path="/profile/my-questions/:questionId/add-message" element={<AddMessagePage />} />
          <Route path="/profile/my-questions/:questionId/close-question" element={<CloseQuestionPage />} />
          <Route path="/specialist-profile/edit" element={<EditSpecialistPage />} />
          <Route path="/specialist-profile/settings" element={<SpecialistSettingsPage />} />
          <Route path="/specialist-profile/settings/notifications" element={<SpecialistNotificationsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/about" element={<AboutServicePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
