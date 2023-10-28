import {Entity, model, property, belongsTo} from '@loopback/repository';
import {PayMethod} from './pay-method.model';

@model()
export class PayType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @belongsTo(() => PayMethod)
  payMethodId: number;

  constructor(data?: Partial<PayType>) {
    super(data);
  }
}

export interface PayTypeRelations {
  // describe navigational properties here
}

export type PayTypeWithRelations = PayType & PayTypeRelations;
