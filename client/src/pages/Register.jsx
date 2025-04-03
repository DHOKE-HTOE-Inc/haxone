import { User, Mail, Lock } from "lucide-react";
import { AuthForm, FormInput } from "../components/Form";
import { Link } from "react-router-dom";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Link to="/login" className="text-black font-bold ml-2 cursor-pointer">
            Sign in
          </Link>
        </>
      }
    >
      <FormInput
        icon={User}
        placeholder="username"
        name="username"
        autoComplete="username"
      />
      <FormInput
        icon={Mail}
        type="email"
        placeholder="email"
        name="email"
        autoComplete="email"
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="password"
        name="password"
        autoComplete="new-password"
      />
      <FormInput
        icon={Lock}
        type="password"
        placeholder="confirm password"
        name="confirmPassword"
        autoComplete="new-password"
      />
    </AuthForm>
  );
}
