import { Module } from "@nestjs/common";
import { RindegastinoController } from "./rindegastino.controller";
import { RindegastinoService } from "./rindegastino.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rindegastino } from "src/database/entities/rindegastino.entity";
import { RindegastinoRepository } from "./repositories/rindegastino-repository";
import { RindegastinosBirthday } from "src/database/entities/rindegastino-birthday.entity";
import { RindegastinosBirthdayRepository } from "./repositories/rindegastinos-birthday.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Rindegastino,
            RindegastinosBirthday
        ])
    ],
    controllers: [RindegastinoController],
    providers: [RindegastinoService, RindegastinoRepository, RindegastinosBirthdayRepository]
})
export class RindegastinoModule { }
