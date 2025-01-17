import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Day } from 'src/app/models/day.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CalendarEventService, EventType } from 'src/app/services/calendar-event.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { Appointment } from 'src/app/models/appointment.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  days: number[] = [];
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  currentDate: Date = new Date();
  daysWithAppointments: Day[] = [];

  readonly EVENT_TYPE = EventType;

  constructor(
    private calendarService: CalendarService,
    private calendarEventService: CalendarEventService,
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  openCreateAppointmentPage(selectedDay: number) {
    const selectedDate = new Date(); // Adjust the date logic as needed
    selectedDate.setDate(selectedDay);

    // Navigate to the /add route with the selected date as a query parameter
    this.router.navigate(['/add'], {
      queryParams: {
        date: selectedDate.toISOString().split('T')[0] // Format date as YYYY-MM-DD
      }
    });
  }

  ngOnInit() {
    this.updateStates(this.year, this.month);

    this.calendarEventService.bus$.subscribe(({ type }) => {
      if (type === EventType.PREVIOUS_MONTH) {
        this.previousMonth();
      }

      if (type === EventType.NEXT_MONTH) {
        this.nextMonth();
      }

      if (type === EventType.PREVIOUS_YEAR) {
        this.previousYear();
      }

      if (type === EventType.NEXT_YEAR) {
        this.nextYear();
      }

      if (type === EventType.UPDATE_STATES) {
        this.updateStates(this.year, this.month);
      }
    });
  }

  updateStates(year: number, month: number) {
    this.month = month;
    this.year = year;
    this.days = this.calendarService.getDaysInMonth(year, month);
    this.daysWithAppointments = this.appointmentService.listAppointments(this.days, this.month, this.year);
  }

  nextMonth() {
    const { year, month } = this.calendarService.nextMonth(this.year, this.month);
    this.updateStates(year, month);
  }

  previousMonth() {
    const { year, month } = this.calendarService.previousMonth(this.year, this.month);
    this.updateStates(year, month);
  }

  nextYear() {
    const { year, month } = this.calendarService.nextYear(this.year, this.month);
    this.updateStates(year, month);
  }

  previousYear() {
    const { year, month } = this.calendarService.previousYear(this.year, this.month);
    this.updateStates(year, month);
  }

  openAppointment(appointment: Appointment): void {
    this.dialog.open(AppointmentDialogComponent, {
      height: '400px',
      width: '400px',
      data: {
        appointment,
      },
    });
  }

  shouldShowAddButton(dayIndex: number, appointments: any[]): boolean {
    return dayIndex === this.daysWithAppointments.length - 1;
  }

  drop(ev: CdkDragDrop<Appointment[]>) {
    const targetDate = new Date(this.year, this.month - 1, parseInt(ev.container.element.nativeElement.id));
    const today = new Date();
    if (ev.previousContainer !== ev.container) {
      if (targetDate < today) {
        // Show toast message
        this.snackBar.open('The past date cannot be selected for the appointment.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      } else {
        this.appointmentService.updateAppointment(
          ev.item.data as Appointment,
          parseInt(ev.container.element.nativeElement.id),
          this.month,
          this.year,
        );

        this.updateStates(this.year, this.month);
      }
    }
  }
}

