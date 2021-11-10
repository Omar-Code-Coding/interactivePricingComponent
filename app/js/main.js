'use strict';

const slider = document.getElementById('slider');
const priceLabel = document.querySelector('.price-component-slider__price-num');
const pageviewsLabel = document.querySelector('.price-component-slider__pageviews');
const pricingInterval = document.querySelector('.price-component-slider__price-label');
const discountSwitch = document.querySelector('#discount-btn');

class App {
    #discount = false;
    #discountValue = 25;
    #prices = [8, 12, 16, 24, 36];
    #pageviews = ['10K', '50K', '100K', '500K', '1M'];
    #discountPrices;

    constructor() {
        slider.addEventListener('input', this._changeTrackColor.bind(this))
        slider.addEventListener('input', this._renderPriceAndIntervalLabel.bind(this))
        discountSwitch.addEventListener('input', this._toggleDiscount.bind(this));
        this._setDiscountPrices()
    }

    // Change track's trailing color based on the value of the slider
    _changeTrackColor() {
        const mult = 25;
        const color = `
            linear-gradient(90deg, hsl(174, 77%, 80%) ${slider.value * mult}%,
            hsl(224, 65%, 95%) ${slider.value * mult}%)
        `;
        return slider.style.background = color;
    }

    // Define discount if the discountSwitch is clicked
    _toggleDiscount() {
        this.#discount = this.#discount === false ? true : false;
        this._renderPriceAndIntervalLabel();
    }

    // Render the price and interval
    _renderPriceAndIntervalLabel() {
        const interval = this.#discount ? '/ year' : '/ month';
        const price = this.#discount ? this.#discountPrices : this.#prices;

        priceLabel.textContent = `$${price[slider.value].toFixed(2)}`;
        pricingInterval.textContent = interval;
        pageviewsLabel.textContent = `${this.#pageviews[slider.value]} pageviews`;
    }

    // Set discountPrice's array values
    _setDiscountPrices() {
        return this.#discountPrices = this.#prices.map(
            i => ((i * 12) * this.#discountValue) / 100
        );
    }
}

const app = new App();