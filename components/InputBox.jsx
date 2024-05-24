import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadString, getDownloadURL, getStorage } from "firebase/storage";

function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();
  
    if (!inputRef.current.value) return;
  
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: Timestamp.now(),
      });
  
      if (imageToPost) {
        const storage = getStorage();
        const storageRef = ref(storage, `posts/${docRef.id}`);
  
        try {
          await uploadBytes(storageRef, imageToPost); // Use uploadBytes for files
          const imageUrl = await getDownloadURL(storageRef);
          await addDoc(collection(db, 'posts', docRef.id, 'images'), {
            image: imageUrl,
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle upload error
        }
  
        setImageToPost(null);
      }
  
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6 ">
      <div className="flex space-x-4 p-4 items-center ">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session.user.name} ?`}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img src={imageToPost} alt="" className="h-10 object-contain" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
