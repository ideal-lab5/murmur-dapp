'use client'
import "reflect-metadata";
import { Avatar } from '@/components/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownItem,
    DropdownLabel,
    DropdownMenu
} from '@/components/dropdown'
import {
    SidebarFooter,
    SidebarItem,
} from '@/components/sidebar'
import {
    ChevronUpIcon,
} from '@heroicons/react/16/solid'
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

export function AccountDropdownMenu({ anchor }: { readonly anchor: 'top start' | 'bottom end' }) {


    const disconnect = () => {

    }

    return (
        <DropdownMenu className="min-w-64" anchor={anchor}>
            <DropdownItem href="#" onClick={(e: any) => { e.preventDefault(); disconnect(); }}>
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Disconnect</DropdownLabel>
            </DropdownItem>
        </DropdownMenu>
    )
}

export const ConnectWallet: React.FC<{}> = ({ }) => {

    const isConnected = true;
    // Handler for the click event of the `Connect` button on the NavBar.
    const handleConnect = async () => {

    }

    return (
        <SidebarFooter className="max-lg:hidden">
            <Dropdown>
                <DropdownButton as={SidebarItem}>
                    <span className="flex min-w-0 items-center gap-3">
                        <Avatar src="/ideal/sticker-vertical.png" className="size-10" square alt="" />
                        <span className="min-w-0">
                            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Connected</span>
                            <span className="block truncate text-xs/5 font-normal text-green-500 dark:text-green-500">Balance: {"XXX"} IDN</span>
                            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                {"0x..."}
                            </span>
                        </span>
                    </span>
                    <ChevronUpIcon />
                </DropdownButton>
                <AccountDropdownMenu anchor="top start" />
            </Dropdown>
        </SidebarFooter>
    );
};
