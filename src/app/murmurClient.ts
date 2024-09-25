import type { IIpfsService } from '@/services/IIpfsService'
import type { IMasterService } from '@/services/IMasterService'
import type { IIdnService } from '@/services/IIdnService'
import { IpfsService } from '@/services/IpfsService'
import { MasterService } from '@/services/MasterService'
import { IdnService } from '@/services/IdnService'
import { container, delay, inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([
  {
    token: 'IdnServiceImplementation',
    useToken: delay(() => IdnService),
  },
  {
    token: 'IpfsServiceImplementation',
    useToken: delay(() => IpfsService),
  },
  {
    token: 'MasterServiceImplementation',
    useToken: delay(() => MasterService),
  },
])
class MurmurClient {
  constructor(
    @inject('IdnServiceImplementation') public idnServiceInstance: IIdnService,
    @inject('IpfsServiceImplementation') public ipfsServiceInstance: IIpfsService,
    @inject('MasterServiceImplementation') public masterServiceInstance: IMasterService,
  ) {}
}

export const idnService: IIdnService = container.resolve<IIdnService>('IdnServiceImplementation')
export const ipfsService: IIpfsService = container.resolve<IIpfsService>('IpfsServiceImplementation')
export const masterService: IMasterService = container.resolve<IMasterService>('MasterServiceImplementation')
