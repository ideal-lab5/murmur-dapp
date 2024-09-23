import type { IMurmurService } from "@/services/IMurmurService";
import { MurmurService } from "@/services/MurmurService";
import { container, delay, inject, injectable, registry } from "tsyringe";

@injectable()
@registry([
    {
        token: "MurmurServiceImplementation",
        useToken: delay(() => MurmurService)
    }
])
class MurmurClient {
    constructor(@inject("MurmurServiceImplementation") public service: IMurmurService) { }
}

export const murmurClient: IMurmurService = container.resolve(MurmurClient).service;