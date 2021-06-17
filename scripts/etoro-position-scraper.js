delete positions;
positions = [];

function polish(str) {
    return str.trim().replace('$', '').replace('X', '');
}

document.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-container"]')
    .children
    .forEach(c => {
        const isBuy = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-market-buy-label"]')?.innerHTML.trim().toLowerCase() === 'buy';
        const symbol = polish(c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-market-name"]').innerHTML);
        const invested = +polish(c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-invested"] > span').innerHTML);
        const open = +polish(c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-open-rate"] > span').innerHTML);
        const leverage = +polish(c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-leverage"] > span').innerHTML);
        const fees = +polish(c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-fees"] > span').innerHTML);

        positions.push({
            symbol,
            isBuy,
            invested,
            open,
            leverage,
            fees
        });
    });

console.log(JSON.stringify(positions));