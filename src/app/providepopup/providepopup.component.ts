import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-providepopup',
  templateUrl: './providepopup.component.html',
  styleUrls: ['./providepopup.component.css'],
})
export class ProvidepopupComponent {
  editdata: any;
  sessionUsername: any;
  selectionHome = false;
  selectionFood = false;
  selectionMoney = false;
  homeForm!: FormGroup;
  moneyForm!: FormGroup;
  foodForm!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<ProvidepopupComponent>
  ) {
    this.sessionUsername = sessionStorage['username'];
  }
  homeWeeks = ['0-1', '1-3', '3-5', '5+'];
  homePeople = ['1-3', '3-5', '5-10', '10+'];
  moneyWeeks = ['0-1', '1-3', '3-5', '5+'];
  moneyPeople = ['1-3', '3-5', '5-10', '10+'];
  moneyQuantity = ['1000-3000TL', '3000-5000TL', '5000-10000TL', '10000TL+'];

  ngOnInit(): void {
    if (this.data.provide == 'home') {
      this.selectionHome = true;
      this.selectionFood = false;
      this.selectionMoney = false;
      this.homeForm = this.builder.group({
        homeForm1: this.builder.group({
          username: this.builder.control(''),
          id: this.builder.control(''),
          provide: this.builder.control(''),
          isMatched: this.builder.control(false),
        }),
        homeForm2: this.builder.group({
          username: this.builder.control(''),
          id: this.builder.control(''),
          people: this.builder.control('', Validators.required),
          time: this.builder.control('', Validators.required),
          otherPeople: this.builder.control('', Validators.required),
          isMatched: this.builder.control(false),
        }),
      });
      if (this.data.username != null && this.data.username != '') {
        this.service.GetByCode(this.data.usercode).subscribe((res) => {
          this.editdata = res;
          this.homeForm.setValue({
            username: this.editdata.username,
            id: this.editdata.id,
            provide: this.editdata.provide,
            isMatched: this.editdata.isMatched,
          });
        });
      }
    } else if (this.data.provide == 'money') {
      this.selectionHome = false;
      this.selectionFood = false;
      this.selectionMoney = true;
      this.moneyForm = this.builder.group({
        moneyForm1: this.builder.group({
          username: this.builder.control(''),
          id: this.builder.control(''),
          provide: this.builder.control(''),
          isMatched: this.builder.control(false),
        }),
        moneyForm2: this.builder.group({
          username: this.builder.control(''),
          id: this.builder.control(''),
          people: this.builder.control('', Validators.required),
          time: this.builder.control('', Validators.required),
          quantity: this.builder.control('', Validators.required),
          isMatched: this.builder.control(false),
        }),
      });
      if (this.data.username != null && this.data.username != '') {
        this.service.GetByCode(this.data.usercode).subscribe((res) => {
          this.editdata = res;
          this.moneyForm.setValue({
            username: this.editdata.username,
            id: this.editdata.id,
            provide: this.editdata.provide,
            isMatched: this.editdata.isMatched,
          });
        });
      }
    } else {
      this.selectionHome = false;
      this.selectionFood = true;
      this.selectionMoney = false;
      this.foodForm = this.builder.group({
        foodForm1: this.builder.group({
          username: this.builder.control(''),
          id: this.builder.control(''),
          provide: this.builder.control(''),
          isMatched: this.builder.control(false),
        }),
        foodForm2: this.builder.group({
          username: this.builder.control(''),
          id: this.builder.control(''),
          people: this.builder.control('', Validators.required),
          time: this.builder.control('', Validators.required),
          eatAnything: this.builder.control('', Validators.required),
          isMatched: this.builder.control(false),
        }),
      });
      if (this.data.username != null && this.data.username != '') {
        this.service.GetByCode(this.data.usercode).subscribe((res) => {
          this.editdata = res;
          this.foodForm.setValue({
            username: this.editdata.username,
            id: this.editdata.id,
            provide: this.editdata.provide,
            isMatched: this.editdata.isMatched,
          });
        });
      }
    }
  }

  PostHomeProvide() {
    if (this.homeForm.valid) {
      this.homeForm.value.homeForm1.username = sessionStorage['username'];
      this.homeForm.value.homeForm1.isMatched = false;
      this.homeForm.value.homeForm1.provide = 'home';
      this.homeForm.value.homeForm2.username =
        this.homeForm.value.homeForm1.username;
      this.homeForm.value.homeForm2.id = this.homeForm.value.homeForm1.id;
      this.service
        .updateHomeProvide(this.homeForm.value.homeForm2)
        .subscribe((res) => {});
      this.service
        .PostProvide(this.homeForm.value.homeForm1)
        .subscribe((res) => {
          this.toastr.success('Provide Created Successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please select all required areas.', 'Invalid form.');
    }
  }
  PostMoneyProvide() {
    if (this.moneyForm.valid) {
      this.moneyForm.value.moneyForm1.username = sessionStorage['username'];
      this.moneyForm.value.moneyForm1.isMatched = false;
      this.moneyForm.value.moneyForm1.provide = 'money';
      this.moneyForm.value.moneyForm2.username =
        this.moneyForm.value.moneyForm1.username;
      this.moneyForm.value.moneyForm2.id = this.moneyForm.value.moneyForm1.id;
      this.service
        .updateMoneyProvide(this.moneyForm.value.moneyForm2)
        .subscribe((res) => {});
      this.service
        .PostProvide(this.moneyForm.value.moneyForm1)
        .subscribe((res) => {
          this.toastr.success('Provide Created Successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please select all required areas.', 'Invalid form.');
    }
  }
  PostFoodProvide() {
    if (this.foodForm.valid) {
      this.foodForm.value.foodForm1.username = sessionStorage['username'];
      this.foodForm.value.foodForm1.isMatched = false;
      this.foodForm.value.foodForm1.provide = 'food';
      this.foodForm.value.foodForm2.username =
        this.foodForm.value.foodForm1.username;
      this.foodForm.value.foodForm2.id = this.foodForm.value.foodForm1.id;
      this.service
        .updateFoodProvide(this.foodForm.value.foodForm2)
        .subscribe((res) => {});
      this.service
        .PostProvide(this.foodForm.value.foodForm1)
        .subscribe((res) => {
          this.toastr.success('Provide Created Successfully');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please select all required areas.', 'Invalid form.');
    }
  }
}
