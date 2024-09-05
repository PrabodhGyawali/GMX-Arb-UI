// types.ts
export interface WalletSettings {
    address: string;
    private_key: string;
    arbitrum_rpc: string;
    chain_id_base: number;
}
  
export interface ExchangeSettings {
    bybit: {
        apiKey: string;
        apiSecret: string;
        enabled: boolean;
    };
    binance: {
        apiKey: string;
        apiSecret: string;
        enabled: boolean;
    };
}

interface Exchange {
    exchange: string;
    is_target: boolean;
}

interface Token {
    token: string;
    is_target: boolean;
}

export interface BotConfig {
    max_allowable_percentage_away_from_liquidation_price: number;
    trade_leverage: number;
    percentage_capital_per_trade: number;
    default_trade_duration_hours: number;
    default_trade_size_usd: number;
}

export interface UserData {
    walletSettings: WalletSettings;
    exchangeSettings: ExchangeSettings;
    botSettings: BotConfig;
}