import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Boxes } from '../components/ui/BackgroundBoxes';
import SpotlightCard from '../components/ui/SpotlightCard';
import Modal from '../components/Upload/Modal';
import Text from '../components/Upload/Text';
import { uploadCards } from '../constants';

const pdfUploadSchema = z.object({
    file: z
        .any()
        .refine((file) => file instanceof File, {
            message: "File is required",
        })
        .refine((file) => file?.type === "application/pdf", {
            message: "Only PDF files are allowed",
        }),
});

export default function Upload() {
    const { handleSubmit, formState: { errors }, setValue } = useForm({ resolver: zodResolver(pdfUploadSchema) });

    const onSubmit = (data) => {
        console.log("Uploaded file:", data.file);
    };

    const handleFileChange = (files) => {
        const file = files?.[0];
        if (file) {
            setValue("file", file, { shouldValidate: true });
        }
    };

    return (
        <div className="relative flex flex-col justify-center items-center gap-5 bg-black px-5 md:px-10 py-16 rounded-lg w-full min-h-screen overflow-hidden font-poppins">
            <div className="z-20 absolute inset-0 bg-orange-900 bg-opacity-30 w-full h-full pointer-events-none [mask-image:radial-gradient(transparent,white)]" />
            <Boxes />
            <Text />
            <SpotlightCard cards={uploadCards} />
            <Modal
                onFileChange={handleFileChange}
                error={errors.file?.message}
                onSubmit={handleSubmit(onSubmit)}
            />
        </div>
    );
}
