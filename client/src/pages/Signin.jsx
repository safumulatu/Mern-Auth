import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:3000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center font-sans font-bold m-8">sign in</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="your password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase w-1/2 mx-32 hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "loading please wait..." : "sign in"}
        </button>
      </form>
      <div className="flex gap-2 justify-center mt-5">
        <p className="font-bold text-xl">dont have an accout?</p>
        <Link to="/signup">
          <span className="text-blue-600 text-xl">create one</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5 text-center">
        {error && "something went wrong!"}
      </p>
    </div>
  );
};
export default Signin;
