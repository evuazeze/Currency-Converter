(function () {
  const form = document.querySelector('#currency-form');
  const fromCurrency = document.querySelector('#from-currency');
  const toCurrency = document.querySelector('#to-currency');

  fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then(response => response.json())
  .then(populateSelect);

  function populateSelect(data) {
    let currencies = data.results;
    for (const key in currencies) {
      currencyID = currencies[key].id;

      let opt1 = document.createElement('option');
      let opt2 = document.createElement('option');
      opt1.innerHTML = currencyID;
      opt2.innerHTML = currencyID;
      fromCurrency.appendChild(opt1);
      toCurrency.appendChild(opt2);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // responseContainer.innerHTML = '';
    // searchedForText = searchField.value;
    let fromCurrencyStr;
    let toCurrencyStr;

    if (fromCurrency.selectedIndex !== -1 && toCurrency.selectedIndex !== -1) {
      fromCurrencyStr = fromCurrency.options[fromCurrency.selectedIndex].text;
      toCurrencyStr = toCurrency.options[toCurrency.selectedIndex].text;
    }

    let query = fromCurrencyStr + '_' + toCurrencyStr;

    const url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
    + query + '&compact=ultra';

    fetch(url).then(response => response.json())
    .then(function(ans){
        const exchangeRate = Object.values(ans)[0];
    });
    // .catch(e => requestError(e, 'image'));

    // function addImage(data) {
    //   let htmlContent = '';
    //   const firstImage = data.results[0];

    //   if (firstImage) {
    //     htmlContent = `<figure>
    //     <img src="${firstImage.urls.small}" alt="${searchedForText}">
    //     <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
    //     </figure>`;
    //   } else {
    //     htmlContent = 'Unfortunately, no image was returned for your search.'
    //   }

    //   responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    // }

    // function requestError(e, part) {
    //   console.log(e);
    //   responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    // }
  });


})();
