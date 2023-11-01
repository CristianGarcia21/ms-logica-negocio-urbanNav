import {Entity, model, property, belongsTo} from '@loopback/repository';
import {PayMethod} from './pay-method.model';
import {Request} from './request.model';

@model({
  settings:{
    foreignKeys: {
      fk_travel_requestId: {
        name: 'fk_travel_requestId',
        entity: 'Request',
        entityKey: 'id',
        foreignKey: 'requestId',
      },
      fk_travel_payMethodId: {
        name: 'fk_travel_payMethodId',
        entity: 'PayMethod',
        entityKey: 'id',
        foreignKey: 'payMethodId',
      },
    },
  }
})
export class Travel extends Entity {
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
  totalPaid: string;

  @property({
    type: 'string',
    required: true,
  })
  rate: string;

  @property({
    type: 'date',
    required: true,
  })
  rateDate: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @belongsTo(() => PayMethod)
  payMethodId: number;

  @belongsTo(() => Request)
  requestId: number;

  constructor(data?: Partial<Travel>) {
    super(data);
  }
}

export interface TravelRelations {
  // describe navigational properties here
}

export type TravelWithRelations = Travel & TravelRelations;
