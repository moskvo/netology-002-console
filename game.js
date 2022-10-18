const readline = require('node:readline')
const fs = require('node:fs')
const firstline = require('firstline')

const _header_ = 'date,coin,player'
// 1 - head, 2 - tail
const side = (s) => s=='1' ? 'head' : 'tail'

const filename = process.argv[2];

if( ! filename ) {
    console.log( 'Please, add filename to log the game.')
    return
    }

firstline(filename,{encoding:'utf8'})
    .then( 
        firstline => {
            if( firstline == _header_ ){
                return 'append'
                }
            throw new Error("Your file isn't the game log")
            },
        err => {
            return 'create'
        } )
    .catch( e => { console.error(e); console.error('Exit game'); process.exit(1); } )
    .then( mode => {
        const writeStream = fs.createWriteStream(filename, {flags:'a', encoding:'utf8'})
        if( mode == 'create' )
            writeStream.write(_header_+'\n')

        const coin = 1 + Math.round(Math.random()) // 1 or 2
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });

        rl.question('Write what side? (1 - head, 2 - tail):', (answer) => {
            // TODO: Log the answer in a database
            let date = new Date()
            
            if( coin == answer ){
                console.log(`You think that coin is ${side(answer)}, and it's true! You won!`);
                }
            else {
                console.log(`You think that coin is ${side(answer)}, but it is ${side(coin)}. Sorry, you lose.`);
            }
            writeStream.end(`${date.toISOString()},${coin},${answer}\n`)
            rl.close();
            });
    })
