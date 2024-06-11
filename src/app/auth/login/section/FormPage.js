import React, { useState } from "react";
import GoogleSigninBtn from "../../../../components/GoogleSigninBtn";
import { ax_login } from "../../../../api/auth";
import toast from "react-hot-toast";
import { ArrRotateRightO } from "lovedicons/dist/arrO";
import InputTag from "../../../../components/InputTag";

const FormPage = () => {
  const linkSignup = `http://localhost:3000/auth/signup`;
  const linkForgotPass = `http://localhost:3000/auth/forgotPass`;

  const [isLoading, setisLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    emailUsername: "",
    password: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSigninClick = async (e) => {
    e.preventDefault();
    const data = {
      emailUsername: loginData.emailUsername,
      password: loginData.password,
    };

    setisLoading(true);
    const ax = await ax_login(data);
    console.log("ax_login --> clg ----> " + JSON.stringify(ax));
    if (ax.code === 200) {
      toast.success(ax.description);
      setTimeout(() => {
        setisLoading(false);
      }, [300]);
    } else {
      toast.error(ax.description);
      setTimeout(() => {
        setisLoading(false);
      }, [300]);
    }
    setLoginData({
      emailUsername: "",
      password: "",
    });
  };

  return (
    <main className="h-fit w-80 flex flex-col items-center justify-center">
      <section>
        <img alt="logo" />
      </section>
      <section>
        <h1 className="mb-3 text-2xl font-light">Sign in to Imcookin!</h1>
      </section>
      <section className="p-4 w-full bg-secondary rounded-lg border border-borderWhite">
        <form onSubmit={onSigninClick}>
          <InputTag
            label={"Username or email address"}
            name={"emailUsername"}
            type={"text"}
            value={loginData?.emailUsername}
            onChange={(e) => onHandleChange(e)}
          />
          <InputTag
            label={"Password"}
            name={"password"}
            type={"password"}
            value={loginData?.password}
            onChange={(e) => onHandleChange(e)}
          />
          <div
            onClick={onSigninClick}
            className="mt-3 px-2 py-1 text-center bg-green-700 rounded-lg cursor-pointer"
          >
            <button type="submit">
              {isLoading ? (
                <ArrRotateRightO className="loadingIcon w-5 h-5" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </section>
      <section className="mt-4 p-4 w-full flex flex-col items-center justify-center rounded-lg border border-borderWhite">
        <GoogleSigninBtn />
        <label className="labelTag mt-2">
          <span className="">New to Imcookin?</span>
          <a href={linkSignup} className="text-blue-400">
            {" "}
            Create an account
          </a>
        </label>
      </section>
    </main>
  );
};

export default FormPage;
