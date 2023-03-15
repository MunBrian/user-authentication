import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState({
    emailErr: false,
    loginErr: false,
  });

  const { emailErr, loginErr } = err;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr((prevState) => ({
        ...prevState,
        emailErr: true,
      }));
      return;
    }

    try {
      const url = "http://localhost:8000/login";

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await data.json();

      if (res.status === 400) {
        setErr((prevState) => ({
          ...prevState,
          loginErr: true,
          emailErr: false,
        }));

        //delete value from password input
        setFormData((prevState) => ({
          ...prevState,
          password: "",
        }));

        return;
      }

      if (res.token) {
        localStorage.setItem("user", JSON.stringify(res.token));
      }

      //if email and password are valid
      //navigate to home page
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-row">
      <div className="basis-1/2">
        <img
          className="object-cover h-screen w-full"
          src={process.env.PUBLIC_URL + "/assets/images/airport.jpg"}
          alt="guy in an airport"
        />
      </div>
      <div className="bg-white basis-1/2 flex flex-col justify-center px-28 py-10">
        <div>
          <div className="mb-4">
            <h4 className="text-base text-darkgrey font-bold">Welcome back</h4>
            <h1 className="text-3xl text-black font-bold">
              Login to your account
            </h1>
          </div>
          <div
            className={`p-3 bg-lightred text-white text-center my-2 rounded-md ${
              !loginErr ? "hidden" : " "
            }`}
          >
            <p>Email or Password is incorrect.</p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className={
                  emailErr
                    ? "block text-red text-base font-medium"
                    : "block text-lightgrey text-base"
                }
              >
                Email
              </label>
              <input
                name="email"
                value={email}
                onChange={handleChange}
                className={
                  emailErr
                    ? "border-red border-2 rounded-md w-full p-2.5 text-red focus:text-black"
                    : "border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey"
                }
                type="email"
                placeholder="Abc@gmail.com"
                required
              />
              <p
                className={emailErr ? "text-sm text-red font-medium" : "hidden"}
              >
                Please enter a valid email address
              </p>
            </div>
            <div className="mb-5">
              <label className="block text-lightgrey text-base">Password</label>
              <input
                value={password}
                name="password"
                onChange={handleChange}
                className="border-lightgrey border-2 rounded-md w-full p-2.5 placeholder:text-darkgrey"
                type="password"
                placeholder="*****"
                required
              />
            </div>
            <div className="mb-6">
              <Link
                className="text-lightblue  font-medium hover:text-darkblue"
                to={"/forgot-password"}
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="submit"
              value="Login"
              className="p-3 mb-3 bg-lightgreen font-semibold  rounded-md text-white transition duration-500 ease-in-out hover:bg-darkgreen"
            />
          </form>
          <div className="mt-28 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-lightblue font-medium hover:text-darkblue"
              >
                Sign up today
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
