export default class View {
	constructor(container, currencies) {
    let view = this;
    let isLoading = true;

    view.container = container;
    
    view.fromCurrency = container.querySelector('#from-currency');
    view.toCurrency = container.querySelector('#to-currency');

    let currenciesArray = [];

    currencies
    .then(function(currencies) {
      return currencies;
    })
    .then(function(currencies) {
      const fragment1 = document.createDocumentFragment();
      const fragment2 = document.createDocumentFragment();

      for (let key in currencies) {
        const currencyID = currencies[key].id;
        const currencyName = currencies[key].currencyName;
        let currency = {name: `${currencyName}`, id: `${currencyID}`}
        currenciesArray.push(currency);
      }

      currenciesArray.sort(view.compare);

      currenciesArray.forEach(function(currency) {
        const currencyID = currency.id;
        const currencyName = currency.name;

        let opt1 = document.createElement('option');
        let opt2 = document.createElement('option');
        opt1.innerHTML = `${currencyName} (${currencyID})`;
        opt1.setAttribute("id", currencyID);
        opt2.innerHTML = `${currencyName} (${currencyID})`;
        opt2.setAttribute("id", currencyID);
        fragment1.appendChild(opt1);
        fragment2.appendChild(opt2);
      })    

      view.container.querySelector('#from-currency').appendChild(fragment1);
      view.container.querySelector('#to-currency').appendChild(fragment2);

    })

    if (isLoading) {
      view.container.querySelector('.loader').setAttribute('hidden', true);
      view.container.querySelector('.card-header').parentElement.classList.remove('invisible');
      isLoading = false;
    }

  }

  compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  getCurrenciesToConvert() {
    let fromCurrencyStr = '';
    let toCurrencyStr = '';

    if (this.fromCurrency.selectedIndex !== -1 && this.toCurrency.selectedIndex !== -1) {
      fromCurrencyStr = this.fromCurrency.options[this.fromCurrency.selectedIndex].id;
      toCurrencyStr = this.toCurrency.options[this.toCurrency.selectedIndex].id;
    }

    return fromCurrencyStr + '_' + toCurrencyStr;
  }

  getAmountEntered() {
    return this.container.querySelector('#amount-input').value;
  }

  setConvertedAmount(amount, conversionRate) {
    let view = this;

    conversionRate
    .then(function(conversionRate) {
      return conversionRate;
    })
    .then(function(conversionRate) {
      view.container.querySelector('#amount-output').value = (amount * conversionRate).toFixed(2);
    })
  }

}