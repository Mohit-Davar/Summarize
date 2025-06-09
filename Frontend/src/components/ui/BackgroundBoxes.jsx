import React from 'react';

import { motion } from 'framer-motion';

import { cn } from '../../utils/clsx';

export const BoxesCore = ({
    className,
    ...rest
}) => {
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);
    let colors = [
        "#FF8C00", // Vivid Orange
        "#FF1E00", // Fiery Red
        "#FFD700", // Neon Gold
        "#FF4E00", // Orange Blaze
        "#FFA500", // Classic Orange
        "#FF4500", // Neon Flame
    ];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    return (
        <div
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
                className
            )}
            {...rest}>
            {rows.map((_, i) => (
                <motion.div key={`row` + i} className="relative border-slate-500 border-l border-opacity-60 w-16 h-8">
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: `${getRandomColor()}`,
                                transition: { duration: 0 },
                            }}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            key={`col` + j}
                            className="relative border-slate-500 border-t border-r border-opacity-50 w-16 h-8">
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="-top-[14px] -left-[22px] absolute stroke-[1px] w-10 h-6 text-slate-700 pointer-events-none">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);