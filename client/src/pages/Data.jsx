import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  Modal,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const Cartegory = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* <h1 className="mt-5 text-xl font-sans ml-3 "> Category</h1> */}

      <div className="">
        <div className="flex justify-between">
          <div className="mt-5 ml-3">Attendence</div>
          <div className=" mt-5">
            <Link to={"/dashboard/create-Data"}>
              <Button
                color="red"
                className="border-2 rounded-md w-36 h-8 bg-fuchsia-700 border-black p-1 text-red-50 "
              >
                AddNew
              </Button>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="table-auto md:mx-auto p-6  w-[1080px]">
            {currentUser.isAdmin && userPosts.length > 0 ? (
              <>
                <Table hoverable className="shadow-md ">
                  <TableHead className="border-2 black h-10">
                    <TableHeadCell className="border-2 black">ID</TableHeadCell>
                    <TableHeadCell className="border-2 black">
                      Category Name
                    </TableHeadCell>

                    <TableHeadCell className="border-2 black">
                      Status
                    </TableHeadCell>
                    <TableHeadCell className="border-2 black">
                      Delete
                    </TableHeadCell>
                    <TableHeadCell className="border-2 black">
                      <span>Edit</span>
                    </TableHeadCell>
                  </TableHead>
                  {userPosts.map((post, index) => (
                    <Table.Body className="divide-y" key={post._id}>
                      <Table.Row className="bg-white dark: border-gray-700 dark:bg-gray-800 border-1 black  ">
                        <Table.Cell className="border-2 black ">
                          <div className="flex justify-center">{index + 1}</div>
                        </Table.Cell>
                        <Table.Cell className="border-2 black">
                          <div className="flex justify-center">
                            {post.title}
                          </div>
                        </Table.Cell>


                        <TableCell className="border-2 black">
                          <div className="flex justify-center">
                            {post.status}
                          </div>
                        </TableCell>
                        <TableCell className="border-2 black">
                          <span
                            onClick={() => {
                              setShowModal(true);
                              setPostIdToDelete(post._id);
                            }}
                            className="font-medium text-red-500 hover:underline cursor-pointer flex justify-center"
                          >
                            Delete
                          </span>
                        </TableCell>
                        <TableCell className="border-2 black">
                          <Link
                            className="text-teal-500 hover:underline flex justify-center "
                            to={`/update-post/${post._id}`}
                          >
                            <span>Edit</span>
                          </Link>
                        </TableCell>
                      </Table.Row>
                    </Table.Body>
                  ))}
                </Table>
                {showMore && (
                  <button
                    onClick={handleShowMore}
                    className="w-full text-teal-500 self-center text-sm py-7"
                  >
                    show more
                  </button>
                )}
              </>
            ) : (
              <p>You have no Data yet!</p>
            )}
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              className="ml-[1000px] border-2 black mt-[180px] mb-[180px]"
            >
              <Modal.Header />
              <Modal.Body>
                <span className="flex justify-end ">
                  <span className="text-center  border-2 black">
                    <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                    <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this Data
                    </h3>
                    <span className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        className="bg-red-600 h-8 rounded-md p-2 mb-2 "
                        onClick={handleDeletePost}
                      >
                        Yes,I'm sure
                      </Button>
                      <Button
                        color="gray"
                        className="bg-green-800 h-8 rounded-md p-2"
                        onClick={() => setShowModal(false)}
                      >
                        No, cancel
                      </Button>
                    </span>
                  </span>
                </span>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};