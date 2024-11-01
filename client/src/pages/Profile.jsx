import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Profile = () => {
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  useEffect(() => {
    handleFileUpload(image);
  }, [image]);
  console.log(imagePercent);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile picture"
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2"
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 bg-slate-100 rounded-lg"
        />{" "}
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="p-3 bg-slate-100 rounded-lg"
        />{" "}
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 bg-slate-100 rounded-lg"
        />
        <button className="bg-blue-700 mx-auto p-3 w-52 cursor-pointer hover:bg-blue-500 text-white font-bold rounded-2xl uppercase disabled:opacity-90">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer hover:text-red-400 text-2xl">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer hover:text-red-400 text-2xl ">
          Signout
        </span>
      </div>
    </div>
  );
};

export default Profile;
