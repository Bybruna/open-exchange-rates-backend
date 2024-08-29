import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NumbersService } from "./numbers.service";
import { ServiceResult } from "src/shared/response/service-result";

@Controller("numbers")
@ApiTags("Numbers")
export class NumbersController {

    constructor(
        private readonly _numbersService: NumbersService
    ) { }

    @Get("/getTheNumber")
    @ApiResponse({ status: 200, description: "First 9 digits of the concatenated product result" })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    @ApiOperation({ summary: "Get the first 9 digits of the concatenated product of two numbers" })
    async getNumbers(
        @Query("first") first: number,
        @Query("second") second: number
    ): Promise<string> {
        try {
            const result = this._numbersService.getTheNumber(first, second);
            return result;
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }
}
