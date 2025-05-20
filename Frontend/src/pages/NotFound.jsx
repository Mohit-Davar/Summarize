import { BorderButton } from "../components/ui/Button"
import { useNavigate } from 'react-router-dom';
export default function Error() {
    const navigate = useNavigate();
    return (
        <main className="flex flex-col justify-center items-center bg-bg-p px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="space-y-8 w-full max-w-md text-center">
                <div className="mb-8">
                    <h2 className="mt-6 font-extrabold text-text-p text-6xl">404</h2>
                    <p className="mt-2 font-bold text-text-p text-3xl">Page not found</p>
                    <p className="mt-2 text-gray-600 text-sm">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
                </div>
                <div className="mt-8">
                    <BorderButton onClick={() => navigate(-1)}>
                        Go back
                    </BorderButton>
                </div>
            </div>
            <div className="mt-16 w-full max-w-2xl">
                <div className="relative">
                    <div className="absolute inset-10 flex items-center" aria-hidden="true">
                        <div className="border-gray-300 border-t w-full"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-bg-p px-2 text-gray-500 text-sm">
                            If you think this is a mistake, please contact support
                        </span>
                    </div>
                </div>
            </div>
        </main>
    )
}