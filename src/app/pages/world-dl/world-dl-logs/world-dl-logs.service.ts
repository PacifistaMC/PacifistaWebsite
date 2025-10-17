import {Injectable} from "@angular/core";

@Injectable()
export default class WorldDlLogsService {

    logs: string[] = [];

    log(message: string) {
        this.logs.push(`[${this.formatDate(new Date())}] - ${message}`);

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