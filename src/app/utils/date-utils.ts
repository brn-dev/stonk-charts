import * as moment from 'moment';

export class DateUtils {

    public static toIsoString(timestamp: number): string {
        return moment(timestamp).format('YYYY-MM-DD');
    }

}