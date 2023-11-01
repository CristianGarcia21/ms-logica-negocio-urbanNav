import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Driver} from './driver.model';
import {Passenger} from './passenger.model';
import {Status} from './status.model';
import {Location} from './location.model';
import {Travel} from './travel.model';

@model({
  settings: {
    foreignKeys: {
      fk_request_driverId: {
        name: 'fk_request_driverId',
        entity: 'Driver',
        entityKey: 'id',
        foreignKey: 'driverId',
      },
      fk_request_passengerId: {
        name: 'fk_request_passengerId',
        entity: 'Passenger',
        entityKey: 'id',
        foreignKey: 'passengerId',
      },
    },
  }
})
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

  @hasOne(() => Status)
  status: Status;

  @hasOne(() => Location)
  location: Location;

  @hasOne(() => Travel)
  travel: Travel;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
