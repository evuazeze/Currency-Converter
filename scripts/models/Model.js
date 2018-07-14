export default class Model {
	constructor() {
	}

	get(url) {
		return fetch(url);
	}

	getJSON(url) {
		return this.get(url).then(function(response) {
			return response.json();
		});
	}

	currencies() {
		return this.getJSON('https://free.currencyconverterapi.com/api/v5/currencies')
		.then(function(data) {
			return data.results;
		})
	}

	getConversionRate(currenciesToConvertStr) {
		return this.getJSON(`https://free.currencyconverterapi.com/api/v5/convert?q=${currenciesToConvertStr}&compact=ultra`)
		.then(exchangeRateObject => Object.values(exchangeRateObject)[0])
		.then(function(conversionRate) {
			return conversionRate;
		});
	}
}