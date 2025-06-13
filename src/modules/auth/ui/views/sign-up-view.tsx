"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  weight: ["700"],
  subsets: ["latin"],
});

export default function SignUpView() {
  const router = useRouter();
  const trpc = useTRPC();
  const registerMutation = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast(error.message);
      },
      onSuccess: () => {
        router.push("/");
      },
    })
  );
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    registerMutation.mutate(values);
  }
  const username = form.watch("username");
  const usernameError = form.formState.errors.username;

  const showPreview = username && !usernameError;

  return (
    <div className="grid lg:grid-cols-5">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                href={"/"}
                className={cn("text-2xl font-semibold", poppins.className)}
              >
                Funroad
              </Link>
              <Link
                href={"/sign-in"}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "text-base border-none underline",
                  })
                )}
                prefetch
              >
                Sign in
              </Link>
            </div>

            <h1 className="text-4xl font-medium">
              Join over 1,580 creators earning money on Funroad
            </h1>
            {/* username */}
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base ">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden", showPreview && "block")}
                  >
                    Your store will be available at &nbsp;
                    <strong>{username}</strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email */}
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              type="submit"
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
              disabled={registerMutation.isPending}
            >
              Create account
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="  h-screen w-full lg:col-span-2  hidden lg:block"
        style={{
          backgroundImage: "url('/auth-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
