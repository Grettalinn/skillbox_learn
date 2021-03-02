export default function productCountFormat(value) {
  try {
    if ((value % 10 === 1) && (value !== 11)) {
      return (`${value} товар`);
    } if ((value % 20 < 5) && value > 0) {
      return (`${value} товара`);
    }
    return (`${value} товаров`);
  } catch {
    return '';
  }
}
