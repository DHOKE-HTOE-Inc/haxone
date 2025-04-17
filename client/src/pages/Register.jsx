import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthForm, FormInput } from "../components/Form";
import { showToast } from "../utils/toast";
import { registerUser } from "../store/slices/authSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      showToast.success("Registered Successfully");
      navigate("/login");
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
      button="Register"
      form={{ onSubmit: handleSubmit }}
      className="py-[50px]"
      footer={
        <>
          Already have an account?
          <Link
            to="/login"
            className="text-primary font-semibold ml-2 cursor-pointer hover:text-gray-600"
          >
            Sign in
          </Link>
        </>
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
        icon={Mail}
        type="email"
        placeholder="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
    </AuthForm>
  );
}
