import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Appointment } from '../models/appointment.model';
import { Day } from '../models/day.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private static STORAGE_KEY = 'appointments';

  /**
   * Loads appointments from local storage.
   * @returns An array of appointments.
   */
  private _loadStoredAppointments(): Appointment[] {
    try {
      const storedAppointments = localStorage.getItem(AppointmentService.STORAGE_KEY);
      return storedAppointments ? JSON.parse(storedAppointments).map((data: unknown) => new Appointment().deserialize(data)) : [];
    } catch (error) {
      console.error('Failed to load appointments from localStorage:', error);
      return [];
    }
  }

  /**
   * Saves an appointment to local storage.
   * @param form - The form group containing appointment data.
   */
  saveAppointment(form: FormGroup): void {
    const appointments = this._loadStoredAppointments();
    appointments.push(new Appointment().deserialize(form.value));

    this._saveAppointmentsToStorage(appointments);
  }

  /**
   * Lists appointments for specific days in a given month and year.
   * @param days - The days to list appointments for.
   * @param month - The month to list appointments for (1-based index).
   * @param year - The year to list appointments for.
   * @returns An array of Day objects with their appointments.
   */
  listAppointments(days: number[], month: number, year: number): Day[] {
    const appointments = this._loadStoredAppointments();

    return days.map(day => {
      const filteredAppointments = appointments.filter(appointment => {
        const date = new Date(appointment.date);
        return date.getDate() === day && (date.getMonth() + 1) === month && date.getFullYear() === year;
      });

      return {
        day,
        appointments: filteredAppointments,
      };
    }).map(dayData => new Day().deserialize(dayData));
  }

  /**
   * Deletes a specific appointment.
   * @param appointment - The appointment to delete.
   */
  deleteAppointment(appointment: Appointment): void {
    const appointments = this._loadStoredAppointments();
    const updatedList = appointments.filter(a => a.title !== appointment.title || a.description !== appointment.description || a.date !== appointment.date);

    this._saveAppointmentsToStorage(updatedList);
  }

  /**
   * Updates an appointment with a new date.
   * @param appointment - The appointment to update.
   * @param newDay - The new day for the appointment.
   * @param month - The month for the appointment (1-based index).
   * @param year - The year for the appointment.
   */
  updateAppointment(appointment: Appointment, newDay: number, month: number, year: number): void {
    const appointments = this._loadStoredAppointments();
    const index = appointments.findIndex(a =>
      a.title === appointment.title &&
      a.description === appointment.description &&
      a.date === appointment.date
    );

    if (index !== -1) {
      appointments[index].date = new Date(year, month - 1, newDay);
      this._saveAppointmentsToStorage(appointments);
    } else {
      console.warn('Appointment not found for update:', appointment);
    }
  }

  /**
   * Saves appointments to local storage.
   * @param appointments - The appointments to save.
   */
  private _saveAppointmentsToStorage(appointments: Appointment[]): void {
    try {
      const jsonAppointments = JSON.stringify(appointments);
      localStorage.setItem(AppointmentService.STORAGE_KEY, jsonAppointments);
    } catch (error) {
      console.error('Failed to save appointments to localStorage:', error);
    }
  }
}
