import React from "react";
import Header from "../components/Header";
import AppSidebar from "../components/AppSidebar";
import ChatArea from "../components/ChatArea";

const Home: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-grow flex">
      <aside className="w-64">
        <AppSidebar />
      </aside>
      <main className="flex-grow">
        <ChatArea />
      </main>
    </div>
  </div>
);

export default Home;