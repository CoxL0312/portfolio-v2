import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import NotFound from "./components/NotFound";
import About from "./components/pages/About";
import Academics from "./components/pages/Academics";
import Contact from "./components/pages/Contact";
import Faq from "./components/pages/Faq";
import Work from "./components/pages/Work";
import { useTheme } from "./ThemeContext";
import BackgroundVisualizer from "./components/BackgroundVisualizer";
import "./Home.scss";
 

type PageName = "about" | "academics" | "work" | "faq" | "contact" | "null";

function PortfolioHome() {
    const [activeWindow, setActiveWindow] = useState<PageName>("null");
    const closeModal = () => setActiveWindow("null");
    const { isDark, toggleTheme } = useTheme();

    return (
        <main className="home-container">

            <button className="theme-toggle" onClick={toggleTheme}>
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            <header className="home-header">
                <h1>Nice to meet you, I'm Lindsey!</h1>
                <p>Welcome to my Portfolio</p>
            </header>

            <nav className="home-nav">
                    <button onClick={() => setActiveWindow("about")}>About</button>
                    <button onClick={() => setActiveWindow("academics")}>Academics</button>
                    <button onClick={() => setActiveWindow("work")}>Work</button>
                    <button onClick={() => setActiveWindow("faq")}>FAQ</button>
                    <button onClick={() => setActiveWindow("contact")}>Contact</button>
                </nav>

            <Modal isOpen={activeWindow === "about"} onClose={closeModal} title="About -- What makes me, me">
                <About/>
            </Modal>

            <Modal isOpen={activeWindow === "academics"} onClose={closeModal} title="Academics -- What I learned in school">
                <Academics/>
            </Modal>

            <Modal isOpen={activeWindow === "work"} onClose={closeModal} title="Work experience and Projects">
                <Work/>
            </Modal>

            <Modal isOpen={activeWindow === "faq"} onClose={closeModal} title="Frequently Asked Questions">
                <Faq/>
            </Modal>

            <Modal isOpen={activeWindow === "contact"} onClose={closeModal} title="Contact Me">
                <Contact/>
            </Modal>
        </main>
    );
}

export default function App() {
    return (
        <BrowserRouter>
        <BackgroundVisualizer/>
            <Routes>
                <Route path="/" element={<PortfolioHome />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}