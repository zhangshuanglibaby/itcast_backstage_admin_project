import moment from 'moment'

export const timeFormat = (time) => {
  return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
}
