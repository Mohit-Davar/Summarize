import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { File } from 'lucide-react';
import { pdfUpload } from '../../api/Upload';
import { showErrorToast } from '../../utils/showToast';

import {
    CloseButton,
    Dialog,
    Portal,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import {
    BorderButton,
    FilledButton,
} from '../ui/Button';

import { FileUpload } from '../ui/FileInput';
import { LoadingDots } from "../ui/Loading";

const pdfUploadSchema = z.object({
    file: z
        .any()
        .refine((file) => file, { message: "File is required" })
        .refine((file) => file?.type === "application/pdf", { message: "Only PDF files are allowed" })
        .refine((file) => file?.size <= 50 * 1024 * 1024, { message: "PDF must be 50MB or less" }),
});

export default function Modal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: zodResolver(pdfUploadSchema) });

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", data.file);
        try {
            await pdfUpload(formData);
            navigate("/chat");
        } catch (error) {
            showErrorToast(error.message || "Error during file upload");
            setOpen(false);
            reset();
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (files) => {
        const file = files?.[0];
        if (file) setValue("file", file, { shouldValidate: true });
    };

    return (
        <Dialog.Root placement="center" lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <FilledButton className="bottom-10 fixed font-calSans">
                    <File className="mr-2" />
                    Add Source
                </FilledButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content as="form" onSubmit={handleSubmit(onSubmit)}>
                        <Dialog.Header>
                            <Dialog.Title className="font-calSans text-orange-500 text-lg">
                                Add Sources
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p className="mb-2 text-neutral-500 text-sm">
                                Sources let Summarize base its responses on the information that matters most to you.
                            </p>
                            <FileUpload onChange={handleFileChange} />
                            {errors.file?.message && <p className="mt-2 text-red-500 text-sm text-center">{errors.file.message}</p>}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <BorderButton type="submit">
                                {loading ? <LoadingDots containerClassName="bg-transparent" dotsClassName="bg-white" /> : "Upload"}
                            </BorderButton>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}