const settings = {
    "settings": {
        "MAX_ALLOWABLE_PERCENTAGE_AWAY_FROM_LIQUIDATION_PRICE": 10,
        "TRADE_LEVERAGE": 5,
        "DELTA_BOUND": 0.03,
        "PERCENTAGE_CAPITAL_PER_TRADE": 50,
        "DEFAULT_TRADE_DURATION_HOURS": 8,
        "DEFAULT_TRADE_SIZE_USD": 250
    },
    "target_exchanges": [
        {"exchange": "Synthetix", "is_target": true},
        {"exchange": "Binance", "is_target": true},
        {"exchange": "ByBit", "is_target": true},
        {"exchange": "HMX", "is_target": false},
        {"exchange": "GMX", "is_target": false}
    ],
    "target_tokens": [
        {"token": "BTC", "is_target": true},
        {"token": "ETH", "is_target": true},
        {"token": "SNX", "is_target": false},
        {"token": "SOL", "is_target": true},
        {"token": "W", "is_target": false},
        {"token": "WIF", "is_target": false},
        {"token": "ARB", "is_target": false},
        {"token": "BNB", "is_target": false},
        {"token": "ENA", "is_target": false},
        {"token": "DOGE", "is_target": false},
        {"token": "AVAX", "is_target": false},
        {"token": "PENDLE", "is_target": false}
    ],
    "BASE_PROVIDER_RPC": "",
    "ARBITRUM_PROVIDER_RPC": "",
    "CHAIN_ID_BASE": "",
    "ADDRESS": "",
    "PRIVATE_KEY": "",

    "BINANCE_API_KEY": "",
    "BINANCE_API_SECRET":"",

    "BYBIT_API_KEY":"",
    "BYBIT_API_SECRET":""
}

/**
 * Navbar button button to acess settings page
 */
function SettingsButton() {
    return (
        <section className="botSettings">
            <button className="open-settings"></button>
        </section>
    )
}

function BotSettings() {
    const target_exchanges = settings.target_exchanges;
    const target_tokens = settings.target_tokens; 
    return (
        <section className="settingsPage">
            <div className="target-exchanges"></div>
                <div>
                    {target_exchanges.map( exchange =>  
                            <div className="exchange-checkbox">
                                <input type="checkbox" checked={exchange.is_target}/>
                                <label htmlFor="">{exchange.exchange}</label>
                            </div>
                    )}
                </div>
            <div className="target-tokens">
                <div>
                    {target_tokens.map( token  =>  
                            <div className="exchange-checkbox">
                                <input type="checkbox" checked={token.is_target}/>
                                <label htmlFor="">{token.token}</label>
                            </div>
                    )}
                </div>   
            </div>
            <div className="env-variables">
                {/* TODO: Add all the stuff */}
            </div>
        </section>
    )
}

export {SettingsButton, BotSettings}

// TODO: Read this https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

