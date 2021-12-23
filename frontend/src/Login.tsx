import React from "react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="relative full flex justify-center items-center bg-gray-300">
      <div className="relative w-2/5 shadow-md bg-white py-10 flex justify-start items-center flex-col rounded-md">
        <div className="relative flex justify-center items-center">
          {" "}
          <h1 className="text-2xl capitalize text-black">welcome back</h1>
        </div>
        <div className="relative flex justify-center items-center mb-4">
          {" "}
          <h4
            className="text-base text-gray-500
          "
          >
            Input your details to access your account
          </h4>
        </div>

        <form className="relative flex flex-col items-center w-full h-full">
          <input
            type="text"
            placeholder="Input your e-mail"
            className="pl-1 border py-2 w-2/3 relative rounded-sm outline-none mb-1 capitalize"
          />
          <input
            type="text"
            placeholder="Input your password"
            className="pl-1 border py-2 w-2/3 relative rounded-sm outline-none mb-1 capitalize"
          />
          <button
            type="submit"
            className="relative py-3 bg-blue-500 mt-2 w-2/3 rounded-sm text-white capitalize text-lg"
          >
            login
          </button>
        </form>

        <div className="relative flex justify-center items-center mt-6">
          <h4 className="text-gray-500 capitalize text-sm">
            don't have an account? sign up
          </h4>
          {/* <Link to="/signup" className="">
            Sign up
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
