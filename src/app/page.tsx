'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Call } from '@ideallabs/murmur.js/src/types'
import { BN } from 'bn.js'
import { useState } from 'react'
import { masterService, murmurClient } from './murmurClient'

export default function Home() {
  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState('')

  const [address, setAddress] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState(0)

  const handleAuth = async () => {
    const usernameElement = document.getElementById('username') as HTMLInputElement
    const passwordElement = document.getElementById('password') as HTMLInputElement

    if (usernameElement.value === null || passwordElement.value === null) {
      console.error('username and password fields must be defined')
      return
    }

    const username = usernameElement.value
    usernameElement.value = ''

    const password = passwordElement.value
    passwordElement.value = ''

    setUsername(username)
    murmurClient.authenticate(username, password).then(async () => {
      await handleInspect(username)
    })
  }

  const handleNew = async () => {
    murmurClient.new(300, async (result) => {
      if (result.status.isInBlock) {
        await handleInspect(username)
      }
    })
  }

  const handleExecuteBalanceTransfer = async () => {
    murmurClient.inspect(to).then(async (account) => {
      let balance = new BN(amount * Math.pow(10, 12))
      if (account && account.address.length > 0) {
        let tx = murmurClient.getApi().tx.balances.transferKeepAlive(account.address, balance)

        await murmurClient.execute(tx as Call, async (result) => {
          if (result.status.isInBlock) {
            console.log(`Transaction included at blockHash ${result.status.asInBlock}`)
            await handleInspect(username)
          }
        })
      } else {
        console.log(`no proxy found with name ${username}`)
      }
    })
  }

  const handleInspect = async (username: any) => {
    murmurClient.inspect(username).then((info) => {
      if (info) {
        setAddress(info.address)
        setBalance(info.balance)
      } else {
        console.log(`no proxy found with name ${username}`)
        setUsername('')
      }
    })
  }

  const handleFaucet = async () => {
    console.log('sending tokens to address ' + address)
    await murmurClient.faucet(address, masterService.getMasterAccount(), async (result) => {
      console.log(result)
      if (result.status.isInBlock) {
        await handleInspect(username)
      }
    })
  }

  return (
    <>
      <Heading>Murmur Wallet</Heading>

      {username ? (
        <div className="grid gap-x-8 gap-y-6">
          <span>Hello {username}</span>
          {address !== '' ? (
            <div className="grid gap-x-8 gap-y-6">
              <div className="grid">
                <span>Address: {address}</span>
                <span>Balance: {balance}</span>
                <Button onClick={handleFaucet}>Free Demo Faucet (500 tokens)</Button>
              </div>
              <span>Transfer Tokens</span>
              <Input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
              <Input type="number" step="any" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
              <Button onClick={handleExecuteBalanceTransfer}>Submit</Button>
            </div>
          ) : (
            <div>
              <Button type="submit" onClick={handleNew}>
                Create Wallet
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-6">
          <Input id="username" type="text" placeholder="username" />
          <Input id="password" type="password" placeholder="password" />
          <Button color="purple" onClick={handleAuth}>
            Authenticate
          </Button>
        </div>
      )}
    </>
  )
}
