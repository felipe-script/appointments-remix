export type Appointment = {
    id: number,
    title: string,
    startDay: string,
    endDay: string
}

export type CreateAppointmentPayload = {
    title?: string,
    startDay?: string,
    endDay?: string,
}