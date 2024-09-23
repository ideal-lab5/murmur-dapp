'use client'

// import { container } from '@/app/di/containerConfig'
import { Button } from '@/components/button'
import EtfButton from '@/components/etf/etfButton'
import { Heading, Subheading } from '@/components/heading'
import 'reflect-metadata'
import { ipfsClient, murmurClient } from './murmurClient'

export default function Home() {
  console.log(`Service instances murmur: ${murmurClient} and ipfs ${ipfsClient}`)

  async function handleIpfsTest() {
    const cid = await ipfsClient.writeObject({ hello: 'world' })
    console.log(`CID: ${cid}`)
    const object = await ipfsClient.getObject(cid)
    console.log(`Object: ${object}`)
  }

  return (
    <>
      <Heading>Murmur Wallet</Heading>
      <Subheading>Coming soon! Work in progress...</Subheading>
      <Button color="purple" onClick={() => handleIpfsTest()}>
        {' '}
        IPFS test
      </Button>
      <EtfButton />
    </>
  )
}
