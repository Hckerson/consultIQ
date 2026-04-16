import { Injectable } from "@nestjs/common";

@Injectable()
export class ConsultantService {
  findAll() {
    return `This action returns all consultant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}
