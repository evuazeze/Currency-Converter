class View {
	constructor(container, currencies) {
    let view = this;

    view.container = container;
    
    view.fromCurrency = container.querySelector('#from-currency');
    view.toCurrency = container.querySelector('#to-currency');

    currencies
    .then(function(currencies) {
      return Object.values(currencies)
    })
    .then(function(currency) {
      currency.forEach(function(currency){
        const currencyID = currency.id;
        const currencyName = currency.currencyName;

        let opt1 = document.createElement('option');
        let opt2 = document.createElement('option');
        opt1.innerHTML = currencyName + ' (' + currencyID + ')';
        opt1.setAttribute("id", currencyID);
        opt2.innerHTML = currencyName + ' (' + currencyID + ')';
        opt2.setAttribute("id", currencyID);

        view.container.querySelector('#from-currency').appendChild(opt1);
        view.container.querySelector('#to-currency').appendChild(opt2);
      })
    })
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

  setConvertedAmount(amount) {
    this.container.querySelector('#amount-output').value = amount;
  }

}

export { View };
