'use client'
import { Avatar } from '@/components/avatar'
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/dropdown'
import { useAccount } from '@/components/idn/accountContext'
import { SidebarFooter, SidebarItem } from '@/components/sidebar'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid'
import 'reflect-metadata'

export const AccountDropdownMenu = ({
  anchor,
  onDisconnect,
}: {
  readonly anchor: 'top start' | 'bottom end'
  onDisconnect: () => void
}) => {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem
        href="#"
        onClick={(e: any) => {
          e.preventDefault()
          onDisconnect()
        }}
      >
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Disconnect</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export const ConnectWallet: React.FC<{}> = ({}) => {
  const { account, connectWallet, disconnectWallet } = useAccount()
  return (
    <SidebarFooter className="max-lg:hidden">
      <Dropdown>
        <DropdownButton onClick={account ? () => {} : connectWallet} as={SidebarItem}>
          <span className="flex min-w-0 items-center gap-3">
            <Avatar src="/ideal/sticker-vertical.png" className="size-10" square alt="" />
            <span className="min-w-0">
              <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                {account ? 'Connected' : 'Disconnected'}
              </span>

              <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                {account ? account.address : 'Connect Wallet'}
              </span>
            </span>
          </span>
          <ChevronDownIcon />
          {account ? <AccountDropdownMenu anchor="top start" onDisconnect={disconnectWallet} /> : ''}
        </DropdownButton>
      </Dropdown>
    </SidebarFooter>
  )
}
