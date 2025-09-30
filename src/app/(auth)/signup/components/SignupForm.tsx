"use client";
import { Label } from "@/components/ui/label";
import FormCard from "./FormCard";
import { Input } from "@/components/ui/input";
import Submit from "../../components/Submit";
import { useFormValidate } from "../../../../../hooks/useFormValidate";
import { SignUpSchema } from "../../../../../schemas/auth";
import { TSignupFormError } from "../../../../../types/form";
import { FormMessage } from "../../components/FormMessage";
import { useActionState, useEffect } from "react";
import { signUp } from "../../../../../actions/signup";
import { toast } from "sonner";

export default function SignupForm() {
  const [error, action] = useActionState(signUp, undefined);
  const { errors, validateField } =
    useFormValidate<TSignupFormError>(SignUpSchema);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <div>
      <FormCard
        title="회원가입"
        footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
      >
        <form action={action} className="space-y-6">
          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="이름을 입력해 주세요"
              error={!!errors?.name}
              onChange={handleChange}
            />
            {errors?.name && <FormMessage message={errors.name[0]} />}
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력해 주세요"
              error={!!errors?.email}
              onChange={handleChange}
            />
            {errors?.email && <FormMessage message={errors.email[0]} />}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="비빌번호를 입력해 주세요"
              error={!!errors?.password}
              onChange={handleChange}
            />
            {errors?.password && <FormMessage message={errors.password[0]} />}
          </div>

          <Submit className="w-full">가입하기</Submit>
        </form>
      </FormCard>
    </div>
  );
}
