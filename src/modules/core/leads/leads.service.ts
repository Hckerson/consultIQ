import { Injectable } from "@nestjs/common";
import { Lead } from "src/common/interfaces/lead.interface";

@Injectable()
export class LeadsService {
  constructor() {}
  async processLead(lead:Lead) {

  }
}
