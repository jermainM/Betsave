export const formatEarning = (number: number): string => {
  const numberString = number.toString();
  const [wholePart, decimalPart] = numberString.split(/(?=\d{5}$)/); // Split at the last 5 digits
  return `${wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}${decimalPart ? ',' + decimalPart : ''}`;
};