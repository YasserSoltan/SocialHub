import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";
import RightSidebar from "../components/shared/RightSidebar";

export default function RootLayout() {
  return (
    <div className="">
      <div className="grid grid-cols-5 gap-5">
        <div className="md:col-span-1 col-span-5 bg-blue-950 text-white">
          <Sidebar />
        </div>
        <div className="col-span-3 text-center">
          <Outlet />
        </div>
        <div className="col-span-1">
            <RightSidebar />
        </div>
      </div>
    </div>
  );
}
