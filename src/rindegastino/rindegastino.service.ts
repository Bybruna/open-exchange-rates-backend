import { Injectable } from "@nestjs/common";
import { RindegastinoRepository } from "./repositories/rindegastino-repository";
import { RindegastinoDto } from "./dto/rindegastino.dto";
import { ServiceResult } from "src/shared/response/service-result";
import { HttpStatusCodes } from "src/shared/response/http-status-codes";
import { Rindegastino } from "src/database/entities/rindegastino.entity";
import { RindegastinoBirthdayDto } from "./dto/rindegastino-birthday.dto";
import { RindegastinosBirthday } from "src/database/entities/rindegastino-birthday.entity";
import { RindegastinosBirthdayRepository } from "./repositories/rindegastinos-birthday.repository";
import { RindegastinoQueryDto } from "./repositories/rindegastino-query.dto";

@Injectable()
export class RindegastinoService {

    constructor(
        private readonly _rindegastinoRepository: RindegastinoRepository,
        private readonly _rindegastinosBirthdayRepository: RindegastinosBirthdayRepository
    ) { }

    async createRindegastino(rindeGastinoDto: RindegastinoDto) {
        try {
            const rindeGastinoExist = await this._rindegastinoRepository.getByUniqueFields(
                rindeGastinoDto.name,
                rindeGastinoDto.lastName,
                rindeGastinoDto.birthdate
            );

            if (rindeGastinoExist) throw new ServiceResult(HttpStatusCodes.CONFLICT, "Rindegastino already exist");

            const newRindegastino = this.setRindegastino(rindeGastinoDto);

            const rindegastinoCreate = await this._rindegastinoRepository.create(newRindegastino);
            if (rindegastinoCreate === null) throw new ServiceResult(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error creating a new Rindegastino");

            return new ServiceResult(HttpStatusCodes.CREATED, "Rindegastino created successfully", rindegastinoCreate);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async calculateAndRecordBirthday(rindegastinoQueryDto: RindegastinoQueryDto): Promise<ServiceResult> {
        try {
            const daysUntilBirthday = this.calculateDaysUntilBirthday(rindegastinoQueryDto.birthdate);

            const existingBirthdayRecord = await this._rindegastinosBirthdayRepository.findByRindegastinoId(rindegastinoQueryDto.rindegastinoId);

            let birthdayRecord: RindegastinosBirthday;
            if (existingBirthdayRecord) {
                existingBirthdayRecord.daysUntilBirthday = daysUntilBirthday;
                birthdayRecord = await this._rindegastinosBirthdayRepository.updateBirthdayRecord(existingBirthdayRecord);
            } else {
                const recordBirthdayDto = this.setRindegastinoBirthdayDto(rindegastinoQueryDto, daysUntilBirthday);
                birthdayRecord = await this.recordBirthdayDays(recordBirthdayDto);
            }

            if (!birthdayRecord) return new ServiceResult(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error saving birthday record");

            return new ServiceResult(
                existingBirthdayRecord ? HttpStatusCodes.OK : HttpStatusCodes.CREATED,
                existingBirthdayRecord ? "Rindegastino's birthday updated successfully" : "Rindegastino's birthday created successfully",
                birthdayRecord
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getRindegastinosBirthdays(): Promise<ServiceResult> {
        try {
            const rindegastinosBirthdays = await this._rindegastinosBirthdayRepository.findAll();
            if (!rindegastinosBirthdays || rindegastinosBirthdays.length === 0) {
                return new ServiceResult(HttpStatusCodes.NOT_FOUND, "No birthdays found");
            }

            return new ServiceResult(HttpStatusCodes.OK, "Rindegastinos birthdays retrieved successfully", rindegastinosBirthdays);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public calculateDaysUntilBirthday(birthdate: Date) {
        const today = new Date();
        const birthDate = new Date(birthdate);

        let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        const diffInTime = nextBirthday.getTime() - today.getTime();
        return Math.ceil(diffInTime / (1000 * 3600 * 24));
    }

    private setRindegastino(rindegastinoDto: RindegastinoDto): Rindegastino {
        const newRindegastino = new Rindegastino();
        newRindegastino.name = rindegastinoDto.name.toLowerCase();
        newRindegastino.lastName = rindegastinoDto.lastName.toLowerCase();
        newRindegastino.birthdate = rindegastinoDto.birthdate;

        return newRindegastino;
    }

    private setRindegastinoBirthdayDto(rindegastinoQueryDto: RindegastinoQueryDto, daysUntilBirthday: number): RindegastinoBirthdayDto {
        const recordBirthdayDto = new RindegastinoBirthdayDto();
        recordBirthdayDto.rindegastinoId = rindegastinoQueryDto.rindegastinoId;
        recordBirthdayDto.daysUntilBirthday = daysUntilBirthday;
        return recordBirthdayDto;
    }

    private async recordBirthdayDays(rindegastinoBirthdayDto: RindegastinoBirthdayDto): Promise<RindegastinosBirthday> {
        const rindegastino = await this._rindegastinoRepository.findById(rindegastinoBirthdayDto.rindegastinoId);
        if (!rindegastino) {
            throw new ServiceResult(HttpStatusCodes.NOT_FOUND, 'Rindegastino not found');
        }

        const rindegastinoBirthday = new RindegastinosBirthday();
        rindegastinoBirthday.rindegastino = rindegastino;
        rindegastinoBirthday.daysUntilBirthday = rindegastinoBirthdayDto.daysUntilBirthday;

        const birthdayRecord = await this._rindegastinosBirthdayRepository.createBirthdayRecord(rindegastinoBirthday);
        if (!birthdayRecord) {
            throw new ServiceResult(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Error saving birthday record");
        }

        return birthdayRecord;
    }
}
