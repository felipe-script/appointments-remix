import {
    setDefaultOptions,
    format as dateFnsFormat,
    differenceInMinutes as dateFnsDifferenceInMinutes,
    isBefore as dateFnsBefore,
} from 'date-fns';
import { ptBR } from 'date-fns/locale'

setDefaultOptions({ locale: ptBR })

const defaultFormat = 'dd/MM/yyyy';
const dateTimeFormat = 'dd/MM/yyyy HH:mm:ss';

export const formatDate = (date: Date, format: string = defaultFormat): string => dateFnsFormat(date, format)

export const formatDateTime = (date: Date, format: string = dateTimeFormat): string => dateFnsFormat(date, format)

export const differenceInMinutes = (dateLeft: Date, dateRight: Date): number => dateFnsDifferenceInMinutes(dateLeft, dateRight)

export const isBefore = (date: Date, dateCompare: Date): boolean => dateFnsBefore(date, dateCompare)
