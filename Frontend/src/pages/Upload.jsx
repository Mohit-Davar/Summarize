import { Boxes } from "../components/ui/BackgroundBoxes";
import SpotlightCard from '../components/ui/SpotlightCard';
import { uploadCards } from "../constants";

export default function Upload() {
    return (
        <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg font-poppins">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            <SpotlightCard cards={uploadCards} />
        </div>
    );
}