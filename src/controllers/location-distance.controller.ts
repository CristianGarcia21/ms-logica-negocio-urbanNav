import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Location,
  Distance,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationDistanceController {
  constructor(
    @repository(LocationRepository) protected locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/distance', {
    responses: {
      '200': {
        description: 'Location has one Distance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Distance),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Distance>,
  ): Promise<Distance> {
    return this.locationRepository.distance(id).get(filter);
  }

  @post('/locations/{id}/distance', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Distance)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Location.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {
            title: 'NewDistanceInLocation',
            exclude: ['id'],
            optional: ['locationId']
          }),
        },
      },
    }) distance: Omit<Distance, 'id'>,
  ): Promise<Distance> {
    return this.locationRepository.distance(id).create(distance);
  }

  @patch('/locations/{id}/distance', {
    responses: {
      '200': {
        description: 'Location.Distance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distance, {partial: true}),
        },
      },
    })
    distance: Partial<Distance>,
    @param.query.object('where', getWhereSchemaFor(Distance)) where?: Where<Distance>,
  ): Promise<Count> {
    return this.locationRepository.distance(id).patch(distance, where);
  }

  @del('/locations/{id}/distance', {
    responses: {
      '200': {
        description: 'Location.Distance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Distance)) where?: Where<Distance>,
  ): Promise<Count> {
    return this.locationRepository.distance(id).delete(where);
  }
}
