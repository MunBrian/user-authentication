import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  //get user data from localstorage
  const userData = localStorage.getItem("user");

  //get token from  ls
  let token = JSON.parse(userData);

  useEffect(() => {
    const fetchUser = async () => {
      const url = "http://localhost:8000/home";

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = await fetch(url, { headers });

      const res = await data.json();

      //set name to user state
      setUser(res.name);
    };

    fetchUser();
  });

  //if  use data doesn't exist
  if (!userData) {
    //navigate user ro loginpage
    return <Navigate to="/login" />;
  }

  const handleLogout = (e) => {
    e.preventDefault();

    //clear user token
    localStorage.clear();

    navigate("/");
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div>Hello {user}, welcome to the HomePage</div>
        <button
          onClick={(e) => handleLogout(e)}
          className="border-lightgrey border-2 rounded-md p-4 placeholder:text-darkgrey"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default HomePage;
