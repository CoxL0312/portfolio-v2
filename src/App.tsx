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
        <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem, 2rem", textAlign: "center" }}>
            <header style={{ marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>Nice to meet you, I'm Lindsey!</h1>
                <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>Welcome to my Portfolio</p>
            </header>

            <button
                onClick={toggleTheme}
                style={{
                    position: "absolute",
                    top: "2rem",
                    right: "2rem",
                    background: "none",
                    border: "1px solid var(--text-color)",
                    color: "var(--text-color)",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    cursor: "pointer"
                }}
            >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>


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