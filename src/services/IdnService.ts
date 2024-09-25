import { Etf as Idn } from '@ideallabs/etf.js'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { singleton } from 'tsyringe'
import chainSpec from '../chain_spec/dev/etf_spec.json'
import type { IIdnService } from './IIdnService'

@singleton()
export class IdnService implements IIdnService {
  api!: Idn
  node_dev: string = 'ws://127.0.0.1:9944'

  constructor() {
    this.getApi().then(() => {
      console.log('API is ready.')
    })
  }

  async getApi(): Promise<Idn> {
    if (!this.api) {
      // ensure params are defined
      if (process.env.NEXT_PUBLIC_NODE_WS === undefined) {
        console.error('Provide a valid value for NEXT_PUBLIC_NODE_DETAILS. Using fallback')
        process.env.NEXT_PUBLIC_NODE_WS = this.node_dev
      }

      try {
        await cryptoWaitReady()
        let api = new Idn(process.env.NEXT_PUBLIC_NODE_WS, false)
        console.log('Connecting to Ideal Network...')
        await api.init(JSON.stringify(chainSpec))
        this.api = api
      } catch (_e) {
        // TODO: next will try to fetch the wasm blob but it doesn't need to
        // since the transitive dependency is built with the desired wasm already
        // so we can ignore this error for now (no impact to functionality)
        // but shall be addressed in the future
      }
    }

    console.log('api initialized')
    return Promise.resolve(this.api)
  }
}
