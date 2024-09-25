import type { Etf as Idn } from '@ideallabs/etf.js'

export interface IIdnService {
  getApi: () => Promise<Idn>
}
