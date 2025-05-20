import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import { FilledButton } from '../components/ui/Button';
import { FormError } from '../components/ui/Error';
import { Input, Label } from '../components/ui/Form';
import { LoadingDots } from '../components/ui/Loading';
import { showErrorToast } from '../utils/showToast';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password is required")
});

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(LoginSchema) });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log(data);
            navigate("/upload");
        } catch {
            showErrorToast("Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex justify-center items-center dark:bg-black text-white bg-white dark:text-black p-4 w-full min-h-screen transition-colors duration-300">
            <div className="flex flex-col gap-4 bg-neutral-900 border-white dark:bg-white dark:border-black text-white dark:text-black px-[10vw] sm:px-16 py-10 border-2 rounded-xl md:w-[30rem] transition-all">
                <header>
                    <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 font-calSans">Login</h1>
                    <p className="text-sm opacity-80">Enter your email below to login to your account.</p>
                </header>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        {/* Email */}
                        <div>
                            <Label htmlFor="email">
                                Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                {...register("email")}
                                placeholder="you@example.com"
                                className="bg-neutral-800 border-neutral-700 dark:bg-white dark:border-gray-300"
                            />
                            {errors.email && <FormError title="Error" text={errors.email.message} />}
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                                placeholder="••••••••"
                                className="bg-neutral-800 border-neutral-700 dark:bg-white dark:border-gray-300"
                            />
                            {errors.password && <FormError title="Error" text={errors.password.message} />}
                        </div>

                        <FilledButton type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <LoadingDots /> : "Login"}
                        </FilledButton>
                    </div>

                    <div className="mt-4 text-sm text-center">
                        Don't have an account?{" "}
                        <Link to="/signup" className="underline underline-offset-4 text-blue-400 dark:text-blue-600">
                            Signup
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}