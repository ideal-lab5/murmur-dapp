import { IMasterService } from '@/services/IMasterService'
import { IMurmurService } from '@/services/IMurmurService'
import { MasterService } from '@/services/MasterService'
import { MurmurService } from '@/services/MurmurService'
import { useState } from 'react'
import { container } from 'tsyringe'
import { useAccount } from './accountContext'

const EtfButton = () => {
  const { account, connectWallet } = useAccount()
  const murmurService = container.resolve<IMurmurService>(MurmurService)
  const masterService = container.resolve<IMasterService>(MasterService)
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
        <button
          className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          onClick={account ? handleButtonClick : connectWallet}
        >
          {account ? 'get tokens' : 'connect wallet'}
        </button>
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
