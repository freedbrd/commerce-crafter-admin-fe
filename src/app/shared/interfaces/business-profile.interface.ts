import { BusinessProfileTypeEnum } from '../enums/business-profile-type.enum';

export interface IBusinessProfile {
  id: string;
  user_id: string;
  created_at: Date;
  title: string;
  type: BusinessProfileTypeEnum;
  is_active: boolean;
  url: string;
}
