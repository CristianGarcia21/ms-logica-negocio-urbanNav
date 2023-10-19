import {Entity, model, property} from '@loopback/repository';

@model()
export class Record extends Entity {
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
  travelRoute: string;

  @property({
    type: 'string',
    required: true,
  })
  driverReview: string;


  constructor(data?: Partial<Record>) {
    super(data);
  }
}

export interface RecordRelations {
  // describe navigational properties here
}

export type RecordWithRelations = Record & RecordRelations;
