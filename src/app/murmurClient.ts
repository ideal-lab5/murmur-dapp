import type { IMasterService } from '@/services/IMasterService'
import type { IMurmurService } from '@/services/IMurmurService'
import { MasterService } from '@/services/MasterService'
import { MurmurService } from '@/services/MurmurService'
import { container, delay, inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([
  {
    token: 'MurmurServiceImplementation',
    useToken: delay(() => MurmurService),
  },
  {
    token: 'MasterServiceImplementation',
    useToken: delay(() => MasterService),
  },
])
class MurmurClient {
  constructor(
    @inject('MurmurServiceImplementation') public murmurServiceInstance: IMurmurService,
    @inject('MasterServiceImplementation') public masterServiceInstance: IMasterService,
  ) {}
}

export const murmurClient: IMurmurService = container.resolve(MurmurClient).murmurServiceInstance
export const masterService: IMasterService = container.resolve(MurmurClient).masterServiceInstance
