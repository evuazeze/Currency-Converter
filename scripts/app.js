(function () {
  const form = document.querySelector('#currency-form');
  const fromCurrency = document.querySelector('#from-currency');
  const toCurrency = document.querySelector('#to-currency');
  const amountEnteredInput = document.querySelector('#amount-input');
  const amountOutputField = document.querySelector('#amount-output');

  fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then(response => response.json())
  .then(populateSelect);

  function populateSelect(data) {
    let currencies = data.results;
    for (const key in currencies) {
      currencyID = currencies[key].id;
      currencyName = currencies[key].currencyName;

      let opt1 = document.createElement('option');
      let opt2 = document.createElement('option');
      opt1.innerHTML = currencyName + ' (' + currencyID + ')';
      opt1.setAttribute("id", currencyID);
      opt2.innerHTML = currencyName + ' (' + currencyID + ')';
      opt2.setAttribute("id", currencyID);
      fromCurrency.appendChild(opt1);
      toCurrency.appendChild(opt2);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let fromCurrencyStr = '';
    let toCurrencyStr = '';

    if (fromCurrency.selectedIndex !== -1 && toCurrency.selectedIndex !== -1) {
      fromCurrencyStr = fromCurrency.options[fromCurrency.selectedIndex].id;
      toCurrencyStr = toCurrency.options[toCurrency.selectedIndex].id;
    }

    let query = fromCurrencyStr + '_' + toCurrencyStr;

    const url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
    + query + '&compact=ultra';

    fetch(url).then(response => response.json())
    .then(convertCurrency);
    // .catch(e => requestError(e, 'image'));

    function convertCurrency(exchangeRateObject) {
      const exchangeRate = Object.values(exchangeRateObject)[0];
      const amountEntered = amountEnteredInput.value;
      const convertedAmount = exchangeRate * amountEntered;
      amountOutputField.value = convertedAmount.toFixed(2);
    }

    // function requestError(e, part) {
    //   console.log(e);
    //   responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    // }
  });


})();
