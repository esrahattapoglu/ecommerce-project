import { BrowserRouter as Router } from 'react-router-dom';
import PageContent from './layout/PageContent';
import './App.css';

function App() {
  return (
    <Router>
      <PageContent />
    </Router>
  );
}

export default App;