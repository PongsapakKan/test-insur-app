import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './features/register/Register';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/register" component={Register} />
      <Route path="/success" />
    </Router>
  );
}

export default App;
