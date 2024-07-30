import { Injectable } from '@angular/core';

interface DateInfo {
  year: number;
  month: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  /**
   * Gets the list of days in a given month and year.
   * @param year - The year of the month.
   * @param month - The month (1-based index) of the year.
   * @returns An array of days in the month.
   */
  getDaysInMonth(year: number, month: number): number[] {
    const daysInMonth: number[] = [];
    const lastDay = this.getLastDayOfMonth(year, month);

    for (let day = 1; day <= lastDay; day++) {
      daysInMonth.push(day);
    }
    return daysInMonth;
  }

  /**
   * Gets the next month, adjusting the year if necessary.
   * @param year - The current year.
   * @param month - The current month (1-based index).
   * @returns The year and month for the next month.
   */
  nextMonth(year: number, month: number): DateInfo {
    if (month === 12) {
      return { year: year + 1, month: 1 };
    }
    return { year, month: month + 1 };
  }

  /**
   * Gets the previous month, adjusting the year if necessary.
   * @param year - The current year.
   * @param month - The current month (1-based index).
   * @returns The year and month for the previous month.
   */
  previousMonth(year: number, month: number): DateInfo {
    if (month === 1) {
      return { year: year - 1, month: 12 };
    }
    return { year, month: month - 1 };
  }

  /**
   * Gets the next year.
   * @param year - The current year.
   * @param month - The current month (1-based index).
   * @returns The year for the next year, keeping the month the same.
   */
  nextYear(year: number, month: number): DateInfo {
    return { year: year + 1, month };
  }

  /**
   * Gets the previous year.
   * @param year - The current year.
   * @param month - The current month (1-based index).
   * @returns The year for the previous year, keeping the month the same, or the current year if below minimum year limit.
   */
  previousYear(year: number, month: number): DateInfo {
    const MIN_YEAR = 1920;
    if (year <= MIN_YEAR) {
      return { year, month };
    }
    return { year: year - 1, month };
  }

  /**
   * Gets the last day of the given month.
   * @param year - The year of the month.
   * @param month - The month (1-based index) of the year.
   * @returns The last day of the month.
   */
  private getLastDayOfMonth(year: number, month: number): number {
    // Use the next month to get the last day of the current month
    return new Date(year, month, 0).getDate();
  }
}
