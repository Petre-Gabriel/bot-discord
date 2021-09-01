import dayjs from 'dayjs';

export default function FormatDateToString(date: any) {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}
