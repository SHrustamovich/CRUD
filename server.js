const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    if (req.method == "GET") {
        if (req.url.substring(1) == "markets") {
            fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
                if (err) { throw err }
                res.end(data)
            })
        }
        if (req.url.substring(1, 8) == "markets" && req.url.split('/')[2]) {
            const marketId = req.url.split('/')[2]
            // console.log(marketId);
            fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
                if (err) { throw err }
                const foundMarket = JSON.parse(data).filter(e => e.id == marketId)
                res.end(JSON.stringify(foundMarket, null, 4))
            })
        }

        if (req.url.substring(1, 11) == "marketInfo" && req.url.split('/')[2]) {
            const marketId = req.url.split('/')[2]
            // let arr = [];
            // console.log(marketId);
            fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
                if (err) { throw err }
                let market = JSON.parse(data).filter(e => e.id == marketId)

                fs.readFile(path.resolve(__dirname, "./data/marketBranches.json"), (err, data) => {
                    if (err) { throw err }
                    let branches = JSON.parse(data).filter(e => e.marketId == marketId)

                    fs.readFile(path.resolve(__dirname, "./data/marketWorkers.json"), (err, data) => {
                        if (err) { throw err }
                        let workers = JSON.parse(data).filter(e => e.marketId == marketId)

                        fs.readFile(path.resolve(__dirname, "./data/marketProducts.json"), (err, data) => {
                            if (err) { throw err }
                            let product = JSON.parse(data).filter(e => e.marketId == marketId)

                    res.end(JSON.stringify({
                        name: market[0].name,
                        branches,
                        workers,
                        product
                    }))
                })
                })
                })
            })
        }
    }
    if (req.method == "POST") {
        if (req.url.substring(1) == "newMarket") {
            req.on('data', (data) => {
                //  console.log(JSON.parse(data));
                let newMarket = JSON.parse(data)
                fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
                    const arr = JSON.parse(data)
                    newMarket.id = arr.length + 1
                    arr.push(newMarket)
                    fs.writeFile(path.resolve(__dirname, "./data/markets.json"), JSON.stringify(arr, null, 4), (err) => {
                        if (err) { throw err }
                    })
                })
            })
            res.end('ok')
        }
        if (req.url.substring(1) == "newBranch") {
            req.on('data', (data) => {
                //  console.log(JSON.parse(data));
                let newBranch = JSON.parse(data)
                fs.readFile(path.resolve(__dirname, "./data/marketBranches.json"), (err, data) => {
                    const arr = JSON.parse(data)
                    newBranch.id = arr.length + 1
                    arr.push(newBranch)
                    fs.writeFile(path.resolve(__dirname, "./data/marketBranches.json"), JSON.stringify(arr, null, 4), (err) => {
                        if (err) { throw err }
                    })
                })
            })
            res.end('ok')
        }
        if (req.url.substring(1) == "newWorker") {
            req.on('data', (data) => {
                //  console.log(JSON.parse(data));
                let newWorker = JSON.parse(data)
                fs.readFile(path.resolve(__dirname, "./data/marketWorkers.json"), (err, data) => {
                    const arr = JSON.parse(data)
                    newWorker.id = arr.length + 1
                    arr.push(newWorker)
                    fs.writeFile(path.resolve(__dirname, "./data/marketWorkers.json"), JSON.stringify(arr, null, 4), (err) => {
                        if (err) { throw err }
                    })
                })
            })
            res.end('ok')
        }
        if (req.url.substring(1) == "newProduct") {
            req.on('data', (data) => {
                //  console.log(JSON.parse(data));
                let newProduct = JSON.parse(data)
                fs.readFile(path.resolve(__dirname, "./data/marketProducts.json"), (err, data) => {
                    const arr = JSON.parse(data)
                    newProduct.id = arr.length + 1
                    arr.push(newProduct)
                    fs.writeFile(path.resolve(__dirname, "./data/marketProducts.json"), JSON.stringify(arr, null, 4), (err) => {
                        if (err) { throw err }
                    })
                })
            })
            res.end('ok')
        }
    }
})
server.listen(9000, console.log('create server!!!'))