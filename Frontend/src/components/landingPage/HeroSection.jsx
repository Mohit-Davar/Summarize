import { Link } from 'react-router-dom';

import {
  BorderButton,
  FilledButton,
} from '../ui/Button';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="flex flex-col font-calSans text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Understand More
        <span className="bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-transparent">
          {" "}
          Read Less
        </span>
      </h1>
      <p className="mt-10 max-w-xl text-neutral-500 text-lg text-center">
        Upload any PDF to get instant summaries, insights, and answers powered by smart AI that helps you study faster and smarter.
      </p>
      <div className="flex flex-wrap justify-center gap-4 my-10">
        <Link to="/signup">
          <FilledButton>
            Start for free
          </FilledButton>
        </Link>
        <a href="#contact">
          <BorderButton>
            Contact Us
          </BorderButton>
        </a>
      </div>
      <div className="flex md:flex-row flex-col justify-center mt-10">
        <video
          autoPlay
          loop
          muted
          className="shadow-orange-400 shadow-sm mx-2 my-4 border-4 border-orange-700 rounded-lg md:w-1/2 object-cover"
        >
          <source src="https://res.cloudinary.com/dpkmmwyg4/video/upload/v1746774815/Summarize/vh9orkxdkc9jaxlcyypp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="shadow-orange-400 shadow-sm mx-2 my-4 border-4 border-orange-700 rounded-lg md:w-1/2 object-cover"
        >
          <source src="https://res.cloudinary.com/dpkmmwyg4/video/upload/v1746774811/Summarize/pi2boqdcsjqldlrl4roj.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;