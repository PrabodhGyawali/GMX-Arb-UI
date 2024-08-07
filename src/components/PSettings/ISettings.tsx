interface BotConfig {
    MAX_ALLOWABLE_PERCENTAGE_AWAY_FROM_LIQUIDATION_PRICE: number;
    TRADE_LEVERAGE: number;
    PERCENTAGE_CAPITAL_PER_TRADE: number;
    DEFAULT_TRADE_DURATION_HOURS: number;
    DEFAULT_TRADE_SIZE_USD: number;
}

interface Exchange {
    exchange: string;
    is_target: boolean;
  }
  
interface Token {
    token: string;
    is_target: boolean;
}

interface ChainSettings {
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


export type {Exchange, Token, ConfigFile, ChainSettings, BotConfig, EnvConfig}