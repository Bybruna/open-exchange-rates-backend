import { HttpStatusCodes } from "./http-status-codes";

export class ServiceResult {
    public statusCode: HttpStatusCodes;
    public message: string | null;
    public data: any | null;

    constructor(statusCode: HttpStatusCodes, message: string | null = null, data: any = null) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
