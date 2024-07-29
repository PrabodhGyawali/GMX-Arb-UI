This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

# Bot function:
- API Caller ---> Matching Engine
- Tx Executor ---> Trade Database
- Position Monitor ()

## Buttons for bot interacting with SynthArb API
# Running
- `project-run`, `project-run-demo.tsx`

# Checking
- `is-position-open` -> display data on screen using APICaller {`get_funding_rates`, `filter_market_data`}
- `close-position-pair` -> send request to API

# Deploying collateral
- `deploy-collateral-synthetix`
- `deploy-collateral-hmx`

# Settings Options:
    MAX_ALLOWABLE_PERCENTAGE_AWAY_FROM_LIQUIDATION_PRICE=10
    TRADE_LEVERAGE=5
    DELTA_BOUND=0.03
    PERCENTAGE_CAPITAL_PER_TRADE=50
    DEFAULT_TRADE_DURATION_HOURS=8
    DEFAULT_TRADE_SIZE_USD=250