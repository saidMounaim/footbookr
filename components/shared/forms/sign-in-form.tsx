"use client";

import { signInSchema } from "@/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    setIsLoading(true);
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="player@footbookr.com"
                    className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-zinc-300">Password</FormLabel>
                  <Link
                    href="#"
                    className="text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-900/20"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}
