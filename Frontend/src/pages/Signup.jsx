import { useState } from 'react';

import { useForm } from 'react-hook-form';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { FilledButton } from '../components/ui/Button';
import { FormError } from '../components/ui/Error';
import {
    Input,
    Label,
} from '../components/ui/Form';
import { LoadingDots } from '../components/ui/Loading';
import { showErrorToast } from '../utils/showToast';
import { useAuthStore } from '../zustand/authStore';

const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must have 8 characters")
});

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(SignUpSchema) });
    const navigate = useNavigate();
    const { setAccessToken } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log(data);
            setAccessToken(data);
            navigate("/upload");
        } catch {
            showErrorToast("Failed to signup");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex justify-center items-center bg-white dark:bg-black p-4 w-full min-h-screen text-white dark:text-black transition-colors duration-300">
            <div className="flex flex-col gap-4 bg-neutral-900 dark:bg-white px-[10vw] sm:px-16 py-10 border-2 border-white dark:border-black rounded-xl md:w-[30rem] text-white dark:text-black transition-all">
                <header>
                    <h1 className="bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 font-calSans font-semibold text-transparent text-2xl">Signup</h1>
                    <p className="opacity-80 text-sm">Join us to ease your reading.</p>
                </header>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">

                        {/* Name */}
                        <div>
                            <Label htmlFor="name">
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Your name"
                                className="bg-neutral-800 dark:bg-white border-neutral-700 dark:border-gray-300"
                            />
                            {errors.name && <FormError title="Error" text={errors.name.message} />}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">
                                Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                {...register("email")}
                                placeholder="you@example.com"
                                className="bg-neutral-800 dark:bg-white border-neutral-700 dark:border-gray-300"
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
                                className="bg-neutral-800 dark:bg-white border-neutral-700 dark:border-gray-300"
                            />
                            {errors.password && <FormError title="Error" text={errors.password.message} />}
                        </div>

                        <FilledButton type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <LoadingDots /> : "Signup"}
                        </FilledButton>
                    </div>

                    <div className="mt-4 text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 dark:text-blue-600 underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}