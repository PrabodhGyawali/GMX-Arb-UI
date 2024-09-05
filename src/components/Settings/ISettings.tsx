interface BotSettingsConfig {
    max_allowable_percentage_away_from_liquidation_price: number;
    trade_leverage: number;
    percentage_capital_per_trade: number;
    default_trade_duration_hours: number;
    default_trade_size_usd: number;
}


  
interface Token {
    token: string;
    is_target: boolean;
}

interface ExchangeSettings {
    base_provider_rpc: string;
    arbitrum_provider_rpc: string;
    chain_id_base: number;
    address: string;
}

interface ConfigFile {
    settings: BotConfig;
    target_exchanges: Exchange[];
    target_tokens: Token[];
    env_settings: ChainSettings;
}

interface EnvConfig {
    ADDRESS: string;
    PRIVATE_KEY: string;
    BINANCE_API_KEY: string;
    BINANCE_API_SECRET: string;
    BYBIT_API_KEY: string;
    BYBIT_API_SECRET: string;
}


export type {Exchange, Token, ConfigFile, ChainSettings, BotSettingsConfig, EnvConfig}