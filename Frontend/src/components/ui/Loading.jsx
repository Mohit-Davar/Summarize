import { cn } from '../../utils/clsx';

export function LoadingDots({ dotsClassName, containerClassName }) {
    return (
        <div className={cn(
            'flex space-x-2 justify-center items-center bg-white h-5 w-full',
            containerClassName)}
        >
            <div
                className={cn(
                    "size-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s] duration-200",
                    dotsClassName)}
            >
            </div>
            <div
                className={cn(
                    "size-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s] duration-200",
                    dotsClassName)}
            >
            </div>
            <div
                className={cn(
                    "size-2 bg-black rounded-full animate-bounce duration-200",
                    dotsClassName)}
            >
            </div>
            <span className='sr-only'>Loading...</span>
        </div >
    )
}

export function LoadingSpinner() {
    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-white dark:bg-black">
            <div className="border-orange-500 border-t-2 border-b-2 rounded-full w-10 h-10 animate-spin" />
        </div>
    );
}  