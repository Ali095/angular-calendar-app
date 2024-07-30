# Calendar App

## Overview

This project is a simple calendar application built with Angular, Angular Material, and Angular CDK. It allows users to create, delete, and move appointments using a user-friendly interface. 

## Features

1. **Add Appointments**: Form to add calendar appointments.
2. **Delete Appointments**: Ability to remove appointments.
3. **Move Appointments**: Ability to move appointments via drag and drop.
4. **Calendar View**: Render calendar dates and appointments using `ngFor`.
5. **Date Handling**: Use of JavaScript `Date` objects for date manipulation.
6. **Drag & Drop**: Implemented using Angular CDK.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed. You can download them from [Node.js official website](https://nodejs.org/).

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd calendar-app
```

Install the dependencies:

```bash
npm install
```

### Development Server

Start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200` in your browser to view the application.

### Build

Build the project for production:

```bash
npm run build
```

### Lint

Run lint checks:

```bash
npm run lint
```

## Usage

### Adding an Appointment

- Fill in the "Title", "Description", and "Date" fields in the form.
- Click "Save" to add the appointment.

### Deleting an Appointment

- Click the delete button next to the appointment you wish to remove.

### Moving an Appointment

- Drag and drop appointments to different dates within the calendar.

## Angular Features Used

- **Dependency Injection**: Used throughout the application to provide services.
- **Lazy Loading**: Implemented for routing modules to optimize loading time.
- **Reactive Forms**: Used for form handling with validators and value changes.
- **RxJS**: Utilized for managing reactive streams and event handling.
- **Angular Material**: Used for UI components and styling.
- **Angular CDK**: Used for drag-and-drop functionality.

## Angular Material and CDK Modules

Ensure the following modules are imported in your `app.module.ts` or respective feature modules:

- `MatFormFieldModule`
- `MatInputModule`
- `MatDatepickerModule`
- `MatNativeDateModule`
- `DragDropModule`
- `ReactiveFormsModule`

## Troubleshooting

If you encounter issues, check the following:

1. **Dependency Issues**: Ensure all dependencies are correctly installed.
2. **Console Errors**: Review the browser's console for error messages.
3. **Form Validation**: Verify that form controls and validators are correctly implemented.

