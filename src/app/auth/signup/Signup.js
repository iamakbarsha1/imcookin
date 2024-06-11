import React, { useState } from "react";
import InputTag from "../../../components/InputTag";
import SignupNav from "../../../components/SignupNav";
// import FormPage from "./section/FormPage";
const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  return (
    <main className="h-screen max-w-6xl mx-auto">
      {/* <FormPage /> */}
      <section className="h-full w-full">
        <SignupNav />
        <main className="flex justify-center">
          <section className="p-4 mt-20 w-[450px] h-fit bg-secondary rounded-lg border border-borderWhite">
            <div className="text-base mb-1 tracking-wider text-stone-400">
              Welcome to Imcookin!
            </div>
            <div className="text-base tracking-wider text-stone-400">
              Let's begin the adventure
            </div>
            <form className="mt-5 flex items-end">
              <section className="w-full">
                <InputTag
                  label={"Enter your email address*"}
                  name={"email"}
                  type={"text"}
                  value={signupData?.email}
                  onChange={(e) => onHandleChange(e)}
                />
              </section>
              <button className="py-1 px-3 ml-2 text-sm border border-borderWhite bg-secondaryDark rounded-md shadow-md">
                Continue
              </button>
            </form>
          </section>
        </main>
      </section>
    </main>
  );
};

export default Signup;
