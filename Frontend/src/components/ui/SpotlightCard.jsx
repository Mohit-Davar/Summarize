import {
    useRef,
    useState
} from 'react';

// eslint-disable-next-line no-unused-vars
import {
    motion,
    useAnimation,
} from 'framer-motion';

const SpotlightItem = ({ title, description, icon }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const controls = useAnimation();

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => controls.start({ opacity: 1 });
    const handleMouseLeave = () => controls.start({ opacity: 0 });

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative bg-neutral-950 p-8 border border-neutral-800 rounded-3xl w-full max-w-80 cursor-pointer"
        >
            <motion.div
                className="absolute -inset-px rounded-3xl pointer-events-none"
                animate={controls}
                transition={{ duration: 0.5 }}
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(234,88,12,.20), transparent 40%)`,
                }}
            />
            <div className="mb-4 text-orange-600">{icon}</div>
            <h3 className="mb-2 font-calSans font-medium text-neutral-100 md:text-xl">{title}</h3>
            <p className="text-neutral-400 text-sm md:text-lg">{description}</p>
        </div>
    );
};

const SpotlightCard = ({ cards }) => {
    return (
        <div className="relative flex flex-wrap justify-center gap-4">
            {cards.map((card, index) => (
                <SpotlightItem key={index} {...card} />
            ))}
        </div>
    );
};

export default SpotlightCard;