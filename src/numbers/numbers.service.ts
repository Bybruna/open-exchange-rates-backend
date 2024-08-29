import { Injectable } from "@nestjs/common";

@Injectable()
export class NumbersService {

    getTheNumber(first: number, second: number): string {
        let concatenatedResult = '';

        for (let i = 1; i <= second; i++) {
            const result = first * i;
            concatenatedResult += result.toString();
        }

        const firstNineDigits = concatenatedResult.slice(0, 9);

        return firstNineDigits;
    }
}
