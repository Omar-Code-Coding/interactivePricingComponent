'use strict';

const slider = document.getElementById('slider');
const priceLabel = document.getElementById('price-label');
const pageviewsLabel = document.getElementById('pageviews-label');
const discountBtn = document.querySelector('#discount-btn');
let discount = false;
const pricesObj = {
    price: [8, 12, 16, 24, 36],
    pageview: ['10K', '50K', '100K', '500K', '1M'],
    discountValue: 25,
    discountPrice: [],
    priceDiscount: function () {
        for (const values of this.price) {
            this.discountPrice.push((values * this.discountValue) / 100);
        }
        return this.discountPrice;
    }
    // priceDiscount() {
    //     this.price.forEach(price => {
    //         this.discountPrice.push((price * this.discountValue) / 100);
    //     })
    //     return this.discountPrice;
    // }
}
init();
pricesObj.priceDiscount();
discountBtn.addEventListener('input', discountToggle);
slider.addEventListener('input', () => {
    sliderTrack();
    sliderLabel();
});

// Intializing Default text
function init() {
    priceLabel.textContent = '$16.00';
    pageviewsLabel.textContent = '100K pageviews';
}

// Discount button
function discountToggle() {
    discount = discount === false ? true : false;
    definePrice();
}


// Change the Slider's tralling progress bar's color
function sliderTrack() {
    const sliderValue = slider.value * 25;
    const color = `linear-gradient(90deg, hsl(174, 77%, 80%) ${sliderValue}%,
    hsl(224, 65%, 95%) ${sliderValue}%)`;
    return slider.style.background = color;
}

// Change Slider related labels (Price, Pageviews)
function sliderLabel() {
    definePrice()
    return pageviewsLabel.textContent = `${pricesObj.pageview[slider.value]} pageviews`;
}

// Check if Discount button was pressed
function definePrice() {
    if (discount !== true) {
        priceLabel.textContent = `$${pricesObj.price[slider.value].toFixed(2)}`;
    } else {
        priceLabel.textContent = `$${pricesObj.discountPrice[slider.value].toFixed(2)}`;
    }
}
