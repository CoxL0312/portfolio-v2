import { useState } from "react";
import "./Faq.scss";

const faqs = [
    {
        id: "languages",
        question: "What programming languages do you work with?",
        answer: "I work most confidently with Java and C, which I've used throughout my schooling, as well as JavaScript which I used in my internship. I also write in Python and C++, which I've studied independently and used in side projects."
    },
    {
        id: "experience",
        question: "How long have you been studying Computer Science?",
        answer: "I started in August 2023, with no prior technical background beyond consumer tech. I completed my degree with a GPA of 3.5 in two and a half years, driven by enthusiastic hands-on learning and project immersion."
    },
    {
        id: "roles",
        question: "What roles or fields are you targeting?",
        answer: "There isn't anything I'm not interested in learning, but I'm aiming for roles in networks, systems, and hardware-focused computing. I'm currently working toward my CCNA, and I'm especially interested in configuring networks, working with distributed systems, and systems-level programming in C."
    },
    {
        id: "looking",
        question: "Are you currently looking for work?",
        answer: "Yes! I'm open to internships, part-time roles, and full-time opportunities. You can find my contact details on the Contact page."
     },
    {
        id: "team",
        question: "What do you bring to a team?",
        answer: "Technical curiosity, persistence, and fast learning. I adapt quickly, communicate clearly, and approach challenges with a systems-level mindset and a positive attitude!"
    },
    {
        id: "projects",
        question: "What kinds of projects do you build?",
        answer: "I build networking tools, distributed systems, and architecture-focused programs, often in Java, C, or Python. You can explore my work in the Work & Projects section!"
    },
    {
        id: "frontend-backend",
        question: "Do you prefer front-end or back-end work?",
        answer: "I can work in either, or I can be a full-stack engineer for your team! I enjoy back-end, systems, networking, and low-level development though, as I enjoy understanding how computers and networks actually work under the hood."
    },
    {
        id: "relocation",
        question: "Are you open to relocation?",
        answer: "Yes — I'm open to both domestic and international opportunities."
    }
];

export default function Faq() {
    const [openFaq, setOpenFaq] = useState<string | null>(null);
    const toggleFaq = (id: string) => {
        setOpenFaq(openFaq === id ? null : id);
    }

    return (
        <div className="faq-container">
            <p className="faq-intro">
                Find answers to common questions about my background, interests, and what I'm looking for below.
            </p>

            <div className="faq-list">
                {faqs.map((faq) => {
                    const isOpen = openFaq === faq.id;

                    return (
                        <div key={faq.id} className="faq.item">
                            <button
                                className="faq-trigger"
                                onClick={() => toggleFaq(faq.id)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-answer-${faq.id}`}
                            >
                                <span>{faq.question}</span>
                                <span className={`arrow ${isOpen} ? "open" : ""`}>▼</span>
                            </button>

                            {isOpen && (
                                <div id={`faq-answer-${faq.id}`} className="faq-content">
                                    <p className="faq-answer">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}