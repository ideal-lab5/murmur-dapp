import type { IIpfsService } from "@/services/IIpfsService";
import type { IMurmurService } from "@/services/IMurmurService";
import { IpfsService } from "@/services/IpfsService";
import { MurmurService } from "@/services/MurmurService";
import { container, delay, inject, injectable, registry } from "tsyringe";

@injectable()
@registry([
    {
        token: "MurmurServiceImplementation",
        useToken: delay(() => MurmurService)
    },
    {
        token: "IpfsServiceImplementation",
        useToken: delay(() => IpfsService)
    }
])
class MurmurClient {
    constructor(@inject("MurmurServiceImplementation") public murmurServiceInstance: IMurmurService,
    @inject("IpfsServiceImplementation") public ipfsServiceInstance: IIpfsService

) { }
}

export const murmurClient: IMurmurService = container.resolve(MurmurClient).murmurServiceInstance;
export const ipfsClient: IIpfsService = container.resolve(MurmurClient).ipfsServiceInstance;