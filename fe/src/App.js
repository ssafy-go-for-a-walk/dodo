import { Routes, Route } from 'react-router-dom';
import SurveyPage from './pages/Survey/SurveyPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
      </Routes>
    </div>
  );
}

export default App;
