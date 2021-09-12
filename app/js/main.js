'use strict';

const slider = document.getElementById('slider');
const priceLabel = document.getElementById('price-label');
const pageviewsLabel = document.getElementById('pageviews-label');
const discountBtn = document.querySelector('#discount-btn');
const discountValue = 25;
const prices = [8, 12, 16, 24, 36];
let discount = false;

// it loops through an array of prices and calculate the discounted prices
const discountPrices = prices.map(arr => (arr * discountValue) / 100);
const pageviews = ['10K', '50K', '100K', '500K', '1M'];

init();

discountBtn.addEventListener('input', discountToggle);
slider.addEventListener('input', () => {
    sliderPrice();
    sliderTrack();
    sliderLabel();
});

// Intializing Default text
function init() {
    priceLabel.textContent = '$16.00';
    pageviewsLabel.textContent = '100K pageviews';
}

function price() {
    if (discount !== true) {
        priceLabel.textContent = `$${prices[slider.value].toFixed(2)}`;
    } else {
        priceLabel.textContent = `$${discountPrices[slider.value].toFixed(2)}`;
    }
}


// Changes the Slider's tralling progres bar's color
function sliderTrack() {
    const sliderValue = slider.value * 25;
    const color = `linear-gradient(90deg, hsl(174, 77%, 80%) ${sliderValue}%,
                   hsl(224, 65%, 95%) ${sliderValue}%)`;
    return slider.style.background = color;
}

function sliderLabel() {
    pageviewsLabel.textContent = `${pageviews[slider.value]} pageviews`;
}

// Discount button
function discountToggle() {
    discount = discount === false ? true : false;
    price();
}

function sliderPrice() {
    price();
}
