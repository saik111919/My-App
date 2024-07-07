import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Layout/NavBar";
import routes from "./routes/routes";
import ErrorBoundary from "./Common/ErrorBoundary";
import NoPage from "./Common/NoPage";

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavBar />}>
              {routes().map((items) => (
                <Route
                  key={items.id}
                  path={items.path}
                  element={<items.component />}
                  name={items.name}
                />
              ))}
              <Route path='*' element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
