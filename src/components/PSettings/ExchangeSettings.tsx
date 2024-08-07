import { Exchange, Token } from "./ISettings"

interface ExchangeSettingsProps {
    target_exchanges: Exchange[];
    target_tokens: Token[];
}

function ExchangeSettings({target_exchanges, target_tokens}: ExchangeSettingsProps) {
    return (
        <section className="ExchangeSettings">
            <div className="target-exchanges">
                <h2>Target Exchanges</h2>
                <div>
                    {target_exchanges.map( exchange =>  
                            <div className="exchange-checkbox">
                                <input type="checkbox" checked={exchange.is_target}/>
                                <label htmlFor="">{exchange.exchange}</label>
                            </div>
                    )}
                </div>
            </div>
                
            <div className="target-tokens">
                <h2>Target Tokens</h2>
                <div>
                    {target_tokens.map( token  =>  
                            <div className="exchange-checkbox">
                                <input type="checkbox" checked={token.is_target}/>
                                <label htmlFor="">{token.token}</label>
                            </div>
                    )}
                </div>   
            </div>
        </section>
    )
}

export default ExchangeSettings