async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&apikey=beeaae5d371b40ff9bae68960148ca7d
    let stockResults = await fetch("https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,IXIC&interval=1min&apikey=demo",
    {
        //header: Authorization="apikey beeaae5d371b40ff9bae68960148ca7d"
    })

    let stocksResults =await stockResults.json()
    console.log(stocksResults)

    let AAPL = stocksResults.AAPL
    console.log(AAPL)


    const stocks = [AAPL]

}

main()