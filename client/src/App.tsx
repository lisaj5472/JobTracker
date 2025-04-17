import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <Nav /> */}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Home />} />
          </Routes>
        </main>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
