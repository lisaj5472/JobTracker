import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Resumes from "./pages/Resumes";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Nav />

        <main className="flex-grow pt-16 w-full bg-gray-50 text-gray-800">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resumes" element={<div>Resumes Page</div>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
