import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Request} from './request.model';

@model()
export class Status extends Entity {
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
  stateRequest: string;

  @belongsTo(() => Request)
  requestId: number;

  constructor(data?: Partial<Status>) {
    super(data);
  }
}

export interface StatusRelations {
  // describe navigational properties here
}

export type StatusWithRelations = Status & StatusRelations;
