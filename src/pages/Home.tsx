import React from "react";
import Header from "../components/Header";
import AppSidebar from "../components/AppSidebar";
import ChatArea from "../components/ChatArea";

const Home: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    {/* Header section */}
    <Header />

    {/* Main content area */}
    <div className="flex-grow flex">
      {/* Sidebar */}
      <AppSidebar role="complementary" className="w-64" />

      {/* Chat Area */}
      <ChatArea role="main" className="flex-grow" />
    </div>
  </div>
);

export default Home;