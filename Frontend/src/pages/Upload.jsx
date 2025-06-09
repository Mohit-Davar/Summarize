import { Boxes } from '../components/ui/BackgroundBoxes';
import SpotlightCard from '../components/ui/SpotlightCard';
import Modal from '../components/Upload/Modal';
import Text from '../components/Upload/Text';
import { uploadCards } from '../constants';

export default function Upload() {
    return (
        <div className="relative flex flex-col justify-center items-center gap-5 bg-black px-5 md:px-10 py-16 rounded-lg w-full min-h-screen overflow-hidden font-poppins">
            <div className="z-20 absolute inset-0 bg-orange-900 bg-opacity-30 w-full h-full pointer-events-none [mask-image:radial-gradient(transparent,white)]" />
            <Boxes />
            <Text />
            <SpotlightCard cards={uploadCards} />
            <Modal />
        </div>
    );
}