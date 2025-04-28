import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./layout/Footer";
import Header from "./layout/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import MealPage from "./pages/MealPage";


function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/Category" element={<CategoryPage />} />
          <Route path="/Meal" element={<MealPage />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
