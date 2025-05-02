export const formatEarningWithCommas = (number: number): string => {
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
