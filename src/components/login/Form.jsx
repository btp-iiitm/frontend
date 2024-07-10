import React from "react";
import { ClipLoader } from "react-spinners";
import { UserIcon } from "@heroicons/react/24/solid";

import illustrion from "assets/images/illustration.jpg";

function Form({ email, password, setEmail, setPassword, login, isLoading }) {
  return (
    <div className="flex grow items-center px-[2rem] gap-[2rem] justify-between">
      <div className="flex flex-col gap-[1rem]">
        <span className="font-bold text-[4.4rem]">
          Student <span className="text-secondary-teal">Login</span>
        </span>
        <p className="text-[1.2rem] font-semibold">
          {" "}
          Always Stay Updated in your student portal
        </p>
        <div className="flex flex-col gap-[1rem] w-[90%]">
          <input
            type="email"
            required
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[0.6rem] px-[1rem] py-[0.8rem]"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-[0.6rem] px-[1rem] py-[0.8rem]"
          />
          <button
            type="submit"
            className={`${
              isLoading ? "bg-secondary-black" : "bg-primary-black"
            } text-primary-white flex items-center justify-center gap-[0.5rem] px-[1rem] py-[0.8rem] rounded-[0.6rem]`}
            onClick={login}
            disabled={isLoading}
          >
            <span>Login</span>
            <UserIcon width={20} />
            {isLoading && (
              <div className="flex justify-center items-center">
                <ClipLoader color="#fff" size={18} />
              </div>
            )}
          </button>
        </div>
      </div>
      <div>
        <img src={illustrion} alt="img" className="h-[90%]" />
      </div>
    </div>
  );
}

export default Form;
