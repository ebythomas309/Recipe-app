import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { AuthService } from '../../services/services/auth.service'


HighchartsAccessibility(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSideBarOpen = true;
  userCount = 0;
  downloadCount = 0;
  requestCount = 0;
  recipeCount = 0;
  selected = new Date();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  // ✅ Inject AuthService + Router
  constructor(private api: ApiService, private auth: AuthService, private router: Router) {
    this.chartOptions = {
      chart: { type: 'bar' },
      title: { text: "Analysis of Download Recipes Based on Cuisine", align: 'left' },
      xAxis: { type: 'category' },
      yAxis: { title: { text: "Total Download Recipe Count" } },
      legend: { enabled: false },
      credits: { enabled: false },
      series: [{
        name: 'Cuisine',
        colorByPoint: true,
        type: 'bar',
        data: [
          { name: 'Italian', y: 4 },
          { name: 'Asian', y: 3 },
          { name: 'American', y: 1 },
          { name: 'Mexican', y: 2 },
        ]
      }]
    };
  }

  ngOnInit() {
    this.getUserCount();
    this.getDownloadCount();
    this.getRecipeCount();
    this.getRequestCount();
  }

  // ✅ Logout method
  logout() {
  this.auth.logout();
  this.router.navigateByUrl('/login'); // redirect
}

  // your existing API calls...
  getUserCount() { /* ... */ }
  getDownloadCount() { /* ... */ }
  getRecipeCount() { /* ... */ }
  getRequestCount() { /* ... */ }

  menuBtnClicked() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
