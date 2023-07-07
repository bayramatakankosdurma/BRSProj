import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/user';
  needUserUrl = 'http://localhost:3000/needUser';
  provideUserUrl = 'http://localhost:3000/provideUser';

  GetAll() {
    return this.http.get(this.apiUrl);
  }
  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  GetByCode(code: any) {
    return this.http.get(this.apiUrl + '/' + code);
  }
  //kullanıcı oluşturma
  ProceedRegister(input: any) {
    return this.http.post(this.apiUrl, input);
  }
  //kullanıcı güncelleme
  UpdateUser(code: any, input: any) {
    return this.http.put(this.apiUrl + '/' + code, input);
  }

  getHomeNeedById(id: any) {
    return this.http.get('http://localhost:3000/homeNeed' + '/' + id);
  }
  getFoodNeedById(id: any) {
    return this.http.get('http://localhost:3000/foodNeed' + '/' + id);
  }
  getMoneyNeedById(id: any) {
    return this.http.get('http://localhost:3000/moneyNeed' + '/' + id);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  GetUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
  GetNeedUsers() {
    return this.http.get(this.needUserUrl);
  }
  GetNeedUserById(id: any) {
    return this.http.get(this.needUserUrl + '/' + id);
  }
  GetProvideUserById(id: any) {
    return this.http.get(this.provideUserUrl + '/' + id);
  }
  PostNeed(input: any) {
    return this.http.post(this.needUserUrl, input);
  }

  GetProvideUsers() {
    return this.http.get(this.provideUserUrl);
  }
  PostProvide(input: any) {
    return this.http.post(this.provideUserUrl, input);
  }
  getHomeProvide() {
    return this.http.get('http://localhost:3000/homeProvide');
  }
  getHomeNeed() {
    return this.http.get('http://localhost:3000/homeNeed');
  }
  getFoodProvide() {
    return this.http.get('http://localhost:3000/foodProvide');
  }
  getFoodNeed() {
    return this.http.get('http://localhost:3000/foodNeed');
  }
  getMoneyProvide() {
    return this.http.get('http://localhost:3000/moneyProvide');
  }
  getMoneyNeed() {
    return this.http.get('http://localhost:3000/moneyNeed');
  }
  updateHomeNeed(input: any) {
    return this.http.post('http://localhost:3000/homeNeed', input);
  }
  updateHomeProvide(input: any) {
    return this.http.post('http://localhost:3000/homeProvide', input);
  }
  updateFoodNeed(input: any) {
    return this.http.post('http://localhost:3000/foodNeed', input);
  }
  updateFoodProvide(input: any) {
    return this.http.post('http://localhost:3000/foodProvide', input);
  }
  updateMoneyNeed(input: any) {
    return this.http.post('http://localhost:3000/moneyNeed', input);
  }
  updateMoneyProvide(input: any) {
    return this.http.post('http://localhost:3000/moneyProvide', input);
  }
  updateNeedUserById(id: any, input: any) {
    return this.http.put(this.needUserUrl + '/' + id, input);
  }
  updateProvideUserById(id: any, input: any) {
    return this.http.put(this.provideUserUrl + '/' + id, input);
  }
  updateHomeNeedById(id: any, input: any) {
    return this.http.put('http://localhost:3000/homeNeed' + '/' + id, input);
  }
  updateHomeProvideById(id: any, input: any) {
    return this.http.put('http://localhost:3000/homeProvide' + '/' + id, input);
  }
  updateFoodNeedById(id: any, input: any) {
    return this.http.put('http://localhost:3000/foodNeed' + '/' + id, input);
  }
  updateFoodProvideById(id: any, input: any) {
    return this.http.put('http://localhost:3000/foodProvide' + '/' + id, input);
  }
  updateMoneyNeedById(id: any, input: any) {
    return this.http.put('http://localhost:3000/moneyNeed' + '/' + id, input);
  }
  updateMoneyProvideById(id: any, input: any) {
    return this.http.put(
      'http://localhost:3000/moneyProvide' + '/' + id,
      input
    );
  }
  GetHomeNeedById(id: any) {
    return this.http.get('http://localhost:3000/homeNeed' + '/' + id);
  }
  GetHomeProvideById(id: any) {
    return this.http.get('http://localhost:3000/homeProvide' + '/' + id);
  }
  GetFoodNeedById(id: any) {
    return this.http.get('http://localhost:3000/foodNeed' + '/' + id);
  }
  GetFoodProvideById(id: any) {
    return this.http.get('http://localhost:3000/foodProvide' + '/' + id);
  }
  GetMoneyNeedById(id: any) {
    return this.http.get('http://localhost:3000/moneyNeed' + '/' + id);
  }
  GetMoneyProvideById(id: any) {
    return this.http.get('http://localhost:3000/moneyProvide' + '/' + id);
  }
}
