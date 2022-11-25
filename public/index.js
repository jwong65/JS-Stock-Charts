async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

//https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&apikey=beeaae5d371b40ff9bae68960148ca7d
    let stockResults = await fetch("https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,IXIC&interval=1min&apikey=demo",
    {
        //header: Authorization="apikey beeaae5d371b40ff9bae68960148ca7d"
    })

    
    let results =await stockResults.json()
    console.log(results)

    let AAPL = results.AAPL
    console.log(AAPL)


    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    //This is to help change the dates to be the other way ascending
    stocks.forEach( stock => stock.values.reverse())

    function getColor(stock){
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

     new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock=>({
                label: stock.meta.symbol,
                data: stock.values.map(value=> parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
                //label: stocks.meta.symbol,
                //data: stocks.values.map(value=>parseFloat(value.high)),
                //backgroundColor:  'rgba(255, 99, 132, 0.2)',
                //borderColor: 'rgba(255, 99, 132, 1)'
            //}]
        }
    });
   
     
//    const chart1 = document.getElementById('time-chart').getContext('2d');
//     const newChart = new Chart(chart1, {
//         // type: 'line',
//         // datasets:{
//         //     labels :['Red', 'Green'],
//         //     data: [12 , 19],  
//         //     backgroundColor: 'rgb(255, 99, 132)',
//         //     borderColor: 'rgb(255, 99, 132)',

//         // }
//         data: {
//             labels: stocks[0].values.map( value => value.datetime),
//             datasets: [stocks.map( stock=>({
//                 label: stock.meta.symbol,
//                 data: stock.values.map(value => parseFloat(value.high)),
//                 backgroundColor:getColor(stock.meta.symbol),
//                 borderColor: getColor(stock.meta.symbol),
//                 borderWidth:1
//             }))
//              ]
//         }
//     });
}

main()