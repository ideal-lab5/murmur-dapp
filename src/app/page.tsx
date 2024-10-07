'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { murmurClient } from './murmurClient'
import { useState } from 'react'
import { Input } from '@/components/input'

export default function Home() {

  const [username, setUsername] = useState('')
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    const usernameElement = document.getElementById('username') as HTMLInputElement
    const passwordElement = document.getElementById('password') as HTMLInputElement

    if (usernameElement.value === null || passwordElement.value === null) {
      console.error("username and password fields must be defined")
      return
    }

    const username = usernameElement.value
    usernameElement.value = ''

    const password = passwordElement.value
    passwordElement.value = ''

    murmurClient.authenticate(username, password).then(() => {
      setUsername(username)
      console.log("we assume the result is valid for now, so lets pretend you have a cookie containing the seed");
      // immediately inspect to see if a proxy already exists for the given username
      murmurClient.inspect(username).then((address) => {
        if (address) {
          setAddress(address.address)
        } else {
          console.log(`no proxy found with name ${username}`)
        }
      })
    })
  }

  const handleNew = async () => {
    murmurClient.new(100).then(result => {
      murmurClient.inspect(username).then((address) => {
        if (address) {
          console.log('called inspect! ' + address)
          setAddress(address.address)
        } else {
          console.log('well...no :)')
        }
      })
    })
  }

  const handleSendRemark = async () => {
    console.log("not yet implemented")
  }

  return (
    <>
      <Heading>Murmur Wallet</Heading>

      {username ?
        <div className='grid gap-x-8 gap-y-6'>
          <span>Hello {username}</span>
          {address !== '' ?
            <div className='grid gap-x-8 gap-y-6'>
              <span>Address: {address}</span>
              <span>Send a system remark</span>
              <Input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
              <Button onClick={handleSendRemark}>
                Send Remark
              </Button>
            </div>
            :
            <div>
              <Button onClick={handleNew}>
                Create Wallet
              </Button>
            </div>
          }
        </div>
        :
        <div className='grid gap-x-8 gap-y-6'>
          <Input id="username" type='text' placeholder='username' />
          <Input id="password" type='password' placeholder='password' />
          <Button color="purple" onClick={handleAuth}>
            Authenticate
          </Button>
        </div>
      }
    </>
  )
}
