import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import { Header } from "./Components/Header";
import { Signin } from "./pages/Signin";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { CreateData } from "./pages/CreateData";
import { Update } from "./pages/Update";
import { Cartegory } from "./pages/Data";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/Data" element={<Cartegory />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard/create-Data" element={<CreateData />} />
        <Route path="/update-post/:postId" element={<Update />} />

      </Routes>
    </BrowserRouter>
  );
}
