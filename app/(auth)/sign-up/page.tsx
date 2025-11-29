import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignUpForm from "@/components/shared/forms/sign-up-form";
import SignUpGoogleForm from "@/components/shared/forms/sign-up-google-form";

export default function SignUpPage() {
  return (
    <Card className="bg-zinc-900/80 backdrop-blur-xl border-white/10 shadow-2xl">
      <CardHeader className="text-center flex flex-col gap-1 items-center pb-3">
        <CardTitle className="text-2xl font-bold text-white p-0">
          Create an account
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Join thousands of players booking pitches weekly
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <SignUpForm />
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <Separator className="bg-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500">
              Or sign up with
            </span>
          </div>
        </div>

        <SignUpGoogleForm />

        <div className="text-center text-sm text-zinc-500 mt-2">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
