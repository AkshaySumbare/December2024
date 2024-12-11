
import React, { useState } from "react";
import { Alert, Button, Select, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
export const CreateData = () => {

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  console.log("FormData", formData);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
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
    <>
      <div className="flex ">


        <div className="p-3 max-w-3xl  min-h-screen">
          <h1 className=" text-3xl my-7 font-semibold ">Add Data</h1>
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="flex  gap-4 sm:flex-row   justify-between">
              <TextInput
                type="text"
                placeholder=" Add Name "
                required
                id="title"
                className="flex-1"
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
              ></TextInput>

              <div className="ml-11">
                <Select
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Active">Select status</option>
                  <option value="Present">present</option>
                  <option value="Absent">Absent</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mt-80 ml-96 flex space-x-5">
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
            <div className="flex justify-center">
              {publishError && (
                <Alert color="failure" className="mt-5">
                  {publishError}
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>

    </>
  );
};
