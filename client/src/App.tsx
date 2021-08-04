import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CalculateForm from './features/calculateForm/CalculateForm';
import './App.css';
import { Container } from '@material-ui/core';
import CalculateResult from './features/calculateResult/CalculateResult';

function App() {
  return (
    <Container maxWidth="sm" className="main">
      <Router>
        <Route path="/form" component={CalculateForm} />
        <Route path="/result" component={CalculateResult} />
        <Redirect from="*" to="/form" />
      </Router>
    </Container>
  );
}

export default App;
