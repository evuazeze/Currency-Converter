import Model from './models/Model.js';
import View from './views/View.js';
import CurrencyIDB from './idb/CurrencyIDB.js';

export default class Controller {

  constructor(container) {
    let controller = this;

    controller.registerServiceWorker();
    controller.container = container;
    controller.form = container.querySelector('#currency-form');

    controller.model = new Model();
    controller.currencies = controller.model.currencies();
    controller.currencyIDB = new CurrencyIDB();

    // controller.currencyIDB.saveCurrencies(controller.currencies);
    controller.view = new View(container, controller.currencies);
    
    controller.form.addEventListener('submit', function (e) {
     e.preventDefault();

     controller.currencyIDB.saveConversionRate(controller.view.getCurrenciesToConvert(), controller.model.getConversionRate(controller.view.getCurrenciesToConvert()));
     controller.currencyIDB.getCachedConversionRate(controller.view.getCurrenciesToConvert())
     .then(function(rate) {
      return rate;
    })
     .then(function(rate) {
      if (rate > 0) {
       controller.view.setConvertedAmount(controller.view.getAmountEntered(), controller.currencyIDB.getCachedConversionRate(controller.view.getCurrenciesToConvert()));

     } else {
       controller.view.setConvertedAmount(controller.view.getAmountEntered(), controller.model.getConversionRate(controller.view.getCurrenciesToConvert()));

     }
   })
   })
  }

  registerServiceWorker() {
    if (!navigator.serviceWorker) return;

    let indexController = this;

    navigator.serviceWorker.register('./sw.js').then(function(reg) {
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

  if (!confirm("Update Exchange Rates!")) return;

  worker.postMessage({action: 'skipWaiting'});

  }

}