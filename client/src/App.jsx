import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Header } from "./Components/Header";
import { Signin } from "./pages/Signin";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { CreateData } from "./pages/CreateData";
import { Update } from "./pages/Update";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard/create-Data" element={<CreateData />} />
        <Route path="/update-post/:postId" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}
