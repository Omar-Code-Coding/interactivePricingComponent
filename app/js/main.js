"use strict";
class App {
  #discount = false;
  #discountValue = 25;
  #pageviews = ["10K", "50K", "100k", "500K", "1M"];
  #prices = [8, 12, 16, 24, 36];
  #plans = new Map();

  constructor() {
    // Elements
    this.slider = document.querySelector("#slider");
    this.priceLabel = document.querySelector(
      ".price-component-slider__price-num"
    );
    this.pageviewsLabel = document.querySelector(
      ".price-component-slider__pageviews"
    );
    this.pricingInterval = document.querySelector(
      ".price-component-slider__price-label"
    );
    this.discountToggle = document.querySelector("#discount-btn");

    // Events
    this.slider.addEventListener(
      "input",
      this._changeTrailingTrackColor.bind(this)
    );
    this.slider.addEventListener("input", this._renderLabels.bind(this));
    this.discountToggle.addEventListener(
      "input",
      this._toggleDiscount.bind(this)
    );

    this._setPlans(this.#pageviews, this.#prices);
  }

  // Take 2 arrays or an Object as an argument
  _setPlans(pageviews, prices, plansObj) {
    if (plansObj) {
      const plans = Object.entries(plansObj);
      plans.forEach(([key, value]) => this.#plans.set(key, value));
    }

    if (pageviews && prices) {
      for (let i = 0; i < pageviews.length; i++) {
        this.#plans.set(pageviews[i], prices[i]);
      }
    }
  }

  // Change trailing track's color based on the value of the slider
  _changeTrailingTrackColor() {
    const mult = 25;
    const color = `
            linear-gradient(90deg, hsl(174, 77%, 80%) ${
              this.slider.value * mult
            }%,
            hsl(224, 65%, 95%) ${this.slider.value * mult}%)
        `;
    return (this.slider.style.background = color);
  }

  // Define discount if discount toggle is On
  _toggleDiscount() {
    this.#discount = this.#discount === false ? true : false;
    this._renderLabels();
  }

  // Render plan and interval
  _renderLabels() {
    this._renderInterval();
    this._renderPlan();
  }

  _renderPlan() {
    const discountPrice = (i) => (i * 12 * this.#discountValue) / 100;

    // Change pageviews's value based on the Slider
    const pageviews = [...this.#plans.keys()][this.slider.value];
    this.pageviewsLabel.textContent = `${pageviews} pageviews`;

    // Access price in "#plans" based on "pageviews" value
    const price = this.#plans.get(pageviews);

    // Discount the price if "#discount" is true, else the price is normal
    const definePrice = this.#discount ? discountPrice(price) : price;
    this.priceLabel.textContent = `$${definePrice.toFixed(2)}`;
  }

  _renderInterval() {
    // Set interval's value if "#discount" is true or false
    const interval = this.#discount ? "/ year" : "/ month";
    this.pricingInterval.textContent = interval;
  }
}

const app = new App();
