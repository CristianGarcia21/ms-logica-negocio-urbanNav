import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Driver} from './driver.model';
import {Passenger} from './passenger.model';

@model()
export class Request extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  requestDate: string;

  @property({
    type: 'string',
    required: true,
  })
  pickup: string;

  @property({
    type: 'string',
    required: true,
  })
  destination: string;

  @belongsTo(() => Driver)
  driverId: number;

  @belongsTo(() => Passenger)
  passengerId: number;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
