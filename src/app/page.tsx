'use client'

import { Heading, Subheading } from '@/components/heading'
import { IpfsService } from '@/services/IpfsService';
import { container } from "tsyringe";
import "reflect-metadata";
import { Button } from '@headlessui/react';


export default function Home() {

  const etfApi = container.resolve(IpfsService);

  return (
    <>
      <Heading>Murmur Wallet</Heading>
      <Subheading>Coming soon! Work in progress...</Subheading>
      <button onClick={() => etfApi.writeObject({})}> IPFS test</button>
    </>
  )
}
