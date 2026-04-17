import AuthRedirect from "./_components/auth-redirect";
import LoginForm from "./_components/login-form";

export default function page() {
  return (
    <div className="flex items-center justify-center ">
      <AuthRedirect />
      <LoginForm />
    </div>
  );
}
