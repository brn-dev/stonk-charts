delete positions;
positions = [];

document.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-container"]')
    .children
    .forEach(c => {
        const isBuy = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-market-buy-label"]')?.innerHTML.trim().toLowerCase() === 'buy';
        const symbol = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-market-name"]').innerHTML.trim();
        const invested = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-invested"] > span').innerHTML.trim();
        const open = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-open-rate"] > span').innerHTML.trim();
        const leverage = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-leverage"] > span').innerHTML.trim();
        const fees = c.querySelector('*[data-etoro-automation-id="portfolio-manual-trades-table-body-cell-container-fees"] > span').innerHTML.trim();

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