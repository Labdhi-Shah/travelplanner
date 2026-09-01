/**
 * Razorpay Test Mode Frontend Integration Utility
 * Key ID: rzp_test_TWgEOwTngHMLZ6
 * NOTE: Frontend-only integration. Secret key is NEVER stored or exposed.
 */

export const RAZORPAY_TEST_KEY_ID = 'rzp_test_TWgEOwTngHMLZ6';

/**
 * Dynamically loads the Razorpay checkout script if not already present
 * @returns {Promise<boolean>}
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script tag is already being appended
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Open Razorpay Checkout modal
 * @param {Object} params
 * @param {Object} params.booking - Booking details (title, type, destination, dates, id, reference)
 * @param {number} params.amountINR - Total booking amount in INR
 * @param {Object} [params.traveler] - Traveler/User details (name, email, phone)
 * @param {Function} params.onSuccess - Callback on payment success ({ razorpay_payment_id, ... })
 * @param {Function} [params.onFailure] - Callback on payment failure ({ code, description, source, step, reason })
 * @param {Function} [params.onDismiss] - Callback on modal close/dismissal
 */
export const openRazorpayCheckout = async ({
  booking,
  amountINR,
  traveler = {},
  onSuccess,
  onFailure,
  onDismiss
}) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    const error = new Error('Razorpay SDK failed to load. Please check your internet connection and try again.');
    if (onFailure) onFailure({ description: error.message });
    return null;
  }

  // Amount in paise (1 INR = 100 paise)
  const amountInPaise = Math.round(Number(amountINR) * 100);

  const options = {
    key: RAZORPAY_TEST_KEY_ID,
    amount: amountInPaise,
    currency: 'INR',
    name: 'Travel Planner',
    description: `${booking.category || booking.type || 'Travel'} Booking • ${booking.destination || booking.location || 'Trip'}`,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200&q=80',
    handler: function (response) {
      if (onSuccess) {
        onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id || `order_mock_${Date.now()}`,
          razorpay_signature: response.razorpay_signature || `sig_mock_${Date.now()}`,
          paymentDate: new Date().toISOString(),
          amountPaidINR: Number(amountINR),
          status: 'Confirmed'
        });
      }
    },
    prefill: {
      name: traveler.name || 'Traveler',
      email: traveler.email || 'traveler@example.com',
      contact: traveler.phone || '9876543210'
    },
    notes: {
      booking_id: booking.id || booking.reference || '',
      booking_type: booking.category || booking.type || 'General',
      destination: booking.destination || booking.location || '',
      travel_date: booking.date || booking.startDate || '',
      passengers: booking.travelersCount || booking.guestsCount || 1
    },
    theme: {
      color: '#0a3d40', // Brand primary dark teal
      backdrop_color: 'rgba(7, 45, 48, 0.7)'
    },
    modal: {
      backdropclose: false,
      escape: true,
      handleback: true,
      confirm_close: true,
      ondismiss: function () {
        if (onDismiss) {
          onDismiss({
            message: 'Payment cancelled by user. You can retry anytime.'
          });
        }
      }
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      if (onFailure) {
        onFailure({
          code: response.error?.code || 'PAYMENT_FAILED',
          description: response.error?.description || 'Transaction was declined or failed.',
          source: response.error?.source || 'gateway',
          step: response.error?.step || 'payment_authorization',
          reason: response.error?.reason || 'declined',
          metadata: response.error?.metadata || {}
        });
      }
    });

    rzp.open();
    return rzp;
  } catch (err) {
    if (onFailure) {
      onFailure({ description: err.message || 'Error opening Razorpay payment window.' });
    }
    return null;
  }
};
