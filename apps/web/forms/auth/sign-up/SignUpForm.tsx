import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import SignUpEmailField from "./fields/EmailField";
import SignUpNameField from "./fields/NameField";
import SignUpPasswordField from "./fields/PasswordField";
import SignUpUsernameField from "./fields/UsernameField";
import { frontendUrls } from "@/lib/frontendUrls";
import { authSchemas, SignUpDto } from "@repo/shared";
import { LoadingButton } from "@/components/general/LoadingButton";
import { toast } from "sonner";

const SignUpForm = () => {
  const { mutate, isPending } = useSignUp();
  const router = useRouter();
  const schema = authSchemas.signUp;
  const form = useForm<SignUpDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
  });
  const onSubmit = async (formData: SignUpDto) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Logged in!");
        router.push(frontendUrls.home);
      },
      onError: (e) => {
        const msg = e.response?.data.message;
        toast.error(msg);
      },
    });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SignUpEmailField />
        <SignUpPasswordField />
        <SignUpNameField />

        <SignUpUsernameField />
        <LoadingButton
          isPending={isPending}
          type="submit"
          className="form-submit-btn"
        >
          Sign Up
        </LoadingButton>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
