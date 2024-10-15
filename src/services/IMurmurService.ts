import { ApiPromise } from '@polkadot/api'
import { MurmurClient } from 'murmur.js'
import { Extrinsic } from '../../../murmur.js/src/types';

export interface IMurmurService {

  getApi(): ApiPromise;

  /**
   * Initialize the MurmurService
   * @returns 
   */
  init: () => Promise<MurmurClient>
  
  /**
   * Authenticate with the murmur API (generate a seed)
   * @param username: The username to identify the murmur wallet
   * @param password: The secret password to generate the seed
   * @returns Nothing currrently
   */
  authenticate: (username: string, password: string) => Promise<any>

  /**
   * Create a new murmur wallet
   * @returns ()
   */
  new: (validity: number, callback: (result: any) => Promise<void>) => Promise<any>

  /**
   * Inspect a username to fetch murmur wallet details
   * @param username: The username to identify a wallet
   * @returns A wallet address if one exists, else nothing
   */
  inspect: (username: string) => Promise<any>

  execute: (extrinsic: Extrinsic, callback: (result: any) => Promise<void>) => Promise<any>

  faucet: (recipientAddress: any, signer: any, callback: (result: any) => Promise<void>) => Promise<any>

}
