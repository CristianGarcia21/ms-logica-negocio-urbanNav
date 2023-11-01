import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Request} from './request.model';

@model({
  settings:{
    foreignKeys: {
      fk_requestId: {
        name: 'fk_status_requestId',
        entity: 'request',
        entityKey: 'id',
        foreignKey: 'requestId',
      },
    },
  }
})
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
