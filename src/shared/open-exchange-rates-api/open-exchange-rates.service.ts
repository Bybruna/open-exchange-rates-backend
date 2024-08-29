import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { ServiceResult } from "../response/service-result";
import { HttpStatusCodes } from "../response/http-status-codes";

@Injectable()
export class OpenExchangeRatesService {
    private _apiClient: AxiosInstance;
    private readonly _appId: string;

    constructor() {
        this._apiClient = axios.create({
            baseURL: process.env.OPEN_EXCHANGE_RATES_API,
            timeout: 20000,
        });
        this._appId = process.env.APP_ID;
    }

    async getLatestExchangeRates() {
        try {
            if (!this._appId) throw new ServiceResult(HttpStatusCodes.BAD_REQUEST, "Missing Api Key");
            const response = await this._apiClient.get("latest.json?", {
                params: { app_id: this._appId }
            });

            return new ServiceResult(HttpStatusCodes.OK, "Latest Exchange Rates Returned Successfully", response.data);
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }

    async getHistoricalExchangeRates(date: string) {
        try {
            const response = await this._apiClient.get(`historical/${date}.json`, {
                params: { app_id: this._appId }
            });

            return new ServiceResult(HttpStatusCodes.OK, "Historical Exchange Rates returned successfully", response.data);
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }
}
