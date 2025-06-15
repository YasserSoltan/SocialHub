import { Outlet } from "react-router";
import bgImg from "../assets/instagram-login.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex md:flex-row flex-col justify-center items-center gap-8 md:gap-16 max-w-6xl w-full">
          {/* Left section - Background image */}
          <section className="flex-shrink-0 hidden md:block">
            <div className="relative">
              <img
                src={bgImg}
                alt="Instagram login background"
                className="max-w-md h-auto object-contain"
              />
            </div>
          </section>
          {/* Right section - Login form */}
          <section className="flex flex-col items-center gap-6 w-full max-w-sm">
            {/* Logo */}
            <div className="mb-4">
              <img
                className="w-48 h-auto"
                src="/socialhub-high-resolution-logo-grayscale-transparent.png"
                alt="SocialHub Logo"
              />
            </div>
            {/* Form container with card styling */}
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <Outlet />
            </div>
          </section>
        </div>
      </main>
      <footer className="py-4">
        <p className="text-center text-gray-400 text-sm">
          © 2025 SocialHub from Meta
        </p>
      </footer>
    </div>
  );
}
