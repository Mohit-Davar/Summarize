import { cn } from '../../utils/clsx';

export function Input({ className, ...props }) {
    return (
        <input
            className={cn(
                "w-full border-2 border-black rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                className
            )}
            {...props}
        />
    );
}

export function Label({
    className,
    children,
    ...props
}) {
    return (
        <label
            className={cn(
                "block mb-2 font-medium",
                className
            )}
            {...props}
        >
            {children}
        </label>
    )

}