export interface PriceCalculationParams {
  (
    startPrice: number,
    size: number,
    type: string,
    variantOneType: string,
    variantTwoType: string
  ): number;
}

export const getPrice: PriceCalculationParams = (
  startPrice,
  size,
  type,
  variantOneType,
  variantTwoType
) => {
  if (size === 3) {
  } else if (size === 6) {
    startPrice += 60;
  } else if (size === 9) {
    startPrice += 90;
  }

  if (type === variantOneType) {
    startPrice *= 1;
  } else if (type === variantTwoType) {
    startPrice *= 1.5;
  }

  return startPrice;
};
