import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** Enum representing different types of calendar events. */
export enum EventType {
  NEXT_YEAR = 'NEXT_YEAR',
  PREVIOUS_YEAR = 'PREVIOUS_YEAR',
  NEXT_MONTH = 'NEXT_MONTH',
  PREVIOUS_MONTH = 'PREVIOUS_MONTH',
  UPDATE_STATES = 'UPDATE_STATES',
}

/** Interface representing the data associated with a calendar event. */
export interface ICalendarEventData {
  type: EventType;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {
  /** Subject used to emit calendar events. */
  private dataSource = new Subject<ICalendarEventData>();

  /** Observable stream of calendar events. */
  public bus$ = this.dataSource.asObservable();

  /**
   * Emits a calendar event.
   * @param data - The event data to emit.
   */
  emitEvent(data: ICalendarEventData): void {
    this.dataSource.next(data);
  }
}
