import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Request} from './request.model';
import {Distance} from './distance.model';

@model({
  settings:{
    foreignKeys: {
      fk_requestId: {
        name: 'fk_location_requestId',
        entity: 'request',
        entityKey: 'id',
        foreignKey: 'requestId',
      },
    },
  }
})
export class Location extends Entity {
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
  latitude: string;

  @property({
    type: 'string',
    required: true,
  })
  longitude: string;

  @property({
    type: 'string',
    required: true,
  })
  pointChar: string;

  @belongsTo(() => Request)
  requestId: number;

  @hasOne(() => Distance)
  distance: Distance;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
