import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotFoundPage } from './pages/notFound/NotFoundPage'
import Layout from './shared/layout/Layout'
import { IndexPage } from './pages/index/Index'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
