import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotFoundPage } from './pages/notFound/NotFoundPage'
import Layout from './shared/layout/Layout'
import { IndexPage } from './pages/index/IndexPage'
import { VerificationPage } from './pages/auth/user/VerificationPage'
import { MainPage } from './pages/main/user/Index/MainPage'


export const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/registration/by-phone/verification" element={<VerificationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

