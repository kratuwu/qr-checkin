import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Scan from "./pages/Scan";
import Login from "./pages/Login";
import List from "./pages/List";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<Scan />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
