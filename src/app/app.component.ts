import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserService } from './Services/user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnakBarService } from './Services/mat-snak-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-management-system';

  displayedColumns: string[] = ['usercode','department', 'name', 'mobile', 'email', 'dob', 'gender', 'salary',  'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _userService: UserService, private _matSnackBar:MatSnakBarService) { }


  ngOnInit() {
    this.getuserlist();
  }

  getuserlist() {
    this._userService.getuser().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteuser(id: number) {
    console.log(id);
    this._userService.deleteUser(id).subscribe((res: any) => {
      this._matSnackBar.openSnackBar("User Deleted Successfully", "Done");
      this.getuserlist();
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openuserform() {
    const dialogRef = this._dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getuserlist();
      }
    })
  }


  openedituserform(data: any) {
    const dialogRef = this._dialog.open(UserFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getuserlist();
      }
    })
  }





}
