/**
 * Indian Rupee (INR / ₹) Currency Formatting Utilities
 * Formats monetary amounts in accordance with Indian numbering conventions (lakhs & crores).
 */

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatINRExtended(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}.00`;
}
