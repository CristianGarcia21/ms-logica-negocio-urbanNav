import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Driver} from './driver.model';

@model({
  settings: {
    foreignKeys: {
      fk_car_driverId: {
        name: 'fk_car_driverId',
        entity: 'Driver',
        entityKey: 'id',
        foreignKey: 'driverId',
      },
    },
  },
})
export class Car extends Entity {
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
  seats: number;

  @property({
    type: 'string',
    required: true,
  })
  plate: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @belongsTo(() => Driver)
  driverId: number;

  constructor(data?: Partial<Car>) {
    super(data);
  }
}

export interface CarRelations {
  // describe navigational properties here
}

export type CarWithRelations = Car & CarRelations;
