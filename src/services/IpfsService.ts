import {createHelia} from 'helia';
import {dagCbor} from '@helia/dag-cbor';
import {CID} from 'multiformats/cid'
import { singleton } from 'tsyringe';
import {createLibp2p} from 'libp2p';
// import { gossipsub } from '@chainsafe/libp2p-gossipsub'
// import { noise } from '@chainsafe/libp2p-noise'
// import { yamux } from '@chainsafe/libp2p-yamux'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { dcutr } from '@libp2p/dcutr'
import { identify } from '@libp2p/identify'
import { webTransport } from '@libp2p/webtransport'
import { webSockets } from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
// import { multiaddr } from '@multiformats/multiaddr'
import { bootstrap } from '@libp2p/bootstrap';
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { webRTC } from '@libp2p/webrtc';

@singleton()
export class IpfsService {
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
        ]},
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

    async writeObject (dataObject: any): Promise<any> {

      const cid = await this.ipfs.add({hello: 'world'});
      console.log("cid: ")
      console.log(cid.toString());
      console.log(cid.toJSON());

      const obj = await this.ipfs.get(cid);
      console.log(obj);



    }

    
}