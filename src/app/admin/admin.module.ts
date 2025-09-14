import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RequestComponent } from './request/request.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchPipe } from '../pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HighchartsChartModule} from 'highcharts-angular';


@NgModule({
  declarations: [
    DashboardComponent,
    RecipeListComponent,
    UsersListComponent,
    ManageRecipeComponent,
    DownloadsComponent,
    RequestComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SearchPipe,
    FormsModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    HighchartsChartModule
  ]
})
export class AdminModule { }
