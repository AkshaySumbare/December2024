import { Avatar, Button, Dropdown, DropdownItem, Navbar } from "flowbite-react";
import { Link, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export const Header = () => {

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);


  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar className="border-b-2 bg-fuchsia-700 h-14 p-2 ">
        <div className=" flex ">
          <div className="">
            
          </div>
          <div className="ml-[1200px]">
            <Link to={`/sign-in`}>SignIn</Link>
          </div>
        </div>

        <div className=" flex gap-4 md:order-2  ">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="user" rounded></Avatar>}
            >
              <Dropdown.Header>
                <span className="block text-sm ">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate ">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <Dropdown.Divider />
              <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button
                gradientDuoTone="purpleToBlue"

                className="text-black mr-10 rounded-full bg-red-700"
                outline
              >
                Sign In
              </Button>
            </Link>

          )}
        </div>
      </Navbar>
    </>
  );
};
