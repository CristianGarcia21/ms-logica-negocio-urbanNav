import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Passenger} from './passenger.model';

@model()
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
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  cardNumber?: number;

  @belongsTo(() => Passenger)
  passengerId: number;

  constructor(data?: Partial<PayMethod>) {
    super(data);
  }
}

export interface PayMethodRelations {
  // describe navigational properties here
}

export type PayMethodWithRelations = PayMethod & PayMethodRelations;
