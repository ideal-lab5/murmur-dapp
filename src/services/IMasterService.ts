import type { KeyringPair } from '@polkadot/keyring/types';

export interface IMasterService {
  getMasterAccount: () => KeyringPair
}
