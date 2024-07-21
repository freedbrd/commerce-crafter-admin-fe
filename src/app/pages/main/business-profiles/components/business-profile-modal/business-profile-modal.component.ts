import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../../../shared/modules/zorro/zorro.module';
import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BusinessProfileTypeEnum,
} from '../../../../../shared/enums/business-profile-type.enum';
import { TypeInfoPipe } from './type-info.pipe';
import {
  IBusinessProfile,
} from '../../../../../shared/interfaces/business-profile.interface';
import { ActionsSubject, select, Store } from '@ngrx/store';
import {
  createBusinessProfileRequest, createBusinessProfileSuccess,
} from '../../../../../shared/ngrx/business-profiles/business-profile.actions';
import {
  businessProfileLoading,
} from '../../../../../shared/ngrx/business-profiles/business-profile.selectors';
import { filter, Observable, Subject, take, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-business-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    FormsModule,
    ReactiveFormsModule,
    TypeInfoPipe],
  templateUrl: './business-profile-modal.component.html',
  styleUrl: './business-profile-modal.component.scss',
})
export class BusinessProfileModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading$: Observable<boolean>;

  options = [
    {
      lable: 'Retail',
      value: BusinessProfileTypeEnum.RETAIL,
    },
    {
      lable: 'Service',
      value: BusinessProfileTypeEnum.SERVICE,
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private nzModalRef: NzModalRef,
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions,
  ) {
  }

  ngOnInit() {
    this.initForm();

    this.actions$.pipe(
      ofType(createBusinessProfileSuccess),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.close();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    const businessProfile = this.form.getRawValue() as IBusinessProfile;
    this.store.dispatch(createBusinessProfileRequest({businessProfile}));
  }

  close() {
    this.nzModalRef.close();
  }

  private initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      type: [BusinessProfileTypeEnum.RETAIL, [Validators.required]],
    });
  }
}
