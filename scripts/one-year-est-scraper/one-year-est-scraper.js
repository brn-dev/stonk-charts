const services = [
    {
        name: 'tipranks',
        host: 'https://www.tipranks.com',
        path: '/stocks/{symbol}/forecast',
        query: doc => +doc.querySelector('span.colorgray-1.ml3.mobile_fontSize7.laptop_ml0').textContent.replace('$', ''),
    },
    {
        name: 'yahoo',
        host: 'https://finance.yahoo.com',
        path: '/quote/{symbol}/',
        query: doc => +doc.querySelector('*[data-test="ONE_YEAR_TARGET_PRICE-value"]').firstChild.textContent,
    },
    {
        name: 'marketbeat',
        host: 'https://www.marketbeat.com',
        path: '/stocks/NYSE/{symbol}/',
        query: doc => +[...doc.getElementsByTagName("p")].filter(t => t.textContent.includes("According to analysts\' consensus price target of"))[0].textContent.split('$')[1].split(',')[0],
    },
    // {
    //     name: 'wallstreetzen',
    //     host: 'https://www.wallstreetzen.com',
    //     path: '/stocks/us/nyse/{symbol}/stock-forecast',
    //     query: doc => +doc.querySelectorAll('div.jss141')[1].textContent.split('+')[0].replace('$', ''),
    // },
    // {
    //     name: 'wallstreetzen',
    //     host: 'https://www.wallstreetzen.com',
    //     path: '/stocks/us/nasdaq/{symbol}/stock-forecast',
    //     query: doc => +doc.querySelectorAll('div.jss141')[1].textContent.split('+')[0].replace('$', ''),
    // }
];

const symbols = [
    'BABA',
    'MU',
    'AMD',
    'TSM',
    'AVGO',
    'QCOM',
    'PLUG',
    'RUN',
    'FOLD',
    'BIDU',
    'COIN',
    'NIO',
    'U',
    'NVAX',
    'PDD',
    'PINS',
    'REGN',
    'ATVI',
    'AMZN',
    'AMAT',
    'PYPL',
    'DIS',
    'BLK',
    'NFLX',
    'AAPL',
    'SQ',
    'TWTR',
    'V',
    'SONY',
    'NVDA',
    'KO',
    'MSFT',
    'ADBE',
    'MA',
    'INTC',
    'DBX',
    'MDT',
    'SYK',
    'DELL',
    'HAE',
    'EBS',
    'DISCA',
    'NIU',
    'NKLA',
    'JMIA',
    'ZM',
    'GOTU',
    'GDOT',
    'OTLY',
    'CRSR',
    'ESTC',
    'TLRY',
]

const request = require('request');
const jsdom = require('jsdom');

const expectedRequestCount = symbols.length * services.length;
let requestsFinished = 0;

const results = [];

for (const symbol of symbols) {
    const symbolResult = {
        symbol,
        estimations: {},
    };
    results.push(symbolResult);
    for (const service of services) {
        request(service.host + service.path.replace('{symbol}', symbol), (err, resp, body) => {
            if (resp.statusCode !== 200) {
                console.log(`Got statusCode ${resp.statusCode} from ${service.name} while fetching ${symbol}`);
                requestsFinished++;
                return;
            }
            const dom = new jsdom.JSDOM(body);
            const doc = dom.window.document;
            try {
                symbolResult.estimations[service.name] = service.query(doc);
            } catch (err) {
                console.log(`Error while querying ${symbol} from ${service.name}`);
            }
            requestsFinished++;
        });
    }
}

const interval = setInterval(() => {
    if (requestsFinished === expectedRequestCount) {

        for (const result of results) {
            const estimations = result.estimations;
            let sum = 0;
            for (const estimationService in estimations) {
                const est = estimations[estimationService];
                if (!isNaN(est)) {
                    sum += est;
                }
            }
            result.averageEstimation = Math.round(sum / Object.keys(estimations).length * 100) / 100;
        }

        console.log(JSON.stringify(results));
        clearInterval(interval);
    }
}, 1000);
