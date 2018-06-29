import { Model } from './models/Model.js';
import { View } from './views/View.js';

class IndexController {

  constructor(container) {
    let controller = this;
    controller.container = container;
    controller.form = container.querySelector('#currency-form');

    controller.model = new Model();
    controller.currencies = this.model.currencies();
    controller.view = new View(container, this.currencies);

    controller.form.addEventListener('submit', function (e) {
     e.preventDefault();
     controller.model.getConversionRate(controller.view.getCurrenciesToConvert())
     .then(function(exchangeRate) {
      controller.view.setConvertedAmount((exchangeRate * controller.view.getAmountEntered()).toFixed(2));
    });

    // .catch(e => requestError(e, 'image'));

    // function requestError(e, part) {
    //   console.log(e);
    //   responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    // }
  });

  }

  getCurrencies() {
    return this.model.currencies;
  }

}
export { IndexController };