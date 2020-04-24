/**
 * 날짜 포맷 (YYYY-MM-DD HH:MM:SS 반환)
 */
export default function formatDate(date: Date) {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const min = date.getMinutes();
  const ss = date.getSeconds();
  return [date.getFullYear(), '-',
    (mm > 9 ? '' : '0') + mm, '-',
    (dd > 9 ? '' : '0') + dd, ' ',
    (hh > 9 ? '' : '0') + hh, ':',
    (min > 9 ? '' : '0') + min, ':',
    (ss > 9 ? '' : '0') + ss].join('');
}