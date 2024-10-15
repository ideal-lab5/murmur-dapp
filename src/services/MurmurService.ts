import { MurmurClient } from '@ideallabs/murmur.js'
import type { Call } from '@ideallabs/murmur.js/dist/types'
import { ApiPromise, Keyring, ScProvider, WsProvider } from '@polkadot/api'
import { formatBalance } from '@polkadot/util'
import * as Sc from '@substrate/connect'
import axios from 'axios'
import { singleton } from 'tsyringe'
import type { IMurmurService } from './IMurmurService'

const FALLBACK_NODE_WS = 'ws://127.0.0.1:9944'
const FALLBACK_API_URL = 'http://127.0.0.1:8000'

@singleton()
export class MurmurService implements IMurmurService {
  public api!: ApiPromise
  client!: MurmurClient
  wsUrl!: String
  apiUrl!: String

  constructor() {
    let apiUri = process.env.NEXT_PUBLIC_MURMUR_API
    if (!apiUri) {
      console.log('murmur api not specified, using local fallback')
      apiUri = FALLBACK_API_URL
    }

    this.apiUrl = apiUri

    let wsUri = process.env.NEXT_PUBLIC_NODE_WS
    if (!wsUri) {
      console.log('substrate node websocket not specified, using local fallback')
      wsUri = FALLBACK_NODE_WS
    }

    this.wsUrl = wsUri

    this.init(this.wsUrl as string).then(() => {
      console.log('ready.')
    })
  }

  getApi(): ApiPromise {
    return this.api
  }

  async init(providerMultiAddr?: string, chainSpec?: string, extraTypes?: any): Promise<MurmurClient> {
    // setup polkadotjs
    this.api = await this.setupPolkadotJs(providerMultiAddr, chainSpec, extraTypes)
    // setup axios
    const httpClient = axios.create({
      baseURL: this.apiUrl as string,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Set-Cookie',
      },
    })

    // init murmur client (inject deps)
    const keyring = new Keyring()
    const alice = keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519')
    this.client = new MurmurClient(httpClient, this.api, alice)
    console.log('MurmurClient initialized')

    return Promise.resolve(this.client)
  }

  async setupPolkadotJs(providerMultiAddr?: string, chainSpec?: string, extraTypes?: any): Promise<ApiPromise> {
    let provider
    if (providerMultiAddr == undefined) {
      let spec = JSON.stringify(chainSpec)
      provider = new ScProvider(Sc, spec)
      await provider.connect()
    } else {
      provider = new WsProvider(providerMultiAddr)
    }

    return await ApiPromise.create({
      provider,
      types: {
        ...extraTypes,
      },
    })
  }

  async authenticate(username: string, password: string): Promise<any> {
    let res = await this.client.authenticate(username, password)
    return Promise.resolve(res)
  }

  async new(validity: number, callback: (result: any) => Promise<void>): Promise<any> {
    let res = await this.client.new(validity, callback)
    return Promise.resolve(res)
  }

  async inspect(username: string): Promise<any> {
    let result: any = (await this.api.query.murmur.registry(username)).toHuman()
    let address = ''
    let balance = ''
    if (result && result.address) {
      address = result.address
      let accountData: any = await this.api.query.system.account(result.address)
      balance = formatBalance(accountData.data.free, { withSiFull: true, decimals: 12 })
    }
    return Promise.resolve({ address, balance })
  }

  async execute(call: Call, callback: (result: any) => Promise<void>): Promise<any> {
    await this.client.execute(call, callback)
    return Promise.resolve('')
  }

  async faucet(
    recipientAddress: any,
    signer: any,
    callback: (status: any) => Promise<void> = async () => {}
  ): Promise<any> {
    let tx = await this.api.tx.balances.transferAllowDeath(recipientAddress, BigInt(500_000_000_000_000))
    tx.signAndSend(signer, async (result: any) => {
      callback(result)
    })
    return Promise.resolve()
  }
}
