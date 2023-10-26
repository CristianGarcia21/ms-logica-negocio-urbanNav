import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Car} from './car.model';
import {Request} from './request.model';

@model()
export class Driver extends Entity {
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
  phone: string;

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
  driverPhoto: string;

  @property({
    type: 'boolean',
    required: true,
  })
  available: boolean;

  @property({
    type: 'string',
  })
  driverComment?: string;

  @hasOne(() => Car)
  car: Car;

  @hasMany(() => Request)
  requests: Request[];

  constructor(data?: Partial<Driver>) {
    super(data);
  }
}

export interface DriverRelations {
  // describe navigational properties here
}

export type DriverWithRelations = Driver & DriverRelations;
