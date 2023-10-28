import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Location} from './location.model';

@model()
export class Distance extends Entity {
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
  origin: string;

  @property({
    type: 'string',
    required: true,
  })
  finish: string;

  @property({
    type: 'number',
    required: true,
  })
  meters: number;

  @belongsTo(() => Location)
  locationId: number;

  constructor(data?: Partial<Distance>) {
    super(data);
  }
}

export interface DistanceRelations {
  // describe navigational properties here
}

export type DistanceWithRelations = Distance & DistanceRelations;
