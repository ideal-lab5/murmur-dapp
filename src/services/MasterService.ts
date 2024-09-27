import { Keyring } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import 'reflect-metadata'
import { singleton } from 'tsyringe'
import { IMasterService } from './IMasterService'

@singleton()
export class MasterService implements IMasterService {
  getMasterAccount(): KeyringPair {
    const keyring = new Keyring({ type: 'sr25519' })
    const alice = keyring.addFromUri('//Alice')
    return alice
  }
}
