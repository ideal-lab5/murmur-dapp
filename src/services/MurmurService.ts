import { singleton } from "tsyringe";
import type { IMurmurService } from "./IMurmurService";
import { cryptoWaitReady } from '@polkadot/util-crypto';
import chainSpec from "../etf_spec/dev/etf_spec.json"
import { Etf } from "@ideallabs/etf.js";

@singleton()
export class MurmurService implements IMurmurService {

  api: any;
  node_dev: string = "ws://127.0.0.1:9944";

  constructor() {
    this.getEtfApi().then(() => {
      console.log("ETF.js API is ready.");
    });
  };

  async getEtfApi(): Promise<any> {

    if (!this.api) {
      // ensure params are defined
      if (process.env.NEXT_PUBLIC_NODE_WS === undefined) {
        console.error("Provide a valid value for NEXT_PUBLIC_NODE_DETAILS. Using fallback");
        process.env.NEXT_PUBLIC_NODE_WS = this.node_dev;
      }

      try {
        await cryptoWaitReady();
        let api = new Etf(process.env.NEXT_PUBLIC_NODE_WS, false);
        console.log("Connecting to ETF chain");
        await api.init(JSON.stringify(chainSpec));
        this.api = api;
      } catch (_e) {
        // TODO: next will try to fetch the wasm blob but it doesn't need to
        // since the transitive dependency is built with the desired wasm already
        // so we can ignore this error for now (no impact to functionality)
        // but shall be addressed in the future
      }
    }

    console.log("api initialized")
    return Promise.resolve(this.api);
  };
}