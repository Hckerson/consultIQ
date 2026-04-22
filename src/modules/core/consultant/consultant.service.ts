import { Injectable } from "@nestjs/common";
import { Consultant } from "src/common/interfaces/consultant.interface";
import { consultantNormalizer } from "src/engines/consultant/consultant.normalizer";

@Injectable()
export class ConsultantService {
  matchConsultant(consultant: Consultant) {
    const normalizedConsultant = consultantNormalizer(consultant);
    return `This action returns all consultant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}
