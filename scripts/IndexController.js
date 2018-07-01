import { Model } from './models/Model.js';
import { View } from './views/View.js';
// import { CurrencyIDB } from './idb/CurrencyIDB.js'; 
import { CurrencyIDB } from './idb/CurrencyIDB.js'; 

class IndexController {

  constructor(container) {
    let controller = this;

    controller.registerServiceWorker();
    controller.container = container;
    controller.form = container.querySelector('#currency-form');

    controller.model = new Model();
    controller.currencies = this.model.currencies();
    controller.currencyIDB = new CurrencyIDB();

    controller.currencyIDB.saveCurrencies(controller.currencies);
    controller.view = new View(container, controller.currencyIDB.getCachedCurrencies());
    
    controller.form.addEventListener('submit', function (e) {
     e.preventDefault();

     controller.currencyIDB.saveConversionRate(controller.view.getCurrenciesToConvert(), controller.model.getConversionRate(controller.view.getCurrenciesToConvert()))
     controller.view.setConvertedAmount(controller.view.getAmountEntered(), controller.currencyIDB.getCachedConversionRate(controller.view.getCurrenciesToConvert()));

// if (typeof controller.currencyIDB.getCachedConversionRate(controller.view.getCurrenciesToConvert()) == 'undefined') {
//   console.log("not there");
// }
// controller.currencyIDB.getCachedConversionRate(controller.view.getCurrenciesToConvert())
// .then(function(rate) {
//   // console.log(rate);
//   // return rate;
//   console.log(rate);
//   controller.view.setConvertedAmount(controller.view.getAmountEntered(), rate);
//   return rate;
// })
// .catch(function(rate) {
//   let rate = controller.model.getConversionRate(controller.view.getCurrenciesToConvert());
//   console.log(rate);
//   controller.currencyIDB.saveConversionRate(controller.view.getCurrenciesToConvert(), rate);
//   controller.view.setConvertedAmount(controller.view.getAmountEntered(), rate);
// })
// .then(function(rate) {
//  controller.view.setConvertedAmount(controller.view.getAmountEntered(), rate);
})

// .then(function(rate) {
//   controller.view.setConvertedAmount(controller.view.getAmountEntered(), rate);
// });
    // .catch(e => requestError(e, 'image'));

    // function requestError(e, part) {
    //   console.log(e);
    //   responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    // }
  // });
  }

  registerServiceWorker() {
    if (!navigator.serviceWorker) return;

    let indexController = this;

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

  if (!confirm("Update Exchange Rates!")) return;

  worker.postMessage({action: 'skipWaiting'});

    // document.getElementById("demo").innerHTML = txt;

  }

  getCurrencies() {
    return this.model.currencies;
  }

}
export { IndexController };