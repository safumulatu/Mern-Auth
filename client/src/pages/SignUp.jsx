import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-sans font-bold">signup</h1>
      <form className="flex flex-col gap-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="username.."
          name="username"
          className="bg-slate-100 p-3 rounded-lg "
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="bg-slate-100 p-3 rounded-lg "
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg "
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase w-1/2 mx-32 hover:opacity-90 disabled:opacity-75">
          sign up
        </button>
      </form>
      <div className="flex gap-2 justify-center mt-5">
        <p className="font-bold text-xl">have an account?</p>
        <Link to="/login">
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
