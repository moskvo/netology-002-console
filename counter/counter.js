const express = require('express')
const redis = require('redis')

const PORT = process.env.PORT || 3000
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({ url : REDIS_URL });
(async ()=>{
    await client.connect();
})()

const app = express()
app.use(express.json())

app.post('/counter/:bookId/incr', async (req,res) => {
    res.status(201)
    res.json({cnt: await client.incr(req.params.bookId) })
})

app.get('/counter/:bookId',async (req,res) => {
    let cnt;
    try {
        cnt = await client.get(req.params.bookId)        
    } catch (error) {
        cnt = 0;
    }

    res.status(201)
    res.json({ cnt })
})

app.listen(PORT, ()=>console.log('Listen'))