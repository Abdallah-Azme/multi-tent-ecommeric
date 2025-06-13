import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username but only contain letters, numbers, and dashes. Must start and end with a letter or number."
    )
    .refine((val) => !val.includes("--"), 'Usernames cannot contain "--"')
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
