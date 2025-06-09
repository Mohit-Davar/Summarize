import { cn } from '../../utils/clsx';

export function BorderButton({ children, className, ...props }) {
    return (
        <button
            className={cn("relative p-[3px]", className)}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg" />
            <div className="group relative flex bg-black sm:hover:bg-transparent px-4 py-2 rounded-[6px] text-white transition duration-200">
                {children}
            </div>
        </button>
    );
}

export function FilledButton({ children, className, ...props }) {
    return (
        <button
            className={cn(
                "bg-gradient-to-r from-orange-500 to-red-500 sm:hover:shadow-md rounded-lg text-white px-5 py-3 transition duration-200 flex",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}