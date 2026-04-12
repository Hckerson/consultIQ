import { Injectable } from "@nestjs/common";
import { Lead } from "src/common/interfaces/leads";

@Injectable()
export class Leads {
  constructor (private lead: Lead){

  }
  
}
