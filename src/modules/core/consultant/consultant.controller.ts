import { Controller, Get, Param, Delete } from "@nestjs/common";
import { ConsultantService } from "./consultant.service";

@Controller("consultant")
export class ConsultantController {
  constructor(private readonly consultantService: ConsultantService) {}


  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.consultantService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.consultantService.remove(+id);
  }
}
