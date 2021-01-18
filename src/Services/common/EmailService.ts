import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  async sendEmail(emailIds: string[], subject: string, body?: string): Promise<void>{
    // Send email
  }
}