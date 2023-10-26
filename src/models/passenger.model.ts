import {Entity, model, property, hasMany} from '@loopback/repository';
import {Request} from './request.model';
import {PayMethod} from './pay-method.model';

@model()
export class Passenger extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  birthDate: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
    required: true,
  })
  passengerPhoto: string;

  @property({
    type: 'string',
    required: true,
  })
  contactNumber: string;

  @hasMany(() => Request)
  requests: Request[];

  @hasMany(() => PayMethod)
  payMethods: PayMethod[];

  constructor(data?: Partial<Passenger>) {
    super(data);
  }
}

export interface PassengerRelations {
  // describe navigational properties here
}

export type PassengerWithRelations = Passenger & PassengerRelations;
