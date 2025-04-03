import { User, Lock } from "lucide-react";
import { AuthForm, FormInput } from "../components/Form";
import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <AuthForm
      header="Welcome to Haxone!"
      button="Login"
      form={{ onSubmit: handleSubmit }}
      className="py-[40px]"
      footer={
        <div className="text-lg">
          Haven't registered yet?
          <Link
            to="/register"
            className="text-black font-bold ml-2 cursor-pointer"
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
        autoComplete="username"
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="password"
        name="password"
        autoComplete="current-password"
      />
      <div className="text-center py-1">
        <Link
          to="/forgot-password"
          className="text-lg font-[500] text-[var(--color-primary)] opacity-60 hover:text-gray-600 outline-none cursor-pointer"
        >
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
}
