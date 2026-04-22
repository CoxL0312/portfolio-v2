import { useState } from "react";
import "./Work.scss";

const projects = [
    {
        id: "todo-service",
        title: "Distributed To-Do List Service",
        type: "School Project",
        description: "Created a high-availability shared list application to eliminate single points of failure and allow seamless task management across multiple devices. Implemented a replicated architecture using C and pthreads with automated health checks and RPC over TLS, utilizing Docker to simulate and test local cluster failover.",
    },
    {
        id: "clothing-app",
        title: "Clothing Organization Mobile App",
        type: "Personal Project",
        description: "Solved the challenge of digital wardrobe management by providing a persistent, searchable inventory for planning outfits. Engineered an asynchronous Kotlin-based Android application using Room (SQLite) for data persistence, and the Storage Access Framework for secure, permission-persisted image selection.",
    },
    {
        id: "shared-buffer",
        title: "Synchronized Shared-Buffer File System",
        type: "School Project",
        description: "Eliminated data corruption and race conditions in a high-concurrency environment where dozens of threads required simultaneous access to shared file buffers. Engineered and compared two robust solutions for thread safety, implementing one version using Mutex locks and a second using Semaphores to ensure synchronized read/write operations.",
    },
    {
        id: "unix-shell",
        title: "Rudimentary Unix-Style Shell",
        type: "School Project",
        description: "Built a custom interface to bridge the gap between user commands and the file system, exploring how modern operating systems manage processes. Leveraged C and POSIX APIs to implement core navigation commands and robust argument parsing, ensuring the shell could correctly resolve symlinks and identify various file metadata.",
    },
    {
        id: "virtual-nic",
        title: "Virtual Device and Network Interface Controller",
        type: "School Project",
        description: "Bypassed high-level libraries to interface directly with the Linux kernel, enabling low-level modification and retrieval of hardware device metadata. Utilized the ioctl() system call to programmatically manipulate virtual terminal devices and query network interfaces, extracting hardware attributes such as MAC addresses.",
    },
    {
        id: "shelter-app",
        title: "RegisResQ Animal Shelter Tracker",
        type: "School Project",
        description: "Addressed data integrity issues in shelter management by replacing manual record-keeping with a structured digital tracking system for monitoring animal intake and adoption status. Architected a Java-based OO domain model and MySQL schema, ensuring 100% data accuracy through an automated TestNG suite and strict input validation.",
    }
];

export default function Work() {
     const [openProject, setOpenProject] = useState<string | null>(null);
     const toggleProject = (id: string) => {
        setOpenProject(openProject === id ? null : id);
     };

     return (
        <div className="work-container">
            <p className="work-intro">
                I enjoy working on full-stack problems, ensuring systems can communicate, synchronize, and persist data,
                with an emphasis on fault tolerance and understanding the layers beneath abstraction.
            </p>

            <section className="experience-section">
                <h3>Professional Experience</h3>
                <div className="job-card">
                    <h4>Highpoint Weather</h4>
                    <div className="job-title">Software Development Intern</div>
                    <p className="job-description">
                        Enhanced the reliability of the HailDash weather application by resolving bugs across the React frontend and JavaScript backend. 
                        Streamlined UI consistency across device types, strictly adhered to style guidelines through rigorous PR reviews, 
                        and collaborated within a containerized Docker and Kubernetes deployment pipeline.
                    </p>
                </div>
            </section>

            <section className="projects-section">
                <h3>Engineering Projects</h3>
                <div className="projects-list">
                    {projects.map((project) => {
                        const isOpen = openProject === project.id;

                        return (
                            <div key={project.id} className="project-item">
                                <button
                                    className="project-trigger"
                                    onClick={() => toggleProject(project.id)}
                                    aria-expanded={isOpen}
                                    azria-controls={`project-desc-${project.id}`}
                                    >
                                        <div className="project-header">
                                            <span className="project-title">{project.title}</span>
                                            <span className="project-type">{project.type}</span>
                                        </div>
                                        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
                                    </button>
                                    {isOpen && (
                                        <div id={`project-desc-${project.id}`} className="project-content">
                                            <p className="project-desc">{project.description}</p>
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
     );
}