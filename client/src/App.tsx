import { BrowserRouter as Router, Route } from 'react-router-dom';
import CalculateForm from './features/calculateForm/CalculateForm';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/register" component={CalculateForm} />
      <Route path="/success" />
    </Router>
  );
}

export default App;
