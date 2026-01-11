import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import ExerciseList from './components/ExerciseList';
import ExerciseView from './components/ExerciseView';

function App() {
  return (
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/exercise/:id" element={<ExerciseView />} />
        </Routes>
      </Router>
    </I18nProvider>
  );
}

export default App;
