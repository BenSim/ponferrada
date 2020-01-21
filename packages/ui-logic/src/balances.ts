import { Amount, Token } from "@iov/bcp";
import { Decimal } from "@iov/encoding";

/**
 * This produces a human readable format of the amount, value and token ticker
 */
export function amountToString(amount: Amount): string {
  const { quantity, fractionalDigits, tokenTicker } = amount;
  return `${Decimal.fromAtomics(quantity, fractionalDigits)
    .toFloatApproximation()
    .toLocaleString()} ${tokenTicker}`;
}

/**
 * Parses a decimal as string into the Amount format, using the token's native fractional digits
 */
export function stringToAmount(
  amount: string,
  tokenInfo: Pick<Token, "fractionalDigits" | "tokenTicker">,
): Amount {
  return {
    quantity: Decimal.fromUserInput(amount, tokenInfo.fractionalDigits).atomics,
    fractionalDigits: tokenInfo.fractionalDigits,
    tokenTicker: tokenInfo.tokenTicker,
  };
}

/**
 * Converts an amount to a JavaScript number. Please note that the resulting value is
 * an approximation only since not all amounts can accurately be expressed as floats.
 */
export function amountToNumber(amount: Amount): number {
  return Decimal.fromAtomics(amount.quantity, amount.fractionalDigits).toFloatApproximation();
}

export function amountToGwei(amount: Amount): string {
  if (amount.tokenTicker !== "ETH" || amount.fractionalDigits !== 18) {
    throw new Error("This amount cannot be expressed in Gwei");
  }

  const value = amountToNumber(amount) * 10 ** 9;
  const display = Number.isInteger(value) ? value : value.toFixed(2);
  return `${display} Gwei`;
}

export function sumAmounts(amountA: Amount, amountB: Amount): Amount {
  if (amountA.tokenTicker !== amountB.tokenTicker) throw new Error("Cannot add amounts of different tokens");
  if (amountA.fractionalDigits !== amountB.fractionalDigits)
    throw new Error("Cannot add amounts with different fractional digits");

  const decimalA = Decimal.fromAtomics(amountA.quantity, amountA.fractionalDigits);
  const decimalB = Decimal.fromAtomics(amountB.quantity, amountB.fractionalDigits);

  const result = decimalA.plus(decimalB);

  return {
    quantity: result.atomics,
    fractionalDigits: result.fractionalDigits,
    tokenTicker: amountA.tokenTicker,
  };
}
