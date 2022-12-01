import dayjs from 'dayjs'

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function convertDate(date) {
  const dateFormat = 'MMMM D, YYYY'
  return `${dayjs(date).format(dateFormat)}`
}
