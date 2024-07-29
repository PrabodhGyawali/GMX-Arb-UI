export interface Trade {
  id: number | null;
  strategy_execution_id: string;
  exchange: string;
  symbol: string;
  side: string;
  is_hedge: string;
  size_in_asset: number;
  liquidation_price: number;
  open_close: string;
  open_time: Date | null;
  close_time: Date | null;
  pnl: number | null;
  accrued_funding: number | null;
  close_reason: any | null;
} // TODO: Change build script interface name to `Trade`

export const tradeFields: string[] = [
  "id",
  "strategy_execution_id",
  "exchange",
  "symbol",
  "side",
  "is_hedge",
  "size_in_asset",
  "liquidation_price",
  "open_close",
  "open_time",
  "close_time",
  "pnl",
  "accrued_funding",
  "close_reason"
];