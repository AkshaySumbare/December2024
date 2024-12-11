import React, { useEffect, useState } from "react";
import { Alert, Button, Select, TextInput } from "flowbite-react";
import "react-quill/dist/quill.snow.css";

import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export const Update = () => {

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);

        navigate(`/Data`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  const handleCancle = () => {
    navigate(`/Data`);
  };
  return (
    <div className="flex">


      <div className="p-3 max-w-3xl  min-h-screen">
        <h1 className=" text-3xl my-7 font-semibold ">
          Edit Category
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row  justify-between">
            <TextInput
              type="text"
              placeholder="Title "
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />


            <Select
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              value={formData.status}
            >
              <option value="uncategorize">Select Status</option>

              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Select>
          </div>



          <div className="flex flex-col">
            <div className="mt-40 ml-80 flex space-x-5">
              <Button
                onClick={handleCancle}
                className="w-40 h-10   p-2   rounded-3xl text-black border-2 black "
              >
                Cancle
              </Button>
              <Button
                type="submit"
                className="w-40 h-10  bg-fuchsia-700 p-2  rounded-3xl text-white "
              >
                Save
              </Button>
            </div>
          </div>
          {publishError && (
            <Alert color="failure" className="mt-5 ">
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};
