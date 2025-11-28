"use client";

import { signUpSchema } from "@/lib/zodSchemas";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
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
                <FormLabel className="text-zinc-300">Password</FormLabel>
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
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
}
