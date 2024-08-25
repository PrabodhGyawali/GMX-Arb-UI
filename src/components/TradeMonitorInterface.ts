export interface Trade {
  id: number;
  strategy_execution_id: string;
  exchange: string;
  symbol: string;
  side: string;
  is_hedge: boolean;
  size_in_asset: number;
  liquidation_price: number;
  open_close: string;
  open_time: Date;
  close_time?: Date;
  pnl?: number;
  accrued_funding?: number;
  close_reason?: string;
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