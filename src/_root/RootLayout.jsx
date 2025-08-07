import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";
import RightSidebar from "../components/shared/RightSidebar";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function RootLayout() {
  const {setUserToken, setUserData} = useContext(AuthContext)

  const handleLogout = () => {
    setUserData(null);
    setUserToken(null);
    localStorage.removeItem("userToken");
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation Bar - Only visible on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <a href="/" className="text-gray-600 hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </a>
          <a href="/?create=new" className="text-gray-600 hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </a>
          <a href="/profile" className="text-gray-600 hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </a>
          <button onClick={handleLogout} className="text-gray-600 hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 pb-16 md:pb-0">
        {/* Sidebar - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block md:col-span-1 bg-blue-950 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="col-span-1 md:col-span-3 text-center px-4 md:px-0">
          <Outlet />
        </main>

        {/* Right Sidebar - Hidden on mobile, visible on md and up */}
        <div className="hidden md:block md:col-span-1">
          <RightSidebar />
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
