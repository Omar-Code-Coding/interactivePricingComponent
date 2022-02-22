'use strict';

const slider = document.getElementById('slider');
const priceLabel = document.querySelector('.price-component-slider__price-num');
const pageviewsLabel = document.querySelector('.price-component-slider__pageviews');
const pricingInterval = document.querySelector('.price-component-slider__price-label');
const discountSwitch = document.querySelector('#discount-btn');
const plans = {
    '10K': 8,
    '50K': 12,
    '100K': 16,
    '500K': 24,
    '1M': 36
};

class App {
    #discount = false;
    #discountValue = 25;
    #plans = new Map();

    constructor() {
        // Elements

        // Events
        slider.addEventListener('input', this._changeTrailingTrackColor.bind(this))
        slider.addEventListener('input', this._renderLabels.bind(this))
        discountSwitch.addEventListener('input', this._toggleDiscount.bind(this));
    }

    _setPlans(plansObj) {
        const plans = Object.entries(plansObj);
        plans.forEach(([key, value]) => this.#plans.set(key, value));
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

    // Define discount if discount toggle is On
    _toggleDiscount() {
        this.#discount = this.#discount === false ? true : false;
        this._renderLabels();
    }

    // Render plan and interval
    _renderLabels() {
        this._renderInterval();
        this._renderPlan()
    }

    _renderPlan() {
        const discountPrice = i => ((i * 12) * this.#discountValue) / 100;

        // Change pageviews's value based on the Slider
        const pageviews = [...this.#plans.keys()][slider.value];
        pageviewsLabel.textContent = `${pageviews} pageviews`;

        // Access price in "#plans" based on "pageviews" value
        const price = this.#plans.get(pageviews);

        // Discount the price if "#discount" is true, else the price is normal
        const definePrice = this.#discount ? discountPrice(price) : price;
        priceLabel.textContent = `$${definePrice.toFixed(2)}`;
    }

    _renderInterval() {
        // Set interval's value if "#discount" is true or false
        const interval = this.#discount ? '/ year' : '/ month';
        pricingInterval.textContent = interval;
    }
}

const app = new App();
app._setPlans(plans)