import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    const dateParam = this.route.snapshot.queryParamMap.get('date');
    const defaultDate = dateParam ? new Date(dateParam) : new Date();
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [defaultDate, [Validators.required, this.dateNotInPast()]],
    });
  }

  /**
   * Custom validator to check if the date is not in the past.
   * @returns Validator function.
   */
  dateNotInPast(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();

      // Remove time portion for comparison
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }


  onSubmit() {
    if (this.form.valid) {
      this.appointmentService.saveAppointment(this.form);
      this.router.navigateByUrl('/');
    }
  }

  validateField(field: string) {
    return this.form.get(field)?.valid && this.form.get(field)?.touched;
  }
}
