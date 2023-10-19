import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
