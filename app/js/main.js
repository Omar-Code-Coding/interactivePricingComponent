'use strict';

const slider = document.getElementById('slider');
const priceLabel = document.querySelector('.price-component-slider__price-num');
const pageviewsLabel = document.querySelector('.price-component-slider__pageviews');
const pricingInterval = document.querySelector('.price-component-slider__price-label');
const discountSwitch = document.querySelector('#discount-btn');

class App {
    #discount = false;
    #discountValue = 25;
    #pricesAndPageviews = {
        '10K': 8,
        '50K': 12,
        '100K': 16,
        '500K': 24,
        '1M': 36
    };
    // #prices = [8, 12, 16, 24, 36];
    // #pageviews = ['10K', '50K', '100K', '500K', '1M'];
    // #discountPrices;

    constructor() {
        slider.addEventListener('input', this._changeTrailingTrackColor.bind(this))
        slider.addEventListener('input', this._renderPriceAndIntervalLabel.bind(this))
        discountSwitch.addEventListener('input', this._toggleDiscount.bind(this));
    }

    // Change trailing track's color based on the value of the slider
    _changeTrailingTrackColor() {
        const mult = 25;
        const color = `
            linear-gradient(90deg, hsl(174, 77%, 80%) ${slider.value * mult}%,
            hsl(224, 65%, 95%) ${slider.value * mult}%)
        `;
        return slider.style.background = color;
    }

    // Define discount if the discountSwitch is On
    _toggleDiscount() {
        this.#discount = this.#discount === false ? true : false;
        this._renderPriceAndIntervalLabel();
    }

    // Render the price and interval
    _renderPriceAndIntervalLabel() {
        const discountPrice = i => ((i * 12) * this.#discountValue) / 100;

        // Set interval's value if "#discount" is true or false
        const interval = this.#discount ? '/ year' : '/ month';

        // Change pageviews's value based on the Slider
        const pageviews = Object.keys(this.#pricesAndPageviews)[slider.value];

        // Access price in "#pricesAndPageviews" based on "pageviews" value
        const price = this.#pricesAndPageviews[`${pageviews}`];

        // Discount the price if "#discount" is true, else the price is normal
        const definePrice = this.#discount ? discountPrice(price) : price;

        pricingInterval.textContent = interval;
        priceLabel.textContent = `$${definePrice.toFixed(2)}`;
        pageviewsLabel.textContent = `${pageviews} pageviews`;

        // const price = this.#discount ? this.#discountPrices : this.#prices;
        // priceLabel.textContent = `$${price[slider.value].toFixed(2)}`;
        // pageviewsLabel.textContent = `${this.#pageviews[slider.value]} pageviews`;
    }

    // Set discountPrice's array values
    // _setDiscountPrices() {
    //     return this.#discountPrices = this.#prices.map(
    //         i => ((i * 12) * this.#discountValue) / 100
    //     );
    // }
}

const app = new App();