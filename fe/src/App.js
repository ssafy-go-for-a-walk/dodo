import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/search/SearchPage";
import SurveyPage from "./pages/survey/SurveyPage";
import SignUpPage from "./pages/survey/SignUpPage";
import ManagePage from "./pages/manage/ManagePage";
// import SocialPage from "./pages/SocialPage";
// import SharePage from "./pages/SharePage";
// import Page404 from "./pages/Page404";

import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/survey/signup" element={<SignUpPage />} />
        <Route path="/manage" element={<ManagePage />} />
        {/*
        <Route path="/social" element={<SocialPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </div>
  );
}

export default App;
