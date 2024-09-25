import { TypeAnimation } from "react-type-animation";
import vidm from "../assets/vidm.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        WE OFFER
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          CPA RESOURCES IN :
        </span>
        <br />
            <TypeAnimation className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text"
              sequence={[
                "Financial Accounting",
                1000,
                "Company Law",
                1000,
                "Introduction to Law and Governance",
                1000,
                "Financial Management",
                1000,
                "Communication Skills",
                1000,
                "Public Finance",
                1000,
                "Economics",
                1000,
                "Quantitative Analysis",
                1000,
                "Management Accounting",
                1000,
                "Financial Reporting",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
      Looking for Recently Updated CPA Kasneb notes? Worry Not. Hit Us up.!
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#FeatureSection"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          BROWSE OUR RESOURCES
        </a>
        
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={vidm} type="video/mp4" />
          Your browser does not support the video.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
