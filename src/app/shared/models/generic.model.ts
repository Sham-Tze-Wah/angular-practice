import { Base } from './base.model';

export interface GenericModel extends Base {
  name?: string;
  description?: string;
  code?: string;
  disabled?: boolean;
}

export interface EnumModel {
  key?: string;
  text?: string;
}