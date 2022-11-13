async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&apikey=beeaae5d371b40ff9bae68960148ca7d
    let stockResults = await fetch("https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,IXIC&interval=1min&apikey=demo",
    {
        //header: Authorization="apikey beeaae5d371b40ff9bae68960148ca7d"
    })

    let Results =await stockResults.json()
    console.log(Results)

    let AAPL = stocksResults.AAPL
    console.log(AAPL)


    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];


    function getColor(stock){
        // if(stock === "AAPL"){
        //     return 'rgba(61, 161, 61, 0.7)'
        // } Was used to test the mockData.
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    
        
    }
    const chart1 = document.getElementById('time-chart').getContext('2d');
    const newChart = new Chart(chart1, {
        // type: 'line',
        // datasets:{
        //     labels :['Red', 'Green'],
        //     data: [12 , 19],  
        //     backgroundColor: 'rgb(255, 99, 132)',
        //     borderColor: 'rgb(255, 99, 132)',
        //This was used for testing the mockData but I still couldn't get it to show up - just a blank square.

        // }
        data: {
            labels: stocks[0].values.map( value => value.datetime),
            datasets: [stocks.map( stock=>({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                borderWidth:1
            }))
             ]
        }
    });
    //This is Chart 1, but the CDN link is either broken or not working as it should based on the activity instructions?

}

main()