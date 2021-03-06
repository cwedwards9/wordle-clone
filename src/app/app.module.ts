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

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

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
    TutorialDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
