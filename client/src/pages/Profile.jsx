import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile picture"
          className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2"
        />
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
