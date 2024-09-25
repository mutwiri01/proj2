import { useEffect, useState } from "react";
import c1 from "../assets/c1.jpg"; // Example image for Foundation Level
import c3 from "../assets/c3.jpg"; // Example image for Intermediate Level
import c4 from "../assets/c4.jpg"; // Example image for KASNEB Foundation Pastpapers
import c5 from "../assets/c5.jpg"; // Example image for KASNEB Intermediate Pastpapers

const FeatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const slidingCardClasses = (delay) =>
    `${
      isVisible ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-500 ease-out delay-[${delay}ms] bg-gray-300 text-gray-900 p-6 rounded-lg shadow-lg w-full sm:w-64 md:w-80`;

  return (
    <div  id="FeatureSection"className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          OUR RESOURCES
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            CPA CATALOG
          </span>
        </h2>
      </div>

      {/* Foundation Level */}
      <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={c1}
            alt="Foundation Level"
            className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-80 object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold text-orange-500 mb-5 text-center lg:text-left">
            Foundation Level
          </h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            {[
              "Financial Accounting",
              "Introduction to Law and Governance",
              "Communication Skills",
              "Information Communication Technology",
              "Economics",
              "Quantitative Analysis",
            ].map((subject, index) => (
              <div
                key={index}
                className={slidingCardClasses(index * 100)}
              >
                <h4 className="font-semibold text-lg">{subject}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intermediate Level */}
      <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-6">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={c3}
            alt="Intermediate Level"
            className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-80 object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold text-orange-500 mb-5 text-center lg:text-left">
            Intermediate Level
          </h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            {[
              "Company Law",
              "Financial Management",
              "Public Finance",
              "Management Accounting",
              "Financial Reporting",
            ].map((subject, index) => (
              <div
                key={index}
                className={slidingCardClasses(index * 100)}
              >
                <h4 className="font-semibold text-lg">{subject}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KASNEB Pastpapers - Foundation Level */}
      <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={c4}
            alt="KASNEB Foundation Level Pastpapers"
            className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-80 object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold text-orange-500 mb-5 text-center lg:text-left">
            KASNEB Pastpapers (Foundation Level)
          </h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            {[
              "Financial Accounting Kasneb (2015-2023)",
              "Introduction to Law and Governance Kasneb",
              "Economics Kasneb (2015-2023)",
              "Quantitative Analysis Kasneb (2015-2023)",
              "Communication Skills Kasneb (2015-2023)",
              "Information Communication Technology Kasneb (2015-2023)",
            ].map((pastpaper, index) => (
              <div
                key={index}
                className={slidingCardClasses(index * 100)}
              >
                <h4 className="font-semibold text-lg">{pastpaper}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KASNEB Pastpapers - Intermediate Level */}
      <div className="mt-10 lg:mt-20 mb-10 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-6">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={c5}
            alt="KASNEB Intermediate Level Pastpapers"
            className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-80 object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-xl font-bold text-orange-500 mb-5 text-center lg:text-left">
            KASNEB Pastpapers (Intermediate Level)
          </h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            {[
              "Company Law Kasneb (2015-2023)",
              "Financial Reporting Kasneb (2015-2023)",
              "Auditors (2015-2023)",
              "Preparation of Financial Statements of Different Entities Kasneb (2015-2023)",
              "Financial Reporting (2009-2013)",
            ].map((pastpaper, index) => (
              <div
                key={index}
                className={slidingCardClasses(index * 100)}
              >
                <h4 className="font-semibold text-lg">{pastpaper}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
