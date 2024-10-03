import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa"; // Import download icon

const Workflow = () => {
  const [resources, setResources] = useState([]);

  // Fetch resources on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "https://cpacloud.vercel.app/api/resources"
        ); // Updated URL
        console.log("Fetched Resources:", response.data);
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div id="free-resources" className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Free resources{" "}
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          to aid your studies.
        </span>
      </h2>
      <div className="flex justify-center mt-10">
        {/* Resources List Section */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((resource) => {
              console.log("Resource ID:", resource._id); // Log the ID
              return (
                <div
                  key={resource._id}
                  className="bg-neutral-900 text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h4 className="text-lg font-semibold">{resource.name}</h4>
                  <a
                    href={resource.url} // Direct Cloudinary URL for download
                    className="mt-2 inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload className="mr-1" /> Download
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
