#!/usr/bin/env node

const yargs = require("yargs");
const argv = yargs(process.argv.slice(2))
    .command('current', 'работа с текущей датой',
        function(yargs){
            yargs.option('y',{
                alias: 'year',
                type: 'boolean',
                describe: 'текущий год'
                })
            .option('m',{
                alias: 'month',
                type: 'boolean',
                describe: 'текущий месяц'
                })
            .option('d',{
                alias: 'date',
                type: 'boolean',
                describe: 'текущий день месяца'
                })
            },
        function(argv){
            let date = new Date(), hassome = false;
            if( argv.year ){
                console.log('Current year: ' + date.getFullYear())
                hassome = true;
                }
            if( argv.month ){
                console.log('Current month: ' + (date.getMonth()+1))
                hassome = true;
                }
            if( argv.date ){
                console.log('Current day of month: ' + date.getDate())
                hassome = true;
                }

            if( !hassome ) console.log( new Date().toISOString() );
            }
        )
    .command('add', 'дата в будущем',
        function(yargs){
            yargs.option('y',{
                alias: 'year',
                type: 'number',
                describe: 'на несколько лет вперёд'
                })
            .option('m',{
                alias: 'month',
                type: 'number',
                describe: 'на несколько месяцев вперёд'
                })
            .option('d',{
                alias: 'date',
                type: 'number',
                describe: 'на несколько дней вперёд'
                })
            .check((argv)=> {
                if( argv.year < 0 || argv.month < 0 || argv.day < 0 ) throw new Error("Arguments must be positive.")
                return true
                })
            },
        function(argv){
            let date = new Date();
            if( argv.month ){
                date.setMonth( date.getMonth() + argv.month );
                }
            if( argv.year ){
                date.setFullYear( date.getFullYear() + argv.year )
                }
            if( argv.date ){
                date.setDate( date.getDate() + argv.date )
                }
            console.log( date.toISOString() )
            }
        )
    .command('sub', 'дата в прошлом',
        function(yargs){
            yargs.option('y',{
                alias: 'year',
                type: 'number',
                describe: 'на несколько лет назад'
                })
            .option('m',{
                alias: 'month',
                type: 'number',
                describe: 'на несколько месяцев назад'
                })
            .option('d',{
                alias: 'date',
                type: 'number',
                describe: 'на несколько дней назад'
                })
            },
        function(argv){
            let date = new Date();
            if( argv.month ){
                date.setMonth( date.getMonth() - argv.month );
                }
            if( argv.year ){
                date.setFullYear( date.getFullYear() - argv.year )
                }
            if( argv.date ){
                date.setDate( date.getDate() - argv.date )
                }
            console.log( date.toISOString() )
            }
        ).help().argv

