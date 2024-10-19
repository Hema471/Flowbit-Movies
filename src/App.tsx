import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BtnUp from "./components/BtnUp/BtnUp";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bg dark:bg-darkbg text-black dark:text-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:filmId" element={<DetailsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
        <BtnUp />
      </div>
    </Router>
  );
};

export default App;
