import Sidebar from "../Slider/SideBar";
import "./UserProfile.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Header */}

        {/* Dashboard Body */}
        <div className="dashboard-body">
          <h1>Hi from Dashboard</h1>
          <p>Welcome to Lexfactos Lawyer Job Portal Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
