import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewResources.css"; // Import CSS for styling
import { FaDownload, FaTrash } from "react-icons/fa"; // Import download and delete icons

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("https://cloudcpa.vercel.app/api/resources");
        setResources(response.data);
      } catch (err) {
        setError("Failed to load resources.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cloudcpa.vercel.app/api/resources/${id}`);
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (err) {
      console.error("Failed to delete resource", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="view-resources min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Available Resources</h1>
      <div className="resources-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource._id} className="resource-card bg-white rounded-lg shadow-lg flex justify-between items-center">
            <h2 className="text-xl font-semibold">{resource.name}</h2>
            <div className="flex items-center">
              <a
                href={`https://cloudcpa.vercel.app/api/download/${resource._id}`} // Updated URL for downloading
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 flex items-center mr-4"
              >
                <FaDownload className="mr-1" /> {/* Download icon */}
                Download
              </a>
              <button onClick={() => handleDelete(resource._id)}>
                <FaTrash size={20} /> {/* Delete icon */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewResources;
