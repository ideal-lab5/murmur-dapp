'use client'

import { Heading, Subheading } from '@/components/heading'
import { container } from "tsyringe";
import { IpfsService } from '@/services/IpfsService';
import { Button } from '@headlessui/react';
import { murmurClient } from './murmurClient';
import "reflect-metadata";

export default function Home() {

  const etfApi = container.resolve(IpfsService);
  console.log("Service instance initialized", murmurClient);

  return (
    <>
      <Heading>Murmur Wallet</Heading>
      <Subheading>Coming soon! Work in progress...</Subheading>
      <button onClick={() => etfApi.writeObject({})}> IPFS test</button>
    </>
  )
}
