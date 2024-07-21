import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from '../../../shared/modules/zorro/zorro.module';
import {
  IBusinessProfile,
} from '../../../shared/interfaces/business-profile.interface';
import {
  BusinessProfileTypeEnum,
} from '../../../shared/enums/business-profile-type.enum';
import {
  BusinessProfileTypePipe,
} from '../../../shared/pipe/business-profile-type.pipe';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  BusinessProfileModalComponent,
} from './components/business-profile-modal/business-profile-modal.component';
import { select, Store } from '@ngrx/store';
import {
  deleteBusinessProfileRequest,
  getListRequest,
} from '../../../shared/ngrx/business-profiles/business-profile.actions';
import {
  businessProfileLoading,
  getAllBusinessProfiles,
} from '../../../shared/ngrx/business-profiles/business-profile.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-profiles',
  standalone: true,
  imports: [
    CommonModule,
    ZorroModule,
    BusinessProfileTypePipe,
  ],
  templateUrl: './business-profiles.component.html',
  styleUrl: './business-profiles.component.scss',
})
export class BusinessProfilesComponent implements OnInit {
  businessProfiles$: Observable<IBusinessProfile[]>;
  loading$: Observable<boolean>;

  constructor(
    private nzModalService: NzModalService,
    private store: Store,
  ) {
    this.businessProfiles$ = this.store.pipe(select(getAllBusinessProfiles));
    this.loading$ = this.store.pipe(select(businessProfileLoading));
  }

  ngOnInit() {
    this.store.dispatch(getListRequest());
  }

  createBusinessProfile(): void {
    this.nzModalService.create({
      nzTitle: 'Create a new business profile',
      nzOkText: 'Create',
      nzFooter: null,
      nzContent: BusinessProfileModalComponent,
    });
  }

  delete(businessProfile: IBusinessProfile) {
    this.store.dispatch(
      deleteBusinessProfileRequest({businessProfileId: businessProfile.id}));
  }
}
