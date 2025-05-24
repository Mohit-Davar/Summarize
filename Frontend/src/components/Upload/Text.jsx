export default function Text() {
    return (
        <div className="z-20 relative flex flex-col justify-center items-center gap-2 text-center">
            <h1 className="font-calSans text-white text-xl md:text-4xl">
                Welcome to Summarize
            </h1>
            <p className="text-neutral-300 text-sm md:text-base">
                Summarize is an AI-powered research assistant that works best with your sources
            </p>
        </div>
    );
}