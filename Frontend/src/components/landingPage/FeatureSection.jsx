import { features } from '../../constants/index';

const FeatureSection = () => {
  return (
    <div className="relative mt-20 border-neutral-800 border-b min-h-[800px]" id="features">
      <div className="text-center">
        <span className="px-2 py-1 rounded-full h-6 font-medium text-orange-500 text-sm uppercase">
          Feature
        </span>
        <h2 className="flex flex-wrap justify-center items-center gap-1 mt-10 lg:mt-20 font-calSans text-3xl sm:text-5xl lg:text-6xl tracking-wide">
          Smarter Reading{" "}
          <span className="bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-transparent">
            Starts Here
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="mb-10 w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
              <div className="flex justify-center items-center bg-neutral-900 sm:mx-6 p-2 rounded-full size-10 text-orange-700">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 sm:mb-6 text-xl">{feature.text}</h5>
                <p className="sm:mb-20 text-md text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeatureSection;