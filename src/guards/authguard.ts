import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken'); // Kiểm tra token
    if (token) {
      return true; // Người dùng đã xác thực
    } else {
      this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
      return false;
    }
  }
}
