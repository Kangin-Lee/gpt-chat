import SignupForm from "./components/SignupForm";

export const metadata = {
  title: "회원가입",
  description: "회원가입",
};

export default function SignupPage() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}
