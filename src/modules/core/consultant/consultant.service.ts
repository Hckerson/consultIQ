import { AppConfig } from "@/common/config/app.config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Consultant } from "src/common/interfaces/consultant.interface";
import { Lead } from "src/common/interfaces/lead.interface";
import { ConsultantMatchingEngine } from "src/engines/consultant/consultant.matcher";
import { consultantNormalizer } from "src/engines/consultant/consultant.normalizer";

@Injectable()
export class ConsultantService {
  constructor(
    private readonly matchEngine: ConsultantMatchingEngine,
    private configService: ConfigService<AppConfig>,
  ) {}
  matchConsultant(consultant: Consultant, lead: Lead) {
    const normalizedConsultant = consultantNormalizer(consultant);
    const matchedConsultant = this.matchEngine.matchConsultant(
      normalizedConsultant,
      lead,
    );

    return matchedConsultant;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}
