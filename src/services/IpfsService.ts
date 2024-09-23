import { createHelia } from 'helia';
import { dagCbor } from '@helia/dag-cbor';
import { singleton } from 'tsyringe';
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { identify } from '@libp2p/identify'
import { webTransport } from '@libp2p/webtransport'
import { webSockets } from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
import { bootstrap } from '@libp2p/bootstrap';
import { webRTC } from '@libp2p/webrtc';
import { createLibp2p } from 'libp2p';
import { IIpfsService } from './IIpfsService';

@singleton()
export class IpfsService implements IIpfsService {
  url: any;
  ipfs: any;

  constructor() {
    this.setupLibp2p().then((libp2p) => {
      createHelia(libp2p).then(helia => {
        this.ipfs = dagCbor(helia);
        console.log("done with ipfs creation");
      });
    })
  }

  async setupLibp2p(): Promise<any> {

    const gatewayAddr = '/ip4/3.89.149.30/ipfs/'

    await createLibp2p({
      addresses: {
        listen: [
          '/webrtc'
        ]
      },
      transports: [
        webSockets({
          // Allow all WebSocket connections inclusing without TLS
          filter: filters.all,
        }),
        webTransport(),
        webRTC(),
        circuitRelayTransport({
          discoverRelays: 1,
        }),
      ],
      peerDiscovery: [
        bootstrap({
          list: [gatewayAddr],
        }),
      ],
      services: {
        identify: identify(),
      },
    })
  }

  async writeObject(dataObject: any): Promise<any> {
    if (!dataObject) throw new Error('Data object is required');
    const cid = await this.ipfs.add(dataObject);
    Promise.resolve(cid);
  }

  async getObject(cid: any): Promise<any> {
    if (!cid) throw new Error('CID is required');
    const obj = await this.ipfs.get(cid);
    Promise.resolve(obj);
  }
}