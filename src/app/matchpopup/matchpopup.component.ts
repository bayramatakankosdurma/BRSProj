import { Component, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matchpopup',
  templateUrl: './matchpopup.component.html',
  styleUrls: ['./matchpopup.component.css'],
})
export class MatchpopupComponent {
  sessionUsername: any;
  matchCount: any;
  homeProvide: any;
  moneyProvide: any;
  foodProvide: any;
  homeNeed: any;
  foodNeed: any;
  moneyNeed: any;
  editdata: any;
  editdata2: any;
  constructor(
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<MatchpopupComponent>,
    private builder: FormBuilder
  ) {
    this.sessionUsername = sessionStorage['username'];

    this.service.GetNeedUserById(this.data.id).subscribe((res) => {
      this.editdata = res;
      this.formNeed.setValue({
        username: this.editdata.username,
        id: this.editdata.id,
        need: this.editdata.need,
        isMatched: this.editdata.isMatched,
      });
    });
  }

  formNeed = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    need: this.builder.control(''),
    isMatched: this.builder.control(true),
  });
  formProvide = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    provide: this.builder.control(''),
    isMatched: this.builder.control(true),
  });
  homeNeedForm = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    people: this.builder.control(''),
    time: this.builder.control(''),
    otherPeople: this.builder.control(''),
    isMatched: this.builder.control(true),
  });
  homeProvideForm = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    people: this.builder.control(''),
    time: this.builder.control(''),
    otherPeople: this.builder.control(''),
    isMatched: this.builder.control(true),
  });
  foodNeedForm = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    people: this.builder.control(''),
    time: this.builder.control(''),
    eatAnything: this.builder.control(true),
    isMatched: this.builder.control(true),
  });
  foodProvideForm = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    people: this.builder.control(''),
    time: this.builder.control(''),
    eatAnything: this.builder.control(true),
    isMatched: this.builder.control(true),
  });
  moneyNeedForm = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    people: this.builder.control(''),
    time: this.builder.control(''),
    quantity: this.builder.control(''),
    isMatched: this.builder.control(true),
  });
  moneyProvideForm = this.builder.group({
    username: this.builder.control(''),
    id: this.builder.control(''),
    people: this.builder.control(''),
    time: this.builder.control(''),
    quantity: this.builder.control(''),
    isMatched: this.builder.control(true),
  });

  homeWeeks = ['0-1', '1-3', '3-5', '5+']; //food için
  homePeople = ['1-3', '3-5', '5-10', '10+']; //food için
  moneyWeeks = ['0-1', '1-3', '3-5', '5+'];
  moneyPeople = ['1-3', '3-5', '5-10', '10+'];
  moneyQuantity = ['1000-3000TL', '3000-5000TL', '5000-10000TL', '10000TL+'];
  compareMatch = 0;
  compareId = '';
  compareProvideId = '';

  async ngOnInit() {
    this.matchCount = 0;
    if (this.data.need == 'home') {
      let count1 = 0;
      let count2 = 0;

      this.homeProvide = await this.service.getHomeProvide().toPromise();
      this.homeNeed = await this.service
        .getHomeNeedById(this.data.id)
        .toPromise();

      for (let home of this.homeProvide) {
        if (this.homeProvide.isMatched == true) {
          continue;
        } else {
          this.matchCount = 0;
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.homeNeed.time == this.homeWeeks[j]) {
              count1 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (home.time == this.homeWeeks[i]) {
              if (i >= count1) {
                this.matchCount += 1;
              }
            }
          }
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.homeNeed.people == this.homePeople[j]) {
              count2 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (home.people == this.homePeople[i]) {
              if (i >= count2) {
                this.matchCount += 1;
              }
            }
          }
          if (home.otherPeople == this.homeNeed.otherPeople) {
            this.matchCount += 1;
          }
          if (this.matchCount == 3) {
            this.setValues(this.homeNeed.id, home.id);
            break;
          } else {
            this.matchCompare(this.homeNeed.id, this.matchCount, home.id);
          }
        }
      }
    } else if (this.data.need == 'food') {
      let count3 = 0;
      let count4 = 0;

      this.foodProvide = await this.service.getFoodProvide().toPromise();
      this.foodNeed = await this.service
        .getFoodNeedById(this.data.id)
        .toPromise();
      for (let food of this.foodProvide) {
        if (this.foodProvide.isMatched == true) {
          continue;
        } else {
          this.matchCount = 0;
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.foodNeed.time == this.homeWeeks[j]) {
              count3 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (food.time == this.homeWeeks[i]) {
              if (i >= count3) {
                this.matchCount += 1;
              }
            }
          }
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.foodNeed.people == this.homePeople[j]) {
              count4 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (food.people == this.homePeople[i]) {
              if (i >= count4) {
                this.matchCount += 1;
              }
            }
          }
          if (food.eatAnything == this.foodNeed.eatAnything) {
            this.matchCount += 1;
          }
          if (this.matchCount == 3) {
            this.setValues(this.foodNeed.id, food.id);
            break;
          } else {
            this.matchCompare(this.foodNeed.id, this.matchCount, food.id);
          }
        }
      }
    } else {
      let count5 = 0;
      let count6 = 0;
      let count7 = 0;

      this.moneyProvide = await this.service.getMoneyProvide().toPromise();
      this.moneyNeed = await this.service
        .getMoneyNeedById(this.data.id)
        .toPromise();
      for (let money of this.moneyProvide) {
        if (this.moneyProvide.isMatched == true) {
          continue;
        } else {
          this.matchCount = 0;
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.moneyNeed.time == this.homeWeeks[j]) {
              count5 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (money.time == this.homeWeeks[i]) {
              if (i >= count5) {
                this.matchCount += 1;
              }
            }
          }
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.moneyNeed.people == this.homePeople[j]) {
              count6 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (money.people == this.homePeople[i]) {
              if (i >= count6) {
                this.matchCount += 1;
              }
            }
          }
          for (let j = 0; j < this.homePeople.length; j++) {
            if (this.moneyNeed.quantity == this.moneyQuantity[j]) {
              count7 = j;
            }
          }
          for (let i = 0; i < this.homePeople.length; i++) {
            if (money.quantity == this.moneyQuantity[i]) {
              if (i >= count7) {
                this.matchCount += 1;
              }
            }
          }
          if (this.matchCount == 3) {
            this.setValues(this.moneyNeed.id, money.id);
            break;
          } else {
            this.matchCompare(this.moneyNeed.id, this.matchCount, money.id);
          }
        }
      }
    }
  }

  setValues(needId: any, provideId: any) {
    this.compareId = needId;
    this.compareProvideId = provideId;
    this.service.GetProvideUserById(this.compareProvideId).subscribe((res) => {
      this.editdata = res;
      this.formProvide.setValue({
        username: this.editdata.username,
        id: this.editdata.id,
        provide: this.editdata.provide,
        isMatched: this.editdata.isMatched,
      });
    });

    if (this.data.need == 'home') {
      this.service.getHomeNeedById(this.compareId).subscribe((res) => {
        this.editdata = res;
        this.homeNeedForm.setValue({
          username: this.editdata.username,
          id: this.editdata.id,
          people: this.editdata.people,
          time: this.editdata.time,
          otherPeople: this.editdata.otherPeople,
          isMatched: this.editdata.isMatched,
        });
      });
      this.service
        .GetHomeProvideById(this.compareProvideId)
        .subscribe((res) => {
          this.editdata2 = res;
          this.homeProvideForm.setValue({
            username: this.editdata2.username,
            id: this.editdata2.id,
            people: this.editdata2.people,
            time: this.editdata2.time,
            otherPeople: this.editdata2.otherPeople,
            isMatched: this.editdata2.isMatched,
          });
        });
    } else if (this.data.need == 'food') {
      this.service.getFoodNeedById(this.compareId).subscribe((res) => {
        this.editdata = res;
        this.foodNeedForm.setValue({
          username: this.editdata.username,
          id: this.editdata.id,
          people: this.editdata.people,
          time: this.editdata.time,
          eatAnything: this.editdata.eatAnything,
          isMatched: this.editdata.isMatched,
        });
      });
      this.service
        .GetFoodProvideById(this.compareProvideId)
        .subscribe((res) => {
          this.editdata2 = res;
          this.foodProvideForm.setValue({
            username: this.editdata2.username,
            id: this.editdata2.id,
            people: this.editdata2.people,
            time: this.editdata2.time,
            eatAnything: this.editdata2.eatAnything,
            isMatched: this.editdata2.isMatched,
          });
        });
    } else {
      this.service.getMoneyNeedById(this.compareId).subscribe((res) => {
        this.editdata = res;
        this.moneyNeedForm.setValue({
          username: this.editdata.username,
          id: this.editdata.id,
          people: this.editdata.people,
          time: this.editdata.time,
          quantity: this.editdata.quantity,
          isMatched: this.editdata.isMatched,
        });
      });
      this.service
        .GetMoneyProvideById(this.compareProvideId)
        .subscribe((res) => {
          this.editdata2 = res;
          this.moneyProvideForm.setValue({
            username: this.editdata.username,
            id: this.editdata2.id,
            people: this.editdata2.people,
            time: this.editdata2.time,
            quantity: this.editdata2.quantity,
            isMatched: this.editdata2.isMatched,
          });
        });
    }
  }

  matchCompare(needId: any, matchCount: any, provideId: any) {
    if (this.compareMatch > matchCount) {
    } else {
      this.compareMatch = matchCount;
      this.compareId = needId;
      this.compareProvideId = provideId;
    }
    this.service.GetProvideUserById(this.compareProvideId).subscribe((res) => {
      this.editdata = res;
      this.formProvide.setValue({
        username: this.editdata.username,
        id: this.editdata.id,
        provide: this.editdata.provide,
        isMatched: this.editdata.isMatched,
      });
    });
    if (this.data.need == 'home') {
      this.service.getHomeNeedById(this.compareId).subscribe((res) => {
        this.editdata = res;
        this.homeNeedForm.setValue({
          username: this.editdata.username,
          id: this.editdata.id,
          people: this.editdata.people,
          time: this.editdata.time,
          otherPeople: this.editdata.otherPeople,
          isMatched: this.editdata.isMatched,
        });
      });
      this.service
        .GetHomeProvideById(this.compareProvideId)
        .subscribe((res) => {
          this.editdata2 = res;
          this.homeProvideForm.setValue({
            username: this.editdata2.username,
            id: this.editdata2.id,
            people: this.editdata2.people,
            time: this.editdata2.time,
            otherPeople: this.editdata2.otherPeople,
            isMatched: this.editdata2.isMatched,
          });
        });
    } else if (this.data.need == 'food') {
      this.service.getFoodNeedById(this.compareId).subscribe((res) => {
        this.editdata = res;
        this.foodNeedForm.setValue({
          username: this.editdata.username,
          id: this.editdata.id,
          people: this.editdata.people,
          time: this.editdata.time,
          eatAnything: this.editdata.eatAnything,
          isMatched: this.editdata.isMatched,
        });
      });
      this.service
        .GetFoodProvideById(this.compareProvideId)
        .subscribe((res) => {
          this.editdata2 = res;
          this.foodProvideForm.setValue({
            username: this.editdata.username,
            id: this.editdata2.id,
            people: this.editdata2.people,
            time: this.editdata2.time,
            eatAnything: this.editdata2.eatAnything,
            isMatched: this.editdata2.isMatched,
          });
        });
    } else {
      this.service.getMoneyNeedById(this.compareId).subscribe((res) => {
        this.editdata = res;
        this.moneyNeedForm.setValue({
          username: this.editdata.username,
          id: this.editdata.id,
          people: this.editdata.people,
          time: this.editdata.time,
          quantity: this.editdata.quantity,
          isMatched: this.editdata.isMatched,
        });
      });
      this.service
        .GetMoneyProvideById(this.compareProvideId)
        .subscribe((res) => {
          this.editdata2 = res;
          this.moneyProvideForm.setValue({
            username: this.editdata.username,
            id: this.editdata2.id,
            people: this.editdata2.people,
            time: this.editdata2.time,
            quantity: this.editdata2.quantity,
            isMatched: this.editdata2.isMatched,
          });
        });
    }
  }
  clicked() {
    if (this.data.need == 'home') {
      this.homeNeedForm.value.isMatched = true;
      this.homeProvideForm.value.isMatched = true;
      this.formProvide.value.isMatched = true;
      this.service
        .updateNeedUserById(this.formNeed.value.id, this.formNeed.value)
        .subscribe();
      this.service
        .updateProvideUserById(
          this.formProvide.value.id,
          this.formProvide.value
        )
        .subscribe();
      this.service
        .updateHomeNeedById(this.homeNeedForm.value.id, this.homeNeedForm.value)
        .subscribe();
      this.service
        .updateHomeProvideById(
          this.homeProvideForm.value.id,
          this.homeProvideForm.value
        )
        .subscribe((res) => {
          this.toastr.success('Matched Successfully');
          this.dialog.close();
        });
    } else if (this.data.need == 'food') {
      this.foodNeedForm.value.isMatched = true;
      this.foodProvideForm.value.isMatched = true;
      this.formProvide.value.isMatched = true;
      this.service
        .updateNeedUserById(this.formNeed.value.id, this.formNeed.value)
        .subscribe();
      this.service
        .updateProvideUserById(
          this.formProvide.value.id,
          this.formProvide.value
        )
        .subscribe();

      this.service
        .updateFoodNeedById(this.foodNeedForm.value.id, this.foodNeedForm.value)
        .subscribe();
      this.service
        .updateFoodProvideById(
          this.foodProvideForm.value.id,
          this.foodProvideForm.value
        )
        .subscribe((res) => {
          this.toastr.success('Matched Successfully');
          this.dialog.close();
        });
    } else {
      this.moneyNeedForm.value.isMatched = true;
      this.moneyProvideForm.value.isMatched = true;
      this.formProvide.value.isMatched = true;
      this.service
        .updateNeedUserById(this.formNeed.value.id, this.formNeed.value)
        .subscribe();
      this.service
        .updateProvideUserById(
          this.formProvide.value.id,
          this.formProvide.value
        )
        .subscribe();

      this.service
        .updateMoneyNeedById(
          this.moneyNeedForm.value.id,
          this.moneyNeedForm.value
        )
        .subscribe();
      this.service
        .updateMoneyProvideById(
          this.moneyProvideForm.value.id,
          this.moneyProvideForm.value
        )
        .subscribe((res) => {
          this.toastr.success('Matched Successfully');
          this.dialog.close();
        });
    }
  }
}
