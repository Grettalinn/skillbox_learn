export default function numberFormat(value) {
  try {
    return new Intl.NumberFormat().format(value);
  } catch {
    return value;
  }
}
