import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RindegastinoService } from "./rindegastino.service";
import { RindegastinoDto } from "./dto/rindegastino.dto";
import { ServiceResult } from "src/shared/response/service-result";
import { HttpStatusCodes } from "src/shared/response/http-status-codes";
import { RindegastinoQueryDto } from "./repositories/rindegastino-query.dto";

@Controller("rindegastino")
@ApiTags("Rindegastino")
export class RindegastinoController {

    constructor(
        private readonly _rindegastinoService: RindegastinoService
    ) { }

    @Post()
    @ApiResponse({ status: 201, description: "Currency Converted Successfully" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    @ApiOperation({ summary: "Create a new Rindegastino" })
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createRindegastino(@Body() rindegastinoDto: RindegastinoDto): Promise<ServiceResult> {
        try {
            const serviceResult = await this._rindegastinoService.createRindegastino(rindegastinoDto);
            return serviceResult;
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }

    @Get("/getDaysUntilMyBirthday/:rindegastinoId")
    @ApiResponse({ status: 200, description: "Days until the next birthday returned successfully" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    @ApiOperation({ summary: "Get the number of days until the next birthday based on the birthdate" })
    async getDaysUntilMyBirthday(
        @Param('rindegastinoId') rindegastinoId: string,
        @Query() rindegastinoQueryDto: RindegastinoQueryDto,
    ): Promise<ServiceResult> {
        try {
            rindegastinoQueryDto.rindegastinoId = rindegastinoId;
            const daysUntilBirthday = this._rindegastinoService.calculateDaysUntilBirthday(new Date(rindegastinoQueryDto.birthdate));
            await this._rindegastinoService.calculateAndRecordBirthday(rindegastinoQueryDto);
            return new ServiceResult(HttpStatusCodes.OK, "Days until the next birthday returned successfully", daysUntilBirthday);
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }

    @Get("/getRindegastinosBirthdays")
    @ApiResponse({ status: 200, description: "List of all Rindegastinos with days until their birthdays" })
    @ApiResponse({ status: 404, description: "No birthdays found" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    @ApiOperation({ summary: "Get all Rindegastinos with their birthdays and days until the next birthday" })
    async getRindegastinosBirthdays(): Promise<ServiceResult> {
        try {
            const serviceResult = await this._rindegastinoService.getRindegastinosBirthdays();
            return serviceResult;
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }
}
