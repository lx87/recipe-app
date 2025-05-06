import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./layout/Footer";
import Header from "./layout/Header";

import Home from "./pages/Home";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import CategoryPage from "./pages/CategoryPage";
import MealPage from "./pages/MealPage";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router basename="/recipe-app">
      <Header />
      <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/meal/:id" element={<MealPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;