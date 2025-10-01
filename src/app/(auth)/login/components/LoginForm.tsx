"use client";

import { useActionState, useEffect } from "react";
import { TLoginFormError } from "../../../../../types/form";
import { useFormValidate } from "../../../../../hooks/useFormValidate";
import { toast } from "sonner";
import FormCard from "../../signup/components/FormCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "../../components/FormMessage";
import { LoginSchema } from "../../../../../schemas/auth";
import { login } from "../../../../../actions/login";
import { Submit } from "../../components/Submit";

export default function LoginForm() {
  const [error, action] = useActionState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);
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
        title="로그인"
        footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
      >
        <form action={action} className="space-y-6">
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

          <Submit className="w-full">로그인</Submit>
        </form>
      </FormCard>
    </div>
  );
}
