import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./app/auth/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
