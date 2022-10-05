import {  useTransition } from "@remix-run/react";
import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { AppointmentsSupaBase } from "~/features/Appointments";
import type {  CreateAppointmentPayload } from "~/types/features";
import  {  NewAppointmentForm } from "~/features/Appointments/components";

import { Loading, ErrorMessage } from "~/components";
import { PATHS } from "~/enums/routes";

type FormFields = {
  title?: string,
  startDay?: string,
  startTime?: string,
  endDay?: string,
  endTime?: string,
}

export const action: ActionFunction = async ({ request }) => {
  const body: FormFields = Object.fromEntries(await request.formData());
  const startDay = `${body.startDay} ${body.startTime}`
  const endDay = `${body.endDay} ${body.endTime}`
  const payload: CreateAppointmentPayload = {title: body.title, startDay, endDay};

  await AppointmentsSupaBase.createAppointment(payload);

  return redirect(PATHS.HOME)
};

export const ErrorBoundary = ({error}:{error: Error}) => <ErrorMessage errorMessage={error.message} />;

export default function () {
  const transition = useTransition();
  const isLoading = transition.state === "loading"

  return (
    <div>
      <Loading isLoading={isLoading}/>
      <h1 className="title-appointment">Create Appointment</h1>
      <NewAppointmentForm />
    </div>
  );
}
