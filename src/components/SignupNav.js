import React from "react";
import { useNavigate } from "react-router-dom";

const SignupNav = () => {
  const linkSignin = "http://localhost:3000/auth";

  const navigate = useNavigate();
  const onSigninClick = () => {
    navigate("/auth/singup");
  };
  return (
    <main className="px-10 py-3 flex items-center justify-between">
      <section>
        <img
          alt=""
          src="/images/mesh-gradient.png"
          className="w-10 h-10 rounded-full"
        />
      </section>
      <section className="flex items-center justify-center">
        <div className="text-stone-400">Already have an account? </div>
        <a href={linkSignin} className="ml-2 cursor-pointer">
          {" "}
          Sign in →
        </a>
        {/* <div className="ml-2 cursor-pointer" onClick={onSigninClick}>
          {" "}
          Sign in →
        </div> */}
      </section>
    </main>
  );
};

export default SignupNav;
