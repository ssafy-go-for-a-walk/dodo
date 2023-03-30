import { Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/survey/SurveyPage";
import SignUpPage from "./pages/survey/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import SetProfile from "./pages/SetProfile";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import "./App.css"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/survey/signup" element={<SignUpPage />} />
        <Route path="/login/:token" element={<LoginPage />} />
        <Route path="/setprofile" element={<SetProfile />} />
      </Routes>
    </div>
  );
}

export default App;
