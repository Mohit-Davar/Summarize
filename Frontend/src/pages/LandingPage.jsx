import FeatureSection from '../components/landingPage/FeatureSection';
import HeroSection from '../components/landingPage/HeroSection';
import Testimonials from '../components/landingPage/Testimonials';
import Workflow from '../components/landingPage/Workflow';
import Navbar from '../components/Navbar';

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