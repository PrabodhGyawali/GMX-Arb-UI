## Buttons for bot interacting with SynthArb API
- `project-run`, `project-run-demo.tsx`
- `is-position-open` -> display data on screen using APICaller {`get_funding_rates`, `filter_market_data`}
- `close-position-pair` -> send request to API
- `deploy-collateral-synthetix`
- `deploy-collateral-hmx`


# TODO: User Welcome
##### Settings Options:
    MAX_ALLOWABLE_PERCENTAGE_AWAY_FROM_LIQUIDATION_PRICE=10
    TRADE_LEVERAGE=5
    DELTA_BOUND=0.03
    PERCENTAGE_CAPITAL_PER_TRADE=50
    DEFAULT_TRADE_DURATION_HOURS=8
    DEFAULT_TRADE_SIZE_USD=250

# TODO: Position Monitor
### Documentation so far:
- `/build/build-schema-interface.ts` to create TS interface from Position Monitor
- `src/components/TradeMonitorInterface.ts`
- `src/components/PositionMonitor.tsx`

# TODO: Log Monitor -> websockets / tcp-connection