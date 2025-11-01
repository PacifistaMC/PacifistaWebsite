import {Injectable} from "@angular/core";

@Injectable()
export default class WorldDlLogsService {

    logs: string[] = [];

    logError(message: string) {
        const log = `[ERROR - ${this.formatDate(new Date())}] - ${message}`;

        this.logs.push(log);
        console.error(log);

        if (this.logs.length > 200) {
            this.logs.shift();
        }
    }

    log(message: string) {
        const log = `[INFO - ${this.formatDate(new Date())}] - ${message}`;

        console.log(log);
        this.logs.push(log);

        if (this.logs.length > 200) {
            this.logs.shift();
        }
    }

    private formatDate(date: Date): string {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

}