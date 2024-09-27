import { useState } from 'react'
import { masterService, murmurClient as murmurService } from '../../app/murmurClient'
import { useAccount } from './accountContext'
import { Button } from '@/components/button'

const EtfButton = () => {
  const { account, connectWallet } = useAccount()
  const [request, setRequest] = useState<boolean>(false)
  const [messages, setMessages] = useState<string[]>([])

  const handleButtonClick = async () => {
    try {
      await sendTransaction()
    } catch (error) {
      console.error(error)
    }
  }

  const sendTransaction = async () => {
    if (!account) {
      console.error('No account found')
      return
    }

    const api = (await murmurService.getEtfApi()).api

    // Create a extrinsic, transferring 100 units to the user account
    const transfer = api.tx.balances.transferAllowDeath(account.address, 100_000_000_000_000)

    // Sign and send the transaction using our account
    await transfer.signAndSend(masterService.getMasterAccount(), {}, (result) => {
      setRequest(true)
      if (result.isInBlock) {
        setMessages((prevMessages) => [
          ...prevMessages,
          `Transfer included at block hash ${result.status.asInBlock.toHex()}`,
        ])
      } else if (result.isFinalized) {
        setMessages((prevMessages) => [...prevMessages, `Finalized block hash ${result.status.asFinalized.toHex()}`])
      }
    })
  }

  return (
    <>
      {!request ? (
        <Button
          color="sky"
          onClick={account ? handleButtonClick : connectWallet}
        >
          {account ? 'Get tokens' : 'Connect wallet'}
        </Button>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default EtfButton
