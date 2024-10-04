import { Etf } from '@ideallabs/etf.js'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { singleton } from 'tsyringe'
import chainSpec from '../etf_spec/dev/etf_spec.json'
import * as Sc from '@substrate/connect'
import type { IMurmurService } from './IMurmurService'
import { ApiPromise, ScProvider, WsProvider } from '@polkadot/api'
import axios from "axios";
import { MurmurClient } from "murmur.js";

const NODE_DEV: string = 'ws://127.0.0.1:9944'

@singleton()
export class MurmurService implements IMurmurService {
  public api!: ApiPromise
  client!: MurmurClient

  constructor() {
    this.init(NODE_DEV).then(() => {
      console.log('ready.')
    })
  }

  getApi(): ApiPromise {
    return this.api
  }

  async init(
    providerMultiAddr?: string,
    chainSpec?: string,
    extraTypes?: any
  ): Promise<MurmurClient> {
    // setup polkadotjs
    this.api = await this.setupPolkadotJs(
      providerMultiAddr,
      chainSpec,
      extraTypes,
    );
    // setup axios
    const httpClient = axios.create({
      baseURL: "http://127.0.0.1:8000",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Set-Cookie",
      },
    });

    // init murmur client (inject deps)
    this.client = new MurmurClient(httpClient, this.api);
    console.log("MurmurClient initialized");

    return Promise.resolve(this.client)
  }

  async setupPolkadotJs(providerMultiAddr?: string,
    chainSpec?: string,
    extraTypes?: any): Promise<ApiPromise> {
    let provider
    if (providerMultiAddr == undefined) {
      let spec = JSON.stringify(chainSpec)
      provider = new ScProvider(Sc, spec)
      await provider.connect()
    } else {
      provider = new WsProvider(providerMultiAddr)
    }

    return (await ApiPromise.create({
      provider,
      types: {
        ...extraTypes,
      }
    }))
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<any> {
    let res = await this.client.authenticate(username, password)
    console.log('res ' + res);
    return Promise.resolve()
  }

  async new(validity: number): Promise<any> {
    let res = await this.client.new(validity)
    return Promise.resolve(res)
  }

  async inspect(username: string): Promise<any> {
    let result = await this.api.query.murmur.registry(username)
    return Promise.resolve(result.toHuman())
  }

  async execute(callData: Uint8Array): Promise<any> {
    return Promise.resolve('')
  }
}
