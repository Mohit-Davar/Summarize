import 'react-toastify/dist/ReactToastify.css';

import {
  Bounce,
  ToastContainer,
} from 'react-toastify';

import { cn } from '../../utils/clsx';

export const Toast = () => (
    <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        transition={Bounce}
    />
);

export const FormError = ({ title, text, className }) => {
    return (
        <div className={cn(
            "bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative mt-2",
            className
        )} role="alert">
            <strong className="mr-2 font-bold">{title}</strong>
            <span className="block sm:inline">{text}</span>
        </div>
    )
}