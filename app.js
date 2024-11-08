
function toggleMode() {
    const isListingMode = document.getElementById("modeListing").checked;
    
    // Toggle label and placeholder based on mode
    document.getElementById("mainLabel").innerText = isListingMode ? "Listing Price:" : "Desired Net Take-Home Amount:";
    document.getElementById("mainInput").placeholder = isListingMode ? "Enter Listing Price" : "Enter Desired Net Take-Home";

    // Trigger recalculation to update the display
    calculateBooking();
    calculateAirbnb();
}

function calculateBooking() {
    const isListingMode = document.getElementById("modeListing").checked;

    const bookingCommissionRate = parseFloat(document.getElementById("bookingCommission").value) / 100 || 0.15;
    const paymentChargeRate = 0.016;
    const environmentalFee = parseFloat(document.getElementById("environmentalFee").value) || 1.5;

    const mainInput = parseFloat(document.getElementById("mainInput").value) || 0;

    if (isListingMode) {
        // Calculate Net Price from Listing Price
        const listingPrice = mainInput;
        const commission = bookingCommissionRate * listingPrice;
        const paymentCharge = paymentChargeRate * (listingPrice + environmentalFee);

        const netPriceBooking = listingPrice - commission - paymentCharge + environmentalFee;
        document.getElementById("resultBooking").innerText = `Net Price (Booking.com): €${netPriceBooking.toFixed(2)}`;
    } else {
        // Calculate Required Listing Price from Desired Net Take-Home
        const desiredNet = mainInput;

        const listingPriceNeeded = (desiredNet + (paymentChargeRate * environmentalFee)) 
                                   / (1 - bookingCommissionRate - paymentChargeRate);
        document.getElementById("resultBooking").innerText = `Required Listing Price (Booking.com): €${listingPriceNeeded.toFixed(2)}`;
    }
}

function calculateAirbnb() {
    const isListingMode = document.getElementById("modeListing").checked;
    const airbnbCommissionRate = parseFloat(document.getElementById("airbnbCommission").value) / 100 || 0.0372;

    const mainInput = parseFloat(document.getElementById("mainInput").value) || 0;

    if (isListingMode) {
        // Calculate Net Price from Listing Price
        const listingPrice = mainInput;
        const airbnbFee = airbnbCommissionRate * listingPrice;
        const netPriceAirbnb = listingPrice - airbnbFee;

        document.getElementById("resultAirbnb").innerText = `Net Price (Airbnb): €${netPriceAirbnb.toFixed(2)}`;
    } else {
        // Calculate Required Listing Price from Desired Net Take-Home
        const desiredNet = mainInput;

        const listingPriceNeeded = desiredNet / (1 - airbnbCommissionRate);
        document.getElementById("resultAirbnb").innerText = `Required Listing Price (Airbnb): €${listingPriceNeeded.toFixed(2)}`;
    }
}
