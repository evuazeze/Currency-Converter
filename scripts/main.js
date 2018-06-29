// (function () {
// import loadScripts from '../utils/loadScripts';
import { IndexController } from './IndexController.js';

// const polyfillsNeeded = [];
// if (!('Promise' in self)) polyfillsNeeded.push('/js/polyfills/promise.js');

// try {
//   new URL('b', 'http://a');
// }
// catch (e) {
//   polyfillsNeeded.push('/js/polyfills/url.js');
// }

// loadScripts(polyfillsNeeded, function() {
//   new IndexController(document.querySelector('.main'));
// });
    // this.form = document.querySelector('#currency-form');
    // this.fromCurrency = document.querySelector('#from-currency');
    // this.toCurrency = document.querySelector('#to-currency');
    // this.amountEnteredInput = document.querySelector('#amount-input');
    // this.amountOutputField = document.querySelector('#amount-output');

    //     this.toCurrency.value = "hello";
    // this.toCurrency.value = "hello";


new IndexController(document.querySelector('#main'));
// })();