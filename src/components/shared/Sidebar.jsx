import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Sidebar() {
  const { setUserToken, setUserData, userData } = useContext(AuthContext);
  const logoutHandler = () => {
    setUserData(null);
    setUserToken(null);
    localStorage.removeItem("userToken");
  };
  return (
    <>
      {userData && (
        <aside className="flex flex-col items-center justify-center gap-20 min-h-screen sticky top-0">
          <Link to={"/"}>
            <img
              src="/socialhub-high-resolution-logo-transparent.png"
              alt="logo"
              className="w-50"
            />
          </Link>
          <ul className="flex flex-col justify-evenly items-center gap-8">
            <li>
              <Link to={"/"} className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </Link>
            </li>
            {/* <li className="flex justify-center items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          Search
        </li> */}
            {/* <li>
              <Link
                to={"/profile"}
                className="flex justify-center items-center gap-2"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img alt="Profile img" src={userData.avatar} />
                  </div>
                </div>
                Profile
              </Link>
            </li> */}
            <li>
              <Link
                to={"/?create=new"}
                className="flex justify-center items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Create
              </Link>
            </li>
            <li
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={logoutHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Logout
            </li>
          </ul>
        </aside>
      )}
    </>
  );
}
