'use client'

import { Button } from '@/components/button'
import IdnButton from '@/components/idn/idnButton'
import { Heading, Subheading } from '@/components/heading'
import { ipfsService, idnService } from './murmurClient'

export default function Home() {
  console.log(`Service instances murmur: ${idnService} and ipfs ${ipfsService}`)

  async function handleIpfsTest() {
    const cid = await ipfsService.writeObject({ hello: 'world' })
    console.log(`CID: ${cid}`)
    const object = await ipfsService.getObject(cid)
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
      <IdnButton />
    </>
  )
}
