// AccountContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

// Define the context type
interface AccountContextType {
  account: InjectedAccountWithMeta | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Create the context
const AccountContext = createContext<AccountContextType | undefined>(undefined);

// Custom hook to use the AccountContext
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

// Provider component
export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<InjectedAccountWithMeta | null>(null);

  // Connect the wallet and set the account
  const connectWallet = async () => {
    if (typeof window === 'undefined') return;  // Ensure this only runs in the browser

    const extensions = await web3Enable('Murmur');
    if (extensions.length === 0) {
      console.log('No extension found or permission was not granted.');
      return;
    }

    const accounts = await web3Accounts();
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    }
  };

  // Disconnect the wallet and clear the account
  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <AccountContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </AccountContext.Provider>
  );
};