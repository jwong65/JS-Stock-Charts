async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    //This is to help change the dates to be the other way a
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
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'),{
        type: 'bar',
        data:{
            
        //For label instead of date time it has to be different stocks
            labels: stocks.map(stock=> stock.meta.symbol),
            //This dataset doesn't need .map because it's one data set not multiple
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock=>(
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock=>(
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    getHighestPrice(stock.values)
                ))
            }]}
        //     datasets: stocks.map( stock=>({
        //         //This label is the one below. Don't need .map because it's only
        //         label: stock.meta.symbol,
        //         //Data set has to be one array
        //         data: stocks.map(stock=>(getHighestPrice(stock.values))) ,
        //         //data: stock.values.map(value=> parseFloat(value.high)),
        //         backgroundColor: getColor(stock.meta.symbol),
        //         borderColor: getColor(stock.meta.symbol)


        // }))}

        })

    //Helper function to help find highest price
    function getHighestPrice(values){
        //Need to store price in a variable so it can be returned.
        let price = 0;
        //let highPrice =price[0]
        values.forEach(e=>{
            if (parseFloat(e.high)> price){
                price = e.high
                // highPrice = e
                // console.log(highPrice)
            }
            
        })
        return price
    }
    getHighestPrice()
}
main()