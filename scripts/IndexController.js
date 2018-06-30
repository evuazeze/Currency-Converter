import { Model } from './models/Model.js';
import { View } from './views/View.js';

class IndexController {

  constructor(container) {
    let controller = this;

    controller.registerServiceWorker();
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

  registerServiceWorker() {
    if (!navigator.serviceWorker) return;

    var indexController = this;

    navigator.serviceWorker.register('../sw.js').then(function(reg) {
      if (!navigator.serviceWorker.controller) {
        return;
      }

      if (reg.waiting) {
        indexController.updateReady(reg.waiting);
        return;
      }

      if (reg.installing) {
        indexController.trackInstalling(reg.installing);
        return;
      }

      reg.addEventListener('updatefound', function() {
        indexController.trackInstalling(reg.installing);
      });
    });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

trackInstalling(worker) {
  var indexController = this;
  worker.addEventListener('statechange', function() {
    if (worker.state == 'installed') {
      indexController.updateReady(worker);
    }
  });
}

updateReady(worker) {
  // var toast = this._toastsView.show("New version available", {
  //   buttons: ['refresh', 'dismiss']
  // });

  // toast.answer.then(function(answer) {
  //   if (answer != 'refresh') return;
  //   worker.postMessage({action: 'skipWaiting'});
  // });
  // notify user with toast
  console.log("notified!");
}

getCurrencies() {
  return this.model.currencies;
}

}
export { IndexController };