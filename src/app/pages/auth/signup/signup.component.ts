import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ZorroModule } from '../../../shared/modules/zorro/zorro.module';
import { signupRequest } from '../../../shared/ngrx/auth/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ZorroModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  submitForm() {
    this.store.dispatch(signupRequest(this.form.getRawValue()))
  }

  validateConfirmPassword() {
    setTimeout(() => this.form.controls['confirm']?.updateValueAndValidity());
  }

  private initForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6),]],
      confirm: ['', [this.confirmValidator]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    })
  }

  private confirmValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.form.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
