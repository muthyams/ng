import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LayoutModule } from './/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddDepartmentService } from './school/departments/add-department.service';
import { HttpClientModule } from '@angular/common/http';
import { CourseComponentService } from './school/departments/course/course.component.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ScriptLoaderService,AddDepartmentService, CourseComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
