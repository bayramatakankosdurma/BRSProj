import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NeedpopupComponent } from '../needpopup/needpopup.component';

@Component({
  selector: 'app-need',
  templateUrl: './need.component.html',
  styleUrls: ['./need.component.css'],
})
export class NeedComponent {
  sessionUsername = sessionStorage['username'];
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadUser() {
    this.service.GetNeedUsers().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['username', 'id', 'need', 'isMatched'];

  PostNeed(username: any, need: any) {
    const pop = this.dialog.open(NeedpopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: username,
        need: need,
      },
    });
    pop.afterClosed().subscribe((res) => {
      this.LoadUser();
    });
  }

  openDialog() {
    this.LoadUser();
  }
}
