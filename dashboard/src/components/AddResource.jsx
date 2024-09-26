import { useState, useRef } from "react";
import axios from "axios";

const AddResource = () => {
  // State to hold the selected file, resource name, and any messages
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(); // Create a ref for the file input

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name) {
      setUploadStatus("Please provide both a resource name and file.");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("name", name); // Append the resource name

    try {
      // Make POST request to upload the file and resource name
      const response = await axios.post("https://cloudcpa.vercel.app/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle successful response
      setUploadStatus("File uploaded successfully!");

      // Clear the form
      setFile(null);
      setName("");
      fileInputRef.current.value = null; // Reset the file input

      // Optionally, you can reset the upload status after some time
      setTimeout(() => {
        setUploadStatus("");
      }, 3000); // Clear the status after 3 seconds

      console.log("Response:", response.data);
    } catch (error) {
      // Handle error response
      setUploadStatus("File upload failed! Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="add-resource min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Add a New Resource</h1>

        {/* Display upload status */}
        {uploadStatus && <p className="text-center text-red-600">{uploadStatus}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg" encType="multipart/form-data">
          {/* Input for resource name */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Resource Name:
            </label>
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

          {/* Input for file */}
          <div className="space-y-1">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload PDF File:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef} // Attach ref to the file input
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Upload Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResource;
