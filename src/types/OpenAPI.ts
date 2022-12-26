import { z } from "zod";

export const consultancySchema = z.object({
  id: z.bigint(),
  date: z.preprocess((val) => String(val), z.string()),
  doctorId: z.string(),
  patientId: z.string(),
  complete: z.boolean()
});

export const createBookingReturnTypeSchema = z.union([
  consultancySchema,
  z.object({
    error: z.string()
  })
]);

export const doctorSchema = z.object({
  id: z.string(),
  name: z.string()
});

export const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string()
});

export const bookingsSchema = z.array(
  consultancySchema.and(
    z.object({
      doctor: doctorSchema,
      patient: patientSchema
    })
  )
);
