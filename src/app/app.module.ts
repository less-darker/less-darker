import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PingTesterComponent } from './components/ping-tester/ping-tester.component';
import { MapsComponent } from './components/maps/maps.component';
import { CalcComponent } from './components/calc/calc.component';
import { CheatSheetComponent } from './components/cheat-sheet/cheat-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PingTesterComponent,
    MapsComponent,
    CalcComponent,
    CheatSheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
