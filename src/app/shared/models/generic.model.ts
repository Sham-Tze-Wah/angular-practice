import { Base } from './base.model';

export interface GenericModel extends Base {
  name?: string;
  description?: string;
  code?: string;
  disabled?: boolean;
  isChecked?: boolean;
}

export interface EnumModel {
  key?: string;
  text?: string;
}