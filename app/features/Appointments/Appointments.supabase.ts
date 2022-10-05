
import { createClient } from "@supabase/supabase-js";
import type { Appointment, CreateAppointmentPayload } from '~/types/features'
import { formatDate } from "~/utils/dateHelper"
import { isBefore } from '~/utils/dateHelper'
import { ERROR } from '~/constants'

const url = process.env.SUPABASE_URL!
const token = process.env.SUPABASE_TOKEN!
const supabase = createClient(url, token)

type GetAppointmentsReturn = {
    errorMessage?: string,
    data?: Appointment[]
}

type CreateAppointmentsReturn = {
    errorMessage?: string,
    data?: Appointment[]
    status?: number,
}

export const getAppointments = async (): Promise<GetAppointmentsReturn> => {
    const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';

    const { data, error } = await supabase.from<Appointment>('appointments').select(`id, startDay, endDay, title`)

    if (error) throw new Error(ERROR.MESSAGE_TRY_TO_FETCH_APPOINTMENTS)

    const dataFormatted = data.map(appointment => ({
        ...appointment,
        startDay: formatDate(new Date(appointment.startDay), DATE_TIME_FORMAT),
        endDay: formatDate(new Date(appointment.endDay), DATE_TIME_FORMAT)
    }))

    return { data: dataFormatted }
}

export const createAppointment = async (payload: CreateAppointmentPayload): Promise<CreateAppointmentsReturn | void> => {
    const endDay = payload.endDay!
    const startDay = payload.startDay!
    const isEndDayBeforeTheStartDay = isBefore(new Date(endDay), new Date(startDay))

    if (isEndDayBeforeTheStartDay) throw Error(ERROR.MESSAGE_APPOINTMENT_BEFORE)

    const responseAppointmentList = await supabase.from<Appointment>('appointments')
        .select().gte('startDay', startDay).lte('endDay', endDay)

    if (responseAppointmentList.error) throw new Error(ERROR.MESSAGE_TRY_TO_FETCH_APPOINTMENTS)
    if (responseAppointmentList.data.length > 0) throw new Error(ERROR.MESSAGE_APPOINTMENT_IN_SAME_PERIOD)

    const responseCreateAppointment = await supabase.from<Appointment>('appointments').insert([{
        ...payload,
    }]);

    if (responseCreateAppointment.error) throw new Error(ERROR.MESSAGE_CREATE_NEW_APPOINTMENT)

    return { status: responseCreateAppointment.status }
}

export const deleteAppointment = async (id: number): Promise<void> => {
    
    const { data, error } = await supabase.from<Appointment>('appointments').delete().match({ id })
    if (error) throw new Error(ERROR.MESSAGE_DELETE_APPOINTMENT)
}
