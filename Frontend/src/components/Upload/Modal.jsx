import { File } from 'lucide-react';

import {
    CloseButton,
    Dialog,
    Portal,
} from '@chakra-ui/react';

import { BorderButton } from '../ui/Button';
import { FileUpload } from '../ui/FileInput';

export default function Modal({ onFileChange, error, onSubmit }) {
    return (
        <Dialog.Root placement="center" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
                <BorderButton className="bottom-10 fixed">
                    <File className="mr-2" />
                    Upload File
                </BorderButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content as="form" onSubmit={onSubmit}>
                        <Dialog.Header>
                            <Dialog.Title className="font-calSans text-orange-500 text-lg">
                                Add Sources
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p className="mb-2 text-neutral-500 text-sm">
                                Sources let Summarize base its responses on the information that matters most to you.
                            </p>
                            <FileUpload onChange={onFileChange} />
                            {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <BorderButton type="submit" >
                                Done
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