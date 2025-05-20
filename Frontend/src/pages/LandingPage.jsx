import Navbar from "../components/Navbar";
import HeroSection from "../components/landingPage/HeroSection";
import FeatureSection from "../components/landingPage/FeatureSection";
import Workflow from "../components/landingPage/Workflow";
import Testimonials from "../components/landingPage/Testimonials";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="mx-auto px-2 sm:px-6 py-20 max-w-7xl">
                <HeroSection />
                <FeatureSection />
                <Workflow />
                <Testimonials />
            </div>
        </>
    );
}