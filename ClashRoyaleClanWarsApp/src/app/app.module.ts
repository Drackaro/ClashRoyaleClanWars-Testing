import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { TableModule } from "primeng/table";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {InputSwitchModule} from "primeng/inputswitch";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";
import {ContextMenuModule} from "primeng/contextmenu";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    SideMenuComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    BadgeModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    CardModule,
    ToolbarModule,
    InputSwitchModule,
    TooltipModule,
    DialogModule,
    InputTextareaModule,
    PaginatorModule,
    CheckboxModule,
    CalendarModule,
    ReactiveFormsModule,
    ContextMenuModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
