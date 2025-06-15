import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function RightSidebar() {
  const { setUserToken, setUserData, userData } = useContext(AuthContext);
  const handleSwitchAccount = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
    setUserToken(null);
  };
  return (
    <>
      {userData && (
        <section className="flex flex-col justify-around min-h-screen ">
          <div className="flex items-center justify-between p-4 ">
            <Link
              to={"/profile"}
              className="flex justify-center items-center gap-2"
            >
              <div className="avatar">
                <div className="w-11 rounded-full">
                  <img src={userData.avatar} alt="Profile img" />
                </div>
              </div>
              <p className="flex flex-col justify-center items-start">
                <span>{userData.username}</span>{" "}
                <span>{userData.fullName}</span>
              </p>
            </Link>
            <button className="text-blue-500 hover:text-blue-600 cursor-pointer" onClick={handleSwitchAccount}>
              Switch
            </button>
          </div>
          <div>
            <p className="text-center text-gray-400 text-sm">
              About • Help • Press • API • Jobs • Privacy • Terms • Locations •
              Language •
            </p>
            <p className="text-center text-gray-400 text-sm">
              Meta Verified © 2025 SocialHub from Meta
            </p>
          </div>
        </section>
      )}
    </>
  );
}
