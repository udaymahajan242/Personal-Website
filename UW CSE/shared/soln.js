const prices = [1.3, 1.8, 2.8, 2.8, 3.2];

// Complete the roundPricesToMatchTarget function below.
function roundPricesToMatchTarget(prices, target) {
    // Keeping track of some important data of the prices for processing
    const pricesMap = prices.reduce((acc, price) => {
        acc.push({
            number: Math.floor(price),
            fraction: price - Math.floor(price),
            ceil: Math.ceil(price)
        });
        return acc;
    }, [])

    // the minimum value guaranteed.
    const sumBasePrice = pricesMap.reduce((acc, price) => acc + price.number, 0);
    
    // Error case, when then minimum value of individual prices is greater than target
    if (sumBasePrice > target) {
        throw "Incorrect individual prices given!";
    }
    
    // We only need x more to reach target after reducing every price to rounded down base price
    const valueRemaining = target - sumBasePrice;
    
    // We only need to increase valueRemaining prices by 1 or to their ceil
    const fractionMap = pricesMap.map((priceData, index) => ({
        value: priceData.fraction,
        index: index
    }));
    fractionMap.sort((price1, price2) => price2.value - price1.value);
    const pricesRoundedUp = fractionMap.slice(0, valueRemaining);
    
    // Keeping a track of the indexes of the prices we want to increase
    const indexesToIncrease = pricesRoundedUp.reduce((acc, fraction) => {
        acc.push(fraction.index);
        return acc;
    }, []);

    // finally creating an array of final rounded prices with the minimum rounding error
    const roundedPrices = pricesMap.map((priceData, index) => {
        return (indexesToIncrease.includes(index)) ? priceData.ceil : priceData.number;
    });
    return roundedPrices;
}

alert(roundPricesToMatchTarget(prices, 11));
