import { Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/survey/SurveyPage";
import SignUpPage from "./pages/survey/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import SetProfile from "./pages/SetProfile";
import SharePage from "./pages/sharePage/SharePage";
import MainLayout from "./components/layout/MainLayout";
import Page404 from "./pages/Page404";
import { routes } from "./routes";
import CheckLogin from "./checklogin/CheckLogin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CheckLogin />}>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
          <Route path="/setprofile" element={<SetProfile />} />
        </Route>
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/survey/signup" element={<SignUpPage />} />
        <Route path="/login/:token" element={<LoginPage />} />
        <Route path="/share/:token" element={<SharePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
