import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // New component

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import "./App.css";
import AddResource from './components/AddResource';
import ViewResources from "./components/ViewResources";

const App = () => {
  return (
    <Router>
      {/* Flex container to hold sidebar and main content */}
      <div className="app-container">
        <Sidebar />
        {/* Main content */}
        <div className="main-content">
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/add-resource" element={<AddResource/>} />
            <Route path="/view-resources" element={<ViewResources/>} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
