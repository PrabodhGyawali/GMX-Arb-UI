import React from 'react'
import { ComponentWithChildrenProps } from '../types.tsx'
import { useSocket } from 'Context/SocketContext.tsx';

export const RequiresOnboarding = (
    {children} : ComponentWithChildrenProps 
) => {
    const { finishedOnboardingAt } = useAssertUserState();
    const {push} = useRouter();
    const { socket, connected } = useSocket();

  return (
    <div>RequiresOnboarding</div>
  )
}

// /api/settings/get -> 500
// Explain the Trading Bot app. -Get Started-
// Exchange Integration
    // GMX -> `config.yaml` -> mainnet base url etc.
    // Binance -> 2 keys
    // Bybit -> 2 keys
    // Synthetix -> account creation for connected wallet
// Private Key Address / Wallet Integration (Metamask [default])
    // Front-end: user signs
    // Back-end: backend it happens automatically
// Token Integration
// Privacy Policy/ Terms of Service
    // Sign that with wallet

//// Developer Dashboard / Chart
    // `trades.db` sum
    // `opportunities.db` sum
    // Currently open `positions.db` sum

// Think: Centralized Database
