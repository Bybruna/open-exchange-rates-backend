import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RindegastinosBirthday } from "src/database/entities/rindegastino-birthday.entity";
import { Repository } from "typeorm";

@Injectable()
export class RindegastinosBirthdayRepository {

    constructor(
        @InjectRepository(RindegastinosBirthday)
        private readonly _rindegastinosBirthdayEntity: Repository<RindegastinosBirthday>,
    ) { }

    async createBirthdayRecord(rindegastinosBirthday: RindegastinosBirthday): Promise<RindegastinosBirthday> {
        try {
            const birthdayRecord = await this._rindegastinosBirthdayEntity.save(rindegastinosBirthday);

            if (birthdayRecord === null) return null;
            return birthdayRecord;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findAll(): Promise<RindegastinosBirthday[]> {
        try {
            const findBirthdays = await this._rindegastinosBirthdayEntity.find({
                relations: ['rindegastino']
            });

            if (findBirthdays === null) return null;
            return findBirthdays;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findByRindegastinoId(rindegastinoId: string): Promise<RindegastinosBirthday> {
        try {
            return await this._rindegastinosBirthdayEntity.findOne({
                where: { rindegastino: { id: rindegastinoId } },
                relations: ['rindegastino'],
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateBirthdayRecord(rindegastinosBirthday: RindegastinosBirthday): Promise<RindegastinosBirthday> {
        try {
            return await this._rindegastinosBirthdayEntity.save(rindegastinosBirthday);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
