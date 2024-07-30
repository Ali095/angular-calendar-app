import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Define the application routes
const routes: Routes = [
  // Lazy-loaded Calendar module
  { path: '', loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule) },

  // Lazy-loaded Create Appointment module
  { path: 'add', loadChildren: () => import('./pages/create-appointment/create-appointment.module').then(m => m.CreateAppointmentModule) },

  // Wildcard route for a 404 page
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Enable scroll position restoration to restore scroll position on navigation
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
