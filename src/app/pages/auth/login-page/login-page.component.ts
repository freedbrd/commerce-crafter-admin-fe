import { Component, OnInit } from '@angular/core';
import { ZorroModule } from '../../../shared/modules/zorro/zorro.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../../shared/ngrx/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ZorroModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  submitForm() {
    const {email, password} = this.form.getRawValue();

    this.store.dispatch(loginRequest({
      email,
      password
    }))
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true],
    })
  }
}
