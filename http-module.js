const argv = require('yargs/yargs')(process.argv.slice(2))
    .check((argv,options)=>{
        if( argv._.length < 1 ) return false
        return true
        })
    .argv

const city = argv._.join(' ')

const http = require('http')

const TOKEN = process.env.WEATHERSTACK_TOKEN

//console.log( TOKEN )

const url = 'http://api.weatherstack.com/current?access_key='+TOKEN+'&query="'+city

http.get(url, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
        }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parsedData = JSON.parse(rowData)
        if( parsedData.error ){
            console.error(parsedData)
            return
            }
        let {current, location} = parsedData
        //console.log(current)
        console.log(`Текущая погода для города ${location.name}, страна ${location.country}`)
        console.log('  температура: '+current.temperature)
        console.log('  влажность: '+current.humidity)
        console.log('  скорость ветра: '+current.wind_speed)
        console.log('  направление ветра: '+wind_ru_dir(current.wind_dir))
        console.log('  давление: '+current.pressure)
    })
}).on('error', (err) => {
    console.error(err)
})

function wind_ru_dir(wind_dir){
    return wind_dir.replaceAll('N','С').replaceAll('S','Ю').replaceAll('W','З').replaceAll('E','В')
    }