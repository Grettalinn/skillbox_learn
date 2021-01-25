export default function productCountFormat(value) {
  try {
    if (value === 1) {
      return (`${value} товар`);
    } if (value < 5 && value > 0) {
      return (`${value} товара`);
    }
    return (`${value} товаров`);
  } catch {
    return '';
  }
}
