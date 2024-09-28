import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddResource = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB limit

    if (selectedFile && selectedFile.size > maxSize) {
      toast.error("File size exceeds 5 MB limit.");
      setFile(null);
      fileInputRef.current.value = null; // Reset the input
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name) {
      toast.error("Please provide both a resource name and file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      toast.info("Uploading file...");
      const response = await axios.post("https://cpacloud.vercel.app/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File uploaded successfully!");
      setFile(null);
      setName("");
      fileInputRef.current.value = null;

      console.log("Response:", response.data);
    } catch (error) {
      toast.error("File upload failed! Please try again.");
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="add-resource min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Add a New Resource</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg" encType="multipart/form-data">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Resource Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the resource name"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload PDF File:</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload Resource
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddResource;
