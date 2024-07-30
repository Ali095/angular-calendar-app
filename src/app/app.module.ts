import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * The root module of the application. 
 * Declares and imports the core components and modules required for the application to run.
 */
@NgModule({
  declarations: [
    AppComponent,  // Root component
    HeaderComponent, NotFoundComponent // Header component for the application
  ],
  imports: [
    BrowserModule,          // Essential for running the app in a browser
    BrowserAnimationsModule, // Required for Angular Material animations
    AppRoutingModule,       // Routing module to handle navigation
    MatButtonModule,        // Angular Material Button module
    MatIconModule,          // Angular Material Icon module
    MatSnackBarModule,      // Angular Material snak bar for toast messages
  ],
  providers: [], // No global providers at this moment
  bootstrap: [AppComponent] // Root component to bootstrap the application
})
export class AppModule { }
