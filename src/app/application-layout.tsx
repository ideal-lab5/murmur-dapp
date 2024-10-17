'use client'
import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { ChevronDownIcon, Cog8ToothIcon } from '@heroicons/react/16/solid'
import {
  CubeIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

export const ApplicationLayout = ({
  children,
}: {
  readonly children: React.ReactNode
}) => {
  let pathname = usePathname()

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/ideal/logo-onecolor-white-ISO.png" />
                <SidebarLabel>Ideal Network</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar
                    slot="icon"
                    src="/ideal/logo-onecolor-white-ISO.png"
                  />
                  <DropdownLabel>Ideal Network</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <SparklesIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Status</SidebarHeading>
              <SidebarItem href={'#'}>
                <CubeIcon />
                <SidebarLabel>Something here XXX </SidebarLabel>
              </SidebarItem>
              <SidebarItem href={'#'}>
                <RocketLaunchIcon />
                <SidebarLabel>Something here YYY </SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem
                href="https://docs.idealabs.network/docs/intro"
                target="blank"
              >
                <QuestionMarkCircleIcon />
                <SidebarLabel>Documentation</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
