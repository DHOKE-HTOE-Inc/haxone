import { useState } from "react";
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthForm, FormInput } from "../components/Form";
import { loginUser } from "../store/slices/authSlice";
import { showToast } from "../utils/toast";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      const user = response.user;
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("username", user.username);
      showToast.success("Logged in Successfully");
      navigate("/");
    } catch (err) {
      showToast.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthForm
      header="Welcome to Haxone!"
      button="Login"
      form={{ onSubmit: handleSubmit }}
      className="py-[40px]"
      footer={
        <div className="">
          Haven't registered yet?
          <Link
            to="/register"
            className="text-primary font-semibold ml-2 cursor-pointer hover:text-gray-600"
          >
            Register Here
          </Link>
        </div>
      }
    >
      <FormInput
        icon={User}
        placeholder="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        autoComplete="username"
        required
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="current-password"
        required
      />
      <div className="text-center py-1">
        <Link className="text-lg font-[500] text-[var(--color-primary)] opacity-60 hover:text-gray-600 outline-none cursor-pointer">
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
}
