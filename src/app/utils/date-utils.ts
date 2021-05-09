import * as moment from 'moment';

export class DateUtils {

    public static toIsoString(secondsSince1970: number): string {
        return moment(secondsSince1970 * 1000).format('YYYY-MM-DD');
    }

    public static toDate(secondsSince1970: number): Date {
        return new Date(secondsSince1970 * 1000);
    }

}