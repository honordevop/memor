"use client";
import React from "react";
import styles from "./uploadimage.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import storage from "@/utils/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";

const UploadImage = () => {
  const session = useSession();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [img, setImg] = useState("");

  const handleSubmit = async (imgUrl) => {
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
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then(function (url) {
        console.log(url);
        setImg(url);
      });
    });
    handleSubmit(img);
  };

  return (
    <div className=" bg-yellow-400 p-[100px]">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image</button>
      {/* <h1>Image Url</h1>
      <p>{imageUrl}</p>
      <img src={imageUrl} alt="" /> */}
    </div>
  );
};

export default UploadImage;
