import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";
import "./style.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  function postData() {
    // Add Backend Logic
    console.log("Username", username);
    console.log("Password", password);
    setAuth(true);
    return;
  }
  // ################################################
  const url = "http://localhost:3500/api/v1/login";

  const handleLogin = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  // ################################################
  useEffect(() => {
    auth && navigate("/home");
  }, [auth, navigate]);

  return (
    <>
      <main className="flex justify-center items-center flex-col gap-[3rem] flex-wrap">
        <img
          src={logo}
          alt=""
          className="w-[15rem] justify-self-center self-center"
        />
        <h1 className="font-['Cairo'] text-center text-[2rem] font-bold text-[#FF007A]">
          LOGIN TO CONTINUE
        </h1>

        <section
          data-function="form"
          className="flex justify-center items-center flex-col gap-[3rem] flex-wrap rounded-[10px]"
        >
          {/*Form?*/}
          <div className="px-[1.5rem] flex justify-center items-center gap-[1.2rem] flex-wrap">
            <label className="text-[1.2rem] text-[#FF007A]" htmlFor="username">
              Username:
            </label>
            <input
              data-function="fetch-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="px-[1.5rem] flex justify-center items-center gap-[1.2rem] flex-wrap">
            <label className="text-[1.2rem] text-[#FF007A]" htmlFor="password">
              Password:
            </label>
            <input
              data-function="fetch-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="button-holder flex justify-center flex-col items-center gap-[1.5rem] flex-wrap">
            <button
              data-function="login"
              onClick={postData}
              className="font-['Cairo'] py-[0.4rem] px-[4rem] text-[1.2rem] text-[#FF007A]"
            >
              LOGIN
            </button>
            <button
              data-function="google-auth"
              onClick={handleLogin}
              className="font-['Cairo'] py-[0.5rem] px-[1.2rem] text-[1rem] text-[#ccc]"
            >
              LOGIN WITH GOOGLE
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
