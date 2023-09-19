import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);

export class Preservation {
   constructor(date_performed, duration) {
      this.date_performed = date_performed;
      this.duration = duration;
      this.isExpired = this.getExpired();
      this.isReady = this.getReady();
      this.isValid = this.getValid();
      this.format = this.getFormat();
      this.expiredDate = this.getExpiredDate();
      this.preservationTime = this.getPreservationTime();
   }
   getExpired = () => {
      return dayjs().isAfter(dayjs(this.date_performed).add(this.duration, 'day'));
   };

   getValid = () => {
      return dayjs().isBefore(dayjs(this.date_performed).add(this.duration, 'day'));
   };

   getReady = () => {
      return dayjs().isBetween(dayjs(this.date_performed).add(this.duration - 14, 'day'), dayjs(this.date_performed).add(this.duration, 'day'), 'day');
   };

   getFormat = () => {
      return dayjs(this.date_performed).format('DD / MMM / YYYY');
   };

   getExpiredDate = () => {
      return dayjs(this.date_performed).add(this.duration, 'day').format('DD / MMM / YYYY');
   };

   getPreservationTime = () => {
      return dayjs().to(dayjs(this.date_performed).add(this.duration, 'day'));
   };
}