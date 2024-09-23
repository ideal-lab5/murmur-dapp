import type { Etf } from '@ideallabs/etf.js'

export interface IMurmurService {
  getEtfApi: () => Promise<Etf>
}
