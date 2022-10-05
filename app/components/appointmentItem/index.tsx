import type { Appointment } from "~/types/features";

type AppointmentProps = {
  appointment: Appointment;
  onClick?: () => void;
};

export const AppointmentItem: React.FC<AppointmentProps> = ({
  appointment: { id, title, startDay, endDay },
  onClick,
}): React.ReactElement => {
  return (
    <>
      {
        <div key={id} className="appointment">
          <h1 className="appointment__title">{title}</h1>
          <p className="appointment__description">
            Começa em: {startDay} | Termina em: {endDay}
          </p>

            <button className="delete" onClick={onClick}>
              DELETE
            </button>
        </div>
      }
    </>
  );
};
