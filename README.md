## Buttons for bot interacting with SynthArb API
- `project-run`, `project-run-demo.tsx`
- `is-position-open` -> display data on screen using APICaller {`get_funding_rates`, `filter_market_data`}
- `close-position-pair` -> send request to API
- `deploy-collateral-synthetix`
- `deploy-collateral-hmx`

# Settings:
- TODO: make sure at least 2 exchange settings are chosen
- TODO: make sure target exchanges link to deploy buttons
- TODO: add config fields for each Target Exchange

# TODO: User Welcome

# TODO: Position Monitor
    - TODO: Create a Card to view the trade executions etc. 
### Documentation so far:
- `/build/build-schema-interface.ts` to create TS interface from Position Monitor
- `src/components/TradeMonitorInterface.ts`
- `src/components/PositionMonitor.tsx`

# TODO: Log Monitor -> websockets / tcp-connection

# TODO: On a new session require user to enter their Wallet Address until Wallet Integration