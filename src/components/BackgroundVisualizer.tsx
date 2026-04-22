import { useEffect, useRef } from "react";

// basic structure for network nodes
interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

// connections between specific nodes
interface Edge {
    source: number;
    target: number;
}

export default function BackgroundVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) return;

        // make canvas fill the screen
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        // generate random nodes
        const NUM_NODES = window.innerWidth < 768 ? 20: 40;
        const nodes: Node[] = Array.from({ length: NUM_NODES }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: 0,
            vy: 0,
        }));

        // generate random edges (wiring them together)
        const edges: Edge[] = [];
        for (let i = 0; i < NUM_NODES; i++) {
            // connect each node to 1 or 2 random other nodes
            const connections = Math.floor(Math.random() * 2) + 1;
            for (let j = 0; j < connections; j++) {
                const target = Math.floor(Math.random() * NUM_NODES);
                if (target != i) edges.push({source: i, target });
            }
        }

        // mouse interaction variables
        let mouseX = -1000;
        let mouseY = -1000;
        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            if ("touches" in e) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            } else {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
        };

        const handlePointerLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("touchmove", handlePointerMove);
        window.addEventListener("touchend", handlePointerLeave);


        //physics constants
        const REPULSION = 1500; // how hard nodes push away from each other
        const SPRING_K = 0.01; // how stiff the connections are
        const SPRING_LENGTH = 100; // ideal resting distance
        const DAMPING = 0.85; // friction to stop infinite jiggling

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // grab colors dynamically
            const computedStyle = getComputedStyle(document.body);
            const accentColor = computedStyle.getPropertyValue("--accent").trim();
            const mutedColor = computedStyle.getPropertyValue("--border").trim();

            // apply forces
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                // force A: Coulomb Repulsion (nodes push apart)
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq > 0 && distanceSq < 40000) { //only repel if somewhat close
                        const distance = Math.sqrt(distanceSq);
                        const force = REPULSION / distanceSq;
                        const fx = (dx / distance ) * force;
                        const fy = (dy / distance ) * force;
                        node.vx += fx;
                        node.vy += fy;
                        other.vx -= fx;
                        other.vy -= fy;
                    }
                }

                // force B: Mouse Repulsion (interactive bump)
                const mx = node.x - mouseX;
                const my = node.y - mouseY;
                const distMouseSq = mx * mx + my * my;
                if (distMouseSq < 20000) {
                    const force = 3000 / distMouseSq;
                    node.vx += (mx / Math.sqrt(distMouseSq)) * force;
                    node.vy += (my / Math.sqrt(distMouseSq)) * force;
                }
            }

            // force C: Hooke's Law Attraction (springs pull together)
            edges.forEach(edge => {
                const n1 = nodes[edge.source];
                const n2 = nodes[edge.target];
                const dx = n2.x - n1.x;
                const dy = n2.y - n1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0) {
                    const displacement = distance - SPRING_LENGTH;
                    const force = displacement * SPRING_K;
                    const fx = (dx / distance) * force;
                    const fy = (dy / distance) * force;

                    n1.vx += fx;
                    n1.vy += fy;
                    n2.vx -= fx;
                    n2.vy -= fy;
                }

                //ddraw the edges
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.strokeStyle = mutedColor;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // update positions and draw nodes
            nodes.forEach(node => {
                // apply friction!!!!!!
                node.vx *= DAMPING;
                node.vy *= DAMPING;

                // move it move it
                node.x += node.vx;
                node.y += node.vy;

                // keep inside screen bounds
                if (node.x < 0) { node.x = 0; node.vx *= -1; }
                if (node.y < 0) { node.y = canvas.height; node.vy *= -1; }
                if (node.x > canvas.width) { node.x = canvas.width; node.vx *= -1; }
                if (node.y > canvas.height) { node.y = canvas.height; node.vy *= -1; }

                // draw the node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 4, 0, Math.PI *2);
                ctx.fillStyle = accentColor;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        //cleanup when component unmounts
        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("touchmove", handlePointerMove);
            window.removeEventListener("touchend", handlePointerLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    
    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}
        />
    );
}