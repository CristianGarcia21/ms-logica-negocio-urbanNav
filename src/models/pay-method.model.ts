import {
  Entity,
  belongsTo,
  hasMany,
  hasOne,
  model,
  property,
} from '@loopback/repository';
import {Passenger} from './passenger.model';
import {PayType} from './pay-type.model';
import {Travel} from './travel.model';

@model({
  settings: {
    foreignKeys: {
      fk_paymethod_passengerId: {
        name: 'fk_paymethod_passengerId',
        entity: 'Passenger',
        entityKey: 'id',
        foreignKey: 'passengerId',
      },
    },
  },
})
export class PayMethod extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
  })
  cardNumber?: string;

  @belongsTo(() => Passenger)
  passengerId: number;

  @hasOne(() => PayType)
  payType: PayType;

  @hasMany(() => Travel)
  travels: Travel[];

  constructor(data?: Partial<PayMethod>) {
    super(data);
  }
}

export interface PayMethodRelations {
  // describe navigational properties here
}

export type PayMethodWithRelations = PayMethod & PayMethodRelations;
