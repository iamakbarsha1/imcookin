import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/auth/login/Login";
import Signup from "./app/auth/signup/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
