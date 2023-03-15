import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  //get token from url
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [err, setErr] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //check password validity
    if (password !== confirmPassword) {
      setErr(true);
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("");
    console.log(password);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="w-2/5 text-center">
        <div className="mb-4">
          <h2 className="font-bold text-black mb-3 text-3xl">Reset Password</h2>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-lightgrey text-base text-start">
              New Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-lightgrey border-2 rounded-md w-full p-4 placeholder:text-darkgrey"
              type="password"
              placeholder="*****"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-lightgrey text-base text-start">
              Confirm Password
            </label>
            <input
              name="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                err
                  ? "border-red border-2 rounded-md w-full p-2.5 text-red focus:text-black"
                  : "border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey"
              }
              type="password"
              placeholder="*****"
              required
            />
            <p className={err ? "text-sm text-red font-medium" : "hidden"}>
              {message}
            </p>
          </div>
          <input
            value="Submit"
            type="submit"
            className="p-3 bg-lightgreen rounded-md text-white font-semibold transition duration-500 ease-in-out hover:bg-darkgreen"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
