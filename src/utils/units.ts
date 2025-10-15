export const ML_PER_OUNCE = 29.5735;

export function mlToOz(ml: number): number {
  return ml / ML_PER_OUNCE;
}

export function ozToMl(oz: number): number {
  return oz * ML_PER_OUNCE;
}

export function formatOzFromMl(ml: number, decimals = 0): string {
  const oz = mlToOz(ml);
  return `${oz.toFixed(decimals)} oz`;
}



