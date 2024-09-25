import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus,AiFillBook } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { RiProductHuntLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '/lf.jpg'; // Adjust the path to your logo image
import '../styles/Sidebar.css'; // Custom CSS for the sidebar

const Sidebar = () => {
  const navigateTo = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // To toggle sidebar visibility

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigate to Add Resources page
  const gotoAddResources = () => {
    navigateTo('/add-resource');// Close sidebar after navigating
  };
  const gotoViewResources = () => {
    navigateTo('/view-resources');
  };
  // Navigate to Add Products page
  const gotoAddProducts = () => {
    navigateTo('/add-products');
  };

  const gotoViewProducts = () => {
    navigateTo('/add-products');
  };  

  // Handle logout
  const handleLogout = () => {
    // Perform logout logic here (like clearing tokens or calling an API)
    navigateTo('/login'); // Redirect to login page after logout
  };

  return (
    <>
      {/* Hamburger Menu Icon */}
      <GiHamburgerMenu className="hamburger-icon" onClick={toggleSidebar} />

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Sidebar Links */}
        <div className="sidebar-links">
          {/* Add Resources */}
          <div className="sidebar-link" onClick={gotoAddResources}>
            <AiOutlinePlus className="icon" />
            <span>Add Resources</span>
          </div>

          <div className="sidebar-link" onClick={gotoViewResources}>
            <AiFillBook className="icon" />
            <span>View Resources</span>
          </div>

          {/* Add Products */}
          <div className="sidebar-link" onClick={gotoAddProducts}>
            <RiProductHuntLine className="icon" />
            <span>Add Products</span>
          </div>

          {/* ViewProducts */}
          <div className="sidebar-link" onClick={gotoViewProducts}>
            <RiProductHuntLine className="icon" />
            <span>View Products</span>
          </div>
          

          {/* Logout */}
          <div className="sidebar-link" onClick={handleLogout}>
            <FiLogOut className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
