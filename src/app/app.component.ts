import { Component, OnInit } from '@angular/core';
import { JsonData } from './shared/data/mockup.data';
import { Employee } from './shared/interface/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'inscale-dev';
  jsonData: Array<Employee> = JsonData;
  higherSalary: number = 0;
  recentlyJoinedEmployee: string = '';

  constructor() { }

  ngOnInit() {
    this.getHigherSalary();
    this.getRecentlyJoined();
  }
  getHigherSalary() {
    const salaryList = this.jsonData && this.jsonData.length > 0 ? this.jsonData.map(item => item.salary) : null;
    this.higherSalary = Math.max(...salaryList);
  }

  getRecentlyJoined() {
    const employee = this.jsonData.sort((a, b) => new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime())[0];
    this.recentlyJoinedEmployee = `${employee.firstname} ${employee.lastname}`
  }
}
