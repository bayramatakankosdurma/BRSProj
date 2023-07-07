import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatchpopupComponent } from '../matchpopup/matchpopup.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent {
  sessionUsername = sessionStorage['username'];
  userList1: any;
  userList2: any;
  list3: any;
  dataSource: any;

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async LoadUser() {
    this.service.GetNeedUsers().subscribe((res) => {
      this.userList1 = res;
      this.dataSource = new MatTableDataSource(this.userList1);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['needyPerson', 'needId', 'isMatched'];

  matchUser(username: any, id: any, need: any) {
    const pop = this.dialog.open(MatchpopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        username: username,
        id: id,
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
