export function formatPrice(
  value: number | string | undefined,
  currency: boolean | string = true,
  ignore = false,
  decimalPlaces = 2
): string {
  let num = typeof value === "string" ? parseFloat(value) : value;
  // Determine currency prefix
  let prefix = "";
  if (typeof currency === "string") {
    prefix = currency;
  } else if (currency === true) {
    prefix = "₦";
  }

  const defaultChar = ignore ? value : " --";

  if(num === 0) return `${prefix}0`;
  if (!num || isNaN(num)) return `${prefix}${defaultChar}`;

  // Format number with commas and two decimals
  const formatted = num.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return `${prefix}${formatted}`;
}


 export  function obscurePhone(phone: string) {
    return (
      phone.slice(0, 2) +
      " " +
      "****" +
      " " +
      phone.slice(phone.length - 3)
    );
  }

  export function normalizePhone(phone?:string, char:"0" | "+234" = "0"){
    return `${char}${phone}`
  }