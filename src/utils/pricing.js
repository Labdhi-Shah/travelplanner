/**
 * Pricing and currency calculation utilities for Travel Planner (INR)
 */

// Exchange rate helper for converting existing USD mock values to realistic INR amounts
export const USD_TO_INR_RATE = 85;

/**
 * Format a number into standard Indian Rupee currency format (e.g. ₹45,000)
 * @param {number} amount
 * @returns {string}
 */
export const formatINR = (amount) => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.round(amount));
};

/**
 * Calculate itemized price breakdown in INR
 * @param {Object} params
 * @param {number} [params.baseAmountUSD=0] - Base amount in USD if applicable
 * @param {number} [params.baseAmountINR=0] - Direct base amount in INR
 * @param {number} [params.travelers=1] - Number of travelers/guests
 * @param {number} [params.taxRate=0.12] - Tax/GST percentage (e.g. 12%)
 * @param {number} [params.platformFee=499] - Fixed platform/convenience fee in INR
 * @returns {Object} itemized breakdown
 */
export const calculatePriceBreakdown = ({
  baseAmountUSD = 0,
  baseAmountINR = 0,
  travelers = 1,
  taxRate = 0.12,
  platformFee = 499
}) => {
  const pax = Math.max(1, Number(travelers) || 1);
  
  // Calculate base in INR
  let rawBaseINR = baseAmountINR > 0 ? baseAmountINR : (baseAmountUSD * USD_TO_INR_RATE);
  
  // Ensure realistic round number
  const baseSubtotal = Math.round(rawBaseINR);
  const taxesAndFees = Math.round(baseSubtotal * taxRate);
  const convenienceFee = Math.round(platformFee);
  const totalAmountINR = baseSubtotal + taxesAndFees + convenienceFee;

  return {
    travelers: pax,
    baseAmount: baseSubtotal,
    taxesAndFees,
    platformFee: convenienceFee,
    totalAmountINR,
    totalAmountPaise: Math.round(totalAmountINR * 100),
    formattedBase: formatINR(baseSubtotal),
    formattedTaxes: formatINR(taxesAndFees),
    formattedFee: formatINR(convenienceFee),
    formattedTotal: formatINR(totalAmountINR)
  };
};

/**
 * Generate a unique booking reference ID
 * @param {string} prefix - e.g. 'FL' (Flight), 'HT' (Hotel), 'TR' (Tour/Trip)
 * @returns {string} e.g. 'TS-FL-8492'
 */
export const generateBookingReference = (prefix = 'BK') => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `TS-${prefix.toUpperCase()}-${randomNum}`;
};
