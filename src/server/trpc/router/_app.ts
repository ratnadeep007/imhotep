import { router } from "../trpc";
import { authRouter } from "./auth";
import { consultancyRouter } from './consultancy';
import { doctorRouter } from "./doctor";
import { patientRouter } from "./patient";
import { scheduleRouter } from "./schedule";

export const appRouter = router({
  auth: authRouter,
  consultancy: consultancyRouter,
  doctor: doctorRouter,
  patient: patientRouter,
  schedule: scheduleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
