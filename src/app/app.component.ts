import { Component } from '@angular/core';

/**
 * The root component of the calendar application.
 * This component serves as the main entry point and contains basic configuration.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Path to the HTML template file
  styleUrls: ['./app.component.css']    // Path to the CSS styles for this component
})
export class AppComponent {
  // Title of the application
  title = 'calendar-app';

  /**
   * Constructor for the AppComponent.
   * Currently does not contain any dependencies.
   */
  constructor() {
    // Initialization logic, if any, can be added here
  }
}
