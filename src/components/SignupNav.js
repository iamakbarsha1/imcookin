import React from "react";

const SignupNav = () => {
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
        <div className="ml-2"> Sign in →</div>
      </section>
    </main>
  );
};

export default SignupNav;
