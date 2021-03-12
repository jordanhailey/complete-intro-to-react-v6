import { StrictMode, useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const SearchParams = lazy(() => import("./SearchParams"))
const Details = lazy(() => import("./Details"))
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue");

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Suspense fallback={<h2>Loading Route ...</h2>}>
          <Router>
            <header>
              <Link to="/">
                <h1>Adopt Me!</h1>
              </Link>
            </header>
            <Switch>
              <Route path="/details/:id">
                <Details />
              </Route>
              <Route path="/">
                <SearchParams />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"));
