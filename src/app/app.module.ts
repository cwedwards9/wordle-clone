import { NgModule } from '@angular/core';

// COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { GridComponent } from './components/grid/grid.component';
import { GridRowComponent } from './components/grid-row/grid-row.component';
import { GridTileComponent } from './components/grid-tile/grid-tile.component';
import { KeyboardComponent } from "./components/keyboard/keyboard.component";
import { KeyComponent } from './components/key/key.component';
import { TutorialDialogComponent } from './components/tutorial-dialog/tutorial-dialog.component';
import { GridRowExampleComponent } from './components/tutorial-dialog/grid-row-example/grid-row-example/grid-row-example.component';
import { StatisticsDialogComponent } from './components/statistics-dialog/statistics-dialog.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    GridComponent,
    GridRowComponent,
    GridTileComponent,
    KeyboardComponent,
    KeyComponent,
    TutorialDialogComponent,
    GridRowExampleComponent,
    StatisticsDialogComponent,
    SideNavComponent,
    SettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
