import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { Employee } from 'src/app/shared/interface/employee';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['fullname', 'dateJoined', 'salary'];
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() data : Array<Employee>;
  dataSource;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
    this.sortDescDateJoined();
  }


  sortDescDateJoined() {
    this.onSortChange({ active: 'dateJoined', direction: 'desc' })
  }

  onSortChange(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'fullname': return this.compare(a.firstname, b.firstname, isAsc);
        case 'dateJoined': return this.compare(new Date(a.dateJoined), new Date(b.dateJoined), isAsc);
        case 'salary': return this.compare(a.salary, b.salary, isAsc);
        default: return 0;
      }
    });
  }


  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
