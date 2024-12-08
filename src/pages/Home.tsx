import React from "react";
import Header from "../components/Header";
import { AppSidebar } from "../components/AppSidebar";
import ChatArea from "../components/ChatArea";

const Home: React.FC = () => (
  <div className="home min-h-screen flex flex-col">
    {/* Header Section */}
    <Header />

    {/* Main Content */}
    <div className="home__content flex-grow flex">
      {/* Sidebar */}
      <aside
        className="home__sidebar w-64 md:w-48 lg:w-64 bg-gray-100 dark:bg-gray-900"
        aria-label="Application Sidebar"
      >
        <AppSidebar />
      </aside>

      {/* Chat Area */}
      <main
        className="home__chat flex-grow bg-white dark:bg-gray-800"
        aria-label="Chat Area"
      >
        <ChatArea />
      </main>
    </div>
  </div>
);

export default Home;