import { type ReactNode, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const nodeRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <Draggable handle=".modal-drag-handle" nodeRef={nodeRef}>

            <div
                ref={nodeRef}
                className="modal-window"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="modal-header modal-drag-handle">
                    <h2 id="modal-title">{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        aria-label={`Close ${title} modal`}
                    >
                        &times;
                    </button>                           
                </header>

                <section className ="modal-content">
                    {children}
                </section>
            </div>
        </Draggable>
        </div>
    );
}