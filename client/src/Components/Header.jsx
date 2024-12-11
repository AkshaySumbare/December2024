import { Button, Navbar } from "flowbite-react";
import { Link, } from "react-router-dom";



export const Header = () => {


  return (
    <>
      <div className="  bg-fuchsia-700 ">
        <Navbar className="border-b-2 h-14 p-2 bg-fuchsia-700 ">

          <Link to={`/Data`}>Attendence</Link>
          <Link to={`/`}>Home</Link>
          <Link to={`/sign-in`}>SignIn</Link>
        </Navbar>

      </div>
    </>
  );
};
