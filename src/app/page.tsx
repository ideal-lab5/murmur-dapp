'use client'

import { Heading, Subheading } from '@/components/heading'
import "reflect-metadata";
import { murmurClient } from './murmurClient';

export default function Home() {

  console.log("Service instance initialized", murmurClient);

  return (
    <>
      <Heading>Murmur Wallet</Heading>
      <Subheading>Coming soon! Work in progress...</Subheading>
    </>
  )
}
