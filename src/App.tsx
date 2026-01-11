import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import ExerciseList from './components/ExerciseList';
import ExerciseView from './components/ExerciseView';

const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <I18nProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<ExerciseList />} />
          <Route path="/exercise/:id" element={<ExerciseView />} />
        </Routes>
      </Router>
    </I18nProvider>
  );
}

export default App;
