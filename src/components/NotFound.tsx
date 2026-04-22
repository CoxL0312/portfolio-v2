import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "3rem", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)", textAlign: "center", maxWidth: "400px" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#333" }}>Oops!</h2>
                <p style= {{ color: "#666", marginBottom: "2rem" }}>This page doesn't exist on my website!</p>
                <Link
                    to="/"
                    style={{
                        display: "inline-block",
                        padding: "0.75rem 1.5rem",
                        backgroundColor: "#111",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Take me Home
                </Link>
            </div>
        </div>
    );
}