"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import useSWR from "swr";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RevolvingDot } from "react-loader-spinner";
import { RotatingSquare } from "react-loader-spinner";
import storage from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Button from "@/UI/Button";
import axios from "axios";

const staticImages = [
  {
    id: "1",
    tag: ["garden", "green"],
    thumb:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "2",
    tag: ["irrigation", "garden"],
    thumb:
      "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "3",
    tag: ["soil", "nature"],
    thumb:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "4",
    tag: ["nature", "sunset"],
    thumb:
      "https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80",
  },
  {
    id: "5",
    tag: ["pasture", "grazing"],
    thumb:
      "https://images.unsplash.com/photo-1589248529232-69c286cf2cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80",
  },
  {
    id: "6",
    tag: ["pumpkin", "farming"],
    thumb:
      "https://plus.unsplash.com/premium_photo-1669122521296-b7317123ac7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "7",
    tag: ["grazing", "island"],
    thumb:
      "https://images.unsplash.com/photo-1569239591652-6cc3025b07fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "8",
    tag: ["tractor", "farming"],
    thumb:
      "https://plus.unsplash.com/premium_photo-1678344155293-1d79eb59cb4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
];
const Dashboard = () => {
  // console.log("Hello, I'm at dashboard already");
  const session = useSession();
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState(null);
  const [img, setImg] = useState("");
  const [images, setImages] = useState(staticImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState(session?.data?.user.email);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, mutate } = useSWR(
    `/api/images?useremail=${session?.data?.user.email}`,
    fetcher
  );

  // const fetchData = axios.get(
  //   `/api/images?useremail=${session?.data?.user.email}`
  // );
  // console.log(fetchData);

  /*const fetchImages = async () => {
    setError(false);
    setLoading(true);

    try {
      const data = await axios.get(
        `/api/images?useremail=${session?.data?.user.email}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      const response = await res.json();
      console.log(data.data);
      setImages(data.data);
    } catch (e) {
      setError(true);
      console.log(e.error);
    }
    setLoading(false);
  };*/

  /*useEffect(() => {
    fetchImages();
  }, []);*/

  // console.log(images);

  if (session.status === "loading") {
    return (
      <div className="absolute h-[100vh] w-[100vw] flex items-center justify-center z-20">
        <RotatingSquare
          height="100"
          width="100"
          color="#8B005D"
          ariaLabel="rotating-square-loading"
          strokeWidth="4"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }

  /*const handleSubmit = async (imgUrl) => {
    // e.preventDefault();

    try {
      await fetch("/api/images", {
        method: "POST",
        body: JSON.stringify({
          img,
          useremail: session.data.user.email,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };*/

  const imageListRef = ref(storage, "images/");
  /*const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then(function (url) {
        console.log(url);
        setImg(url);
      });
    });
    // setTimeout(() => {
    //   handleSubmit(img);
    // }, 5000);
  };*/

  // useEffect(() => {
  //   handleSubmit(img);
  // }, [img]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    // const items = Array.from(data);
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // console.log(items);
    setImages(items);
  }

  const handleSearch = (e) => {
    // console.log(searchTerm);
    if (!searchTerm) return;
    // const updatedImages = images.filter((image) => {
    //   image.tag.some((ele) => {
    //     ele === searchTerm;
    //   });
    // });
    const filteredImages = staticImages.filter((image) =>
      image.tag.includes(searchTerm.toLowerCase())
    );
    if (filteredImages.length <= 0) {
      toast("Searched Image Not Found", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      return;
    } else {
      setImages(filteredImages);
    }
    // setFavorites(updatedFavorites)
  };

  // console.log(data);
  // console.log(session);
  if (session.status === "authenticated") {
    return (
      <div>
        <div className="flex  items-center justify-center w-full bg-pink-200 mt-[80px]">
          {/* <div className=" p-[120px] flex flex-col md:flex-row items-center justify-center gap-10">
            <input
              className="p-5 bg-slate-200"
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <Button disabled={true} onClick={uploadImage} className="font-bold">
              <p className="p-2 font-bold">Upload Image</p>
            </Button>
          </div> */}

          <div className=" p-[120px] flex flex-col md:flex-row items-center justify-center gap-10">
            <input
              placeholder="Search image by tag..."
              className="p-5 bg-slate-200 text-[14px]"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="font-bold" onClick={() => handleSearch()}>
              <p className="p-2 font-bold">Search</p>
            </Button>
            <Button
              className="font-bold"
              onClick={() => setImages(staticImages)}
            >
              <p className="p-2 font-bold">View All Images</p>
            </Button>
            {/* <h1>Image Url</h1>
      <p>{imageUrl}</p>
      <img src={imageUrl} alt="" /> */}
          </div>
        </div>
        <div className="">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="data">
              {(provided) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 bg-green-50 pt-[50px] px-[60px]"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {loading ? (
                    <div className="flex w-[100vw] h-[100vh] z-20  bg-green-50 items-center justify-center absolute top-0 right-0">
                      <RotatingSquare
                        height="100"
                        width="100"
                        color="#8B005D"
                        ariaLabel="rotating-square-loading"
                        strokeWidth="4"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    /*<div className="flex w-[100vw] h-[100vh] z-20  bg-green-50 items-center justify-center absolute top-0 right-0">
                      <RevolvingDot
                        radius="90"
                        strokeWidth="10"
                        color="#8b005d"
                        secondaryColor="green"
                        ariaLabel="revolving-dot-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>*/
                    images.map((image, index) => (
                      <Draggable
                        key={image.id}
                        draggableId={image.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="w-max m-auto"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div className="flex bg-[#8B005D] flex-col items-center justify-center mb-5 mr-2 w-max">
                              <Image
                                src={`${image.thumb}`}
                                alt="new"
                                width={200}
                                height={120}
                              />
                              <div className="p-1 flex text-white">
                                <p className="flex bg-[#8B005D] h-[20px] text-white italics">
                                  <span className="mr-1">Tags: </span>
                                  {image.tag?.map((tag, index) => (
                                    <span className="mr-1" key={index}>
                                      {tag},{" "}
                                    </span>
                                  ))}
                                </p>
                              </div>
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
};

export default Dashboard;
