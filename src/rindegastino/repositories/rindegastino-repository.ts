import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rindegastino } from "src/database/entities/rindegastino.entity";
import { Repository } from "typeorm";

@Injectable()
export class RindegastinoRepository {

    constructor(
        @InjectRepository(Rindegastino)
        private readonly _rindegastinoEntity: Repository<Rindegastino>,
    ) { }

    async create(rindegastino: Rindegastino): Promise<Rindegastino> {
        try {
            const savedRindegastino = await this._rindegastinoEntity.save(rindegastino);

            if (savedRindegastino === null) return null;
            return rindegastino;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getByUniqueFields(name: string, lastName: string, birthdate: Date): Promise<Rindegastino> {
        try {
            const exist = await this._rindegastinoEntity.findOne({
                where: {
                    name: name.trim().toLowerCase(),
                    lastName: lastName.trim().toLowerCase(),
                    birthdate: birthdate,
                }
            });
            return exist;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findById(id: string): Promise<Rindegastino> {
        try {
            const findId = await this._rindegastinoEntity.findOne({
                where: {
                    id: id
                }
            });

            if (findId === null) return null;
            return findId;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
