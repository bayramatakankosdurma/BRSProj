import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProvidepopupComponent } from '../providepopup/providepopup.component';

@Component({
  selector: 'app-provide',
  templateUrl: './provide.component.html',
  styleUrls: ['./provide.component.css'],
})
export class ProvideComponent {
  sessionUsername = sessionStorage['username'];
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadUser() {
    this.service.GetProvideUsers().subscribe((res) => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['username', 'id', 'provide', 'isMatched'];

  PostNeed(username: any, provide: any) {
    const pop = this.dialog.open(ProvidepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: username,
        provide: provide,
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
