# Stonk Charts
An electron-angular application to easily compare different assets (stocks & crypto)

## Setup

Clone the repo
`git clone git@github.com:brn-dev/stonk-charts.git`

Install npm packages
`npm i`

Create a folder `~/stonk-charts/` and create the file `yahoo-api-config.json` in it with the following content:
```JSON
{
    "rapidapiKey": "YourKeyHere",
    "rapidapiHost": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    "interval": "1d",
    "range": "10y"
}
```

Start the application
`npm start`