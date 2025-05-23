import { object, z } from "zod";

export const studentSignupValidator = z.object({
  rollnumber: z.number(),
  email: z.string().email().min(6).max(100),
  password: z
    .string()
    .min(5)
    .max(15)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});

export const studentSigninValidator = z.object({
  rollnumber: z.number(),
  password: z.string().min(10).max(15),
});

export const teacherSignupValidator = z.object({
  teacherId: z.number(),
  email: z.string().email().min(6).max(100),
  password: z
    .string()
    .min(5)
    .max(15)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)"
    ),
});

export const teacherSigninValidator = z.object({
  teacherId: z.number(),
  password: z.string(),
});

export const classValidator = z
  .object({
    classname: z.string().min(3).max(20),
    startroll: z.number().min(1),
    endroll: z.number().min(1),
  })
  .refine((data) => data.endroll >= data.startroll, {
    message: "End roll must be greater than or equal to start roll",
    path: ["endroll"],
  });
