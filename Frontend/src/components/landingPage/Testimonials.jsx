import { testimonials } from '../../constants/index';

const Testimonials = () => {
  return (
    <div className="mt-20 tracking-wide" id="testimonials">
      <h2 className="flex flex-wrap justify-center items-center gap-1 mt-10 lg:mt-20 font-calSans text-3xl sm:text-5xl lg:text-6xl tracking-wide mb-5">
        What People{" "}
        <span className="bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 text-transparent">
          are Saying
        </span>
      </h2>
      <div className="flex flex-wrap justify-center items-stretch">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex px-2 sm:px-4 py-2 w-full sm:w-1/2 lg:w-1/3">
            <div className="flex flex-col justify-between bg-neutral-900 p-3 sm:p-6 border border-neutral-800 rounded-md w-full text-md">
              <p className="font-light text-md text-neutral-400">{testimonial.text}</p>
              <div className="flex items-start mt-8">
                <img
                  className="mr-6 border-2 border-orange-500 rounded-full w-12 h-12"
                  src={testimonial.image}
                  alt=""
                />
                <div>
                  <h6 className="font-bold">{testimonial.user}</h6>
                  <span className="font-normal text-md text-neutral-600 italic">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;