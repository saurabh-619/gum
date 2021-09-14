import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/ratings/:id" component={Ratings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
