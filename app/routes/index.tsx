import { useLoaderData } from "@remix-run/react";

import { AppointmentsSupaBase } from "~/features/Appointments";
import { IndexComponent } from "~/features/Appointments/components";
import type { Appointment } from "~/types/features";
import { ErrorMessage } from "~/components";

type LoaderData = {
  data?: Appointment[];
  url: string,
  token: string,
};

export const loader = async (): Promise<LoaderData> => {
  const url = process.env.SUPABASE_URL!;
  const token = process.env.SUPABASE_TOKEN!;
  const { data } = await AppointmentsSupaBase.getAppointments();
  return {
    data,
    url,
    token,
  };
};

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <ErrorMessage errorMessage={error.message} />
);

export default function () {
  const { data, url, token } = useLoaderData<LoaderData>();

  return <IndexComponent data={data} url={url} token={token} />;
}
