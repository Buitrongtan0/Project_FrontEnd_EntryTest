import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  passwordHidden: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get username() {
    return this.signUpForm.get('username') as FormGroup;
  }
  get password() {
    return this.signUpForm.get('password');
  }
  handleStrim(name: string) {
    this.signUpForm.get(name)?.setValue(name.trim());
  }
  handleSubmit() {
    if (!this.signUpForm.valid) return;
    let signUpModel = { ...this.signUpForm.value };
    console.log(signUpModel);

    this.userService.getSignUpUsers(signUpModel).subscribe((res:any) => {
      if (res) {
        this.router.navigate(['login']);
      }
    });

  }

  togglePasswordHidden() {
    this.passwordHidden = !this.passwordHidden;
  }

  isPasswordHidden(): string {
    return this.passwordHidden ? 'password' : 'text';
  }

  isPasswordHiddenIcon(): string {
    return this.passwordHidden ? 'fa-eye-slash' : 'fa-eye text-primary';
  }
}
