import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    handleLogin(email, password, setLoginStatus, navigate)
  };

  return (
    <div className="">
      <div className="bg-image bg-cover bg-center h-screen flex justify-center xl:justify-end items-center w-full m-0">
        <div className="bg-white/70 rounded-xl w-96 h-fit xl:mr-36 mx-7">
          <h2 className="font-semibold text-2xl text-center py-5">
            Welcome Back
          </h2>
          <div className="flex flex-col px-9">
            <label htmlFor="email" className="font-normal text-xl">
              Email
            </label>
            <input
              type="text"
              className="px-4 py-2 rounded-xl outline-blue-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="font-normal text-xl pt-2">
              Password
            </label>
            <input
              type="password"
              className="px-4 py-2 rounded-xl outline-blue-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex px-9 justify-between py-7">
            <button className="bg-white text-blue-500 rounded-lg hover:bg-slate-100 w-fit px-4 py-2 text-lg font-semibold">
              Create Account
            </button>
            <button
              className="bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-fit px-4 py-2 text-lg font-medium"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
          {loginStatus === "Failed" && (
              <p className="text-red-500 text-center font-medium py-4 mx-4">
                Login failed. Please check your email and password.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Login;
