const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('d',{
        alias: 'days',
        type:'number',
        default: 1,
        describe: 'от 1 до 14 дней для прогноза'
        })
    .check((argv,options)=>{
        if( argv.d < 1 || argv.d > 14 ) throw new Error("Аргумент 'days' не из набора {1,...,14}")
        const c = argv._
        })
    .argv

if( process.argv.length < 3){
    console.log('Type city as argument, please')
    process.exit(1)
}
const http = require('http')
const { argv } = require('process')

const city = process.argv[2]
const TOKEN = process.env.WEATHERSTACK_TOKEN

console.log(`Получаю прогноз для города ${city}...`)
http.get('http://api.weatherstack.com/forecast?access_key='+TOKEN+'&query='+city+'&forecast_days='+argv.days)

перейти на yargs

отображение прогноза, библиотека для консольной графики?