import { Module } from "@nestjs/common";
import { EmailService } from "./EmailService";

@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})

export class CommonModule {}