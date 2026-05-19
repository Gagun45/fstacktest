// import { ISignInPayload } from "@/features/auth/api/auth.types";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import SignInEmailField from "./fields/EmailField";
import SignInPasswordField from "./fields/PasswordField";
import { LoadingButton } from "@/components/general/LoadingButton";
import { authSchemas, ISignInDto } from "@repo/shared";
import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { frontendUrls } from "@/lib/frontendUrls";

const SignInForm = () => {
  const { mutate, isPending } = useSignIn();
  const router = useRouter();
  const schema = authSchemas.signIn;
  const form = useForm<ISignInDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (formData: ISignInDto) => {
    mutate(formData, {
      onSuccess: () => {
        router.push("/");
        toast.success("Signed in!");
      },
      onError: (e) => {
        const msg = e.response?.data.message ?? "Something went wrong";
        toast.error(msg);
      },
    });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SignInEmailField />
        <SignInPasswordField />
        <div className="flex justify-end">
          <Link href={frontendUrls.auth.forgotPassword}>Forgot password?</Link>
        </div>

        <LoadingButton
          isPending={isPending}
          type="submit"
          className="form-submit-btn"
        >
          Sign In
        </LoadingButton>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
