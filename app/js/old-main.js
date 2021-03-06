'use strict';

const slider = document.getElementById('slider');
const priceLabel = document.getElementById('price-label');
const pageviewsLabel = document.getElementById('pageviews-label');
const pricingInterval = document.getElementById('pricing-interval');
const discountBtn = document.querySelector('#discount-btn');
let discount = false;
const pricesObj = {
    price: [8, 12, 16, 24, 36],
    pageview: ['10K', '50K', '100K', '500K', '1M'],
    discountValue: 25,
    discountPrice: [],
    priceDiscount: function () {
        for (const values of this.price) {
            this.discountPrice.push(((values * 12) * this.discountValue) / 100);
        }
        return this.discountPrice;
    }
};
pricesObj.priceDiscount();

/********************************* Event handlers ******************************/
// Discount button
discountBtn.addEventListener('input', discountToggle);

// Slider Handler
slider.addEventListener('input', () => {
    sliderTrack();
    sliderLabel(priceLabel, pricingInterval, pageviewsLabel);
});
init();

// Intializing Default text
function init() {
    priceLabel.textContent = '$16.00';
    pageviewsLabel.textContent = '100K pageviews';
    pricingInterval.textContent = '/ month';
};

// Discount button
function discountToggle() {
    discount = discount === false ? true : false;
    pricingInterval.textContent = '/ year';
    definePriceAndInterval(priceLabel, pricingInterval);
};


// Change the Slider's tralling progress bar's color
function sliderTrack() {
    const sliderValue = slider.value * 25;
    const color = `linear-gradient(90deg, hsl(174, 77%, 80%) ${sliderValue}%,
    hsl(224, 65%, 95%) ${sliderValue}%)`;
    return slider.style.background = color;
};

// Change Slider related labels (Price, Pageviews)
function sliderLabel(el1, el2, el3) {
    definePriceAndInterval(el1, el2);
    el3.textContent = `${pricesObj.pageview[slider.value]} pageviews`;
};

// Check if Discount button was pressed
function definePriceAndInterval(el1, el2) {
    if (discount !== true) {
        el1.textContent = `$${pricesObj.price[slider.value].toFixed(2)}`;
        el2.textContent = '/ month';
    } else {
        el1.textContent = `$${pricesObj.discountPrice[slider.value].toFixed(2)}`;
        el2.textContent = '/ year';
    }
};
