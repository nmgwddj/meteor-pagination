import moment from 'moment'

export const dateToString = (date, format = 'YYYY-MM-DD HH:mm') => (
  moment(date).format(format)
)