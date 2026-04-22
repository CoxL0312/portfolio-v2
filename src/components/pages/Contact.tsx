import { useState } from "react";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const email = "lindseycox0312@gmail.com";

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email", err);
        }
    };

    return (
        <>
        <p>Let's connect! Reach out through any of these channels.</p>
            <ul style= {{ listStyleType: "none", padding: 0, lineHeight: "2" }}>
                <li><a href="https://www.linkedin.com/in/lindseycox1234/" target="_blank" rel="noreferrer">LinkedIn
                </a></li>
                <li><a href="https://github.com/CoxL0312/" target="_blank" rel="noreferrer">GitHub</a></li>
                <li>
                    <button
                        onClick={handleCopyEmail}
                        style={{
                            background: "none", border: "none", padding: 0,
                            color: "var(--accent)", textDecoration: "underline", cursor: "pointer", fontSize: "1rem"
                        }}
                    >
                        {copied ? "Email copied to clipboard! ✓" : "Copy Email"}
                    </button>
                </li>
            </ul>
        </>
    )
}