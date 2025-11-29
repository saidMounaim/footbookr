import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SignInForm from "@/components/shared/forms/sign-in-form";
import SignUpGoogleForm from "@/components/shared/forms/sign-up-google-form";

export default function SignInPage() {
  return (
    <Card className="bg-zinc-900/80 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center flex flex-col gap-1 items-center pb-3">
        <CardTitle className="text-2xl font-bold text-white p-0">
          Welcome back
        </CardTitle>
        <CardDescription className="text-zinc-400 p-0">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <SignInForm />

      <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <Separator className="bg-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500">
              Or continue with
            </span>
          </div>
        </div>

        <SignUpGoogleForm />

        <div className="text-center text-sm text-zinc-500 mt-2">
          {"Don't have an account?"}{" "}
          <Link
            href="/sign-up"
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
