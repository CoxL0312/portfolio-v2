import { useState } from "react";
import "./Academics.scss";

const courses = [
    {
        id: "capstone",
        title: "Computer Science Capstone Project",
        description: "Culminating group, project-based course applying full-stack development, systems architecture, and engineering principles to build a comprehensive, production-ready application.",
    },
    {
        id: "distributed-systems",
        title: "Distributed Systems",
        description: "Built an understanding of how independent machines communicate, stay synchronized, and survive failure — with a focus on distributed architectures, processes and interprocess communication, synchronization, replication and consistency, fault tolerance, and security.",
    },
    {
        id: "operating-systems",
        title: "Operating Systems",
        description: "Explored the core of computing with a deep look at basic facilities provided in modern operating systems including processor scheduling, memory management, and file systems. Topics include: deadlock detection, paging, concurrency, thread, disk scheduling, caching, and security."
    },
    {
        id: "computer-organization",
        title: "Computer Organization & Architecture",
        description: "Studied machine architecture with coverage of digital logic, machine level data, and instruction representation, ALU design, and organization of the processor datapath and control. We also examined performance analysis, memory system hierarchy, pipelining, and communication."
    },
    {
        id: "software-engineering",
        title: "Software Engineering",
        description: "Focused on designing reliable, modular, scalable software using industry practices — including requirements, UML, maintenance, lifecycles, testing, and team-driven development.",
    },
    {
        id: "machine-learning",
        title: "Machine Learning",
        description: "Investigated core machine learning paradigms, including supervised and unsupervised learning, regression, and classification. Focus areas included neural networks, data preprocessing pipelines, feature engineering, model evaluation, and the underlying mathematical optimization algorithms.",
    },
    {
        id: "mobile-enterprise",
        title: "Mobile & Enterprise Computing",
        description: "Engineered full-stack mobile solutions with an emphasis on Android development. Covered native UI lifecycles, local persistence mechanisms (like SQLite), secure storage access, asynchronous API integrations, and the overarching architecture required to connect mobile clients to enterprise backend services.",
     },
];

const focusArea = [
    "Systems and Network Programming",
    "Distributed Architectures",
    "Hardware and Software performance optimization",
    "Secure System Design",
    "Full-Stack Software Development",
];

export default function Academics() {
    const [openCourse, setOpenCourse] = useState<string | null>(null);
    const toggleCourse = (id: string) => {
        setOpenCourse(openCourse === id ? null : id);
    };

    return (
        <div className="academics-container">
            <div className="academics-header">
                <h2>Regis University - B.S. Computer Science</h2>
                <p className="timeline">August 2023 → May 2026</p>
                <p className="description">
                    Accelerated degree focused on systems computing, networking, and 
                    practical software engineering. Emphasis on understanding both how
                    computers work and how to write software for the hardware.
                </p>
                <p className="gpa">
                    <strong>GPA: 3.5</strong>
                </p>
            </div>

            <div className="courses-section">
                <h3>Favorite Courses</h3>
                <div className="course-list">
                    {courses.map((course) => {
                        const isOpen = openCourse === course.id;
                        return (
                            <div key={course.id} className="course.item">
                                <button
                                    className="course-trigger"
                                    onClick={() => toggleCourse(course.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`course-desc -${course.id}`}
                                >
                                    {course.title}
                                    <span className={`arrow ${isOpen ? "open" : ""}`}>
                                        ▼
                                    </span>
                                </button>
                                {isOpen && (
                                    <div id={`course-desc-${course.id}`} className="course-description">
                                        <p>{course.description}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="focus-section">
                <h3>Academic Focus Areas</h3>
                <ul className="focus-list">
                    {focusArea.map((area, index) => (
                        <li key={index} className="focus-item">
                            <span className="bullet">•</span>
                            <span>{area}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}





       