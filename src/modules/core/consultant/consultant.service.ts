import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@/common/config/app.config";
import { Lead } from "src/common/interfaces/lead.interface";
import { Consultant } from "src/common/interfaces/consultant.interface";
import { ConsultantMatchingEngine } from "src/engines/consultant/consultant.matcher";

@Injectable()
export class ConsultantService {
  constructor(
    private readonly matchEngine: ConsultantMatchingEngine,
    private configService: ConfigService<AppConfig>,
  ) {}
  matchConsultant(lead: Lead) {
    const matchedConsultant = this.matchEngine.matchConsultant(lead);
    return matchedConsultant;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}
