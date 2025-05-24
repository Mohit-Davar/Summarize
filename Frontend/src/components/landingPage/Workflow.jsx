import { CheckCircle2 } from 'lucide-react';

import { checklistItems } from '../../constants/index';

const Workflow = () => {
  return (
    <div className="mt-20" id="workflow">
      <h2 className="flex flex-wrap justify-center items-center gap-1 mt-10 lg:mt-20 font-calSans text-3xl sm:text-5xl lg:text-6xl tracking-wide">
        Smarter Way to{" "}
        <span className="bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-transparent">
          Read PDFs.
        </span>
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="p-2 w-full lg:w-1/2">
          <img src="https://res.cloudinary.com/dpkmmwyg4/image/upload/v1746892284/Summarize/lf1gvj0u1o5ilipbsg6l.png" alt="Coding" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-10 sm:mb-12">
              <div className="justify-center items-center sm:mx-6 p-2 rounded-full size-10 text-green-400">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Workflow;