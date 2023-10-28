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
  Request,
  Location,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestLocationController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/location', {
    responses: {
      '200': {
        description: 'Request has one Location',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Location),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Location>,
  ): Promise<Location> {
    return this.requestRepository.location(id).get(filter);
  }

  @post('/requests/{id}/location', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Request.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocationInRequest',
            exclude: ['id'],
            optional: ['requestId']
          }),
        },
      },
    }) location: Omit<Location, 'id'>,
  ): Promise<Location> {
    return this.requestRepository.location(id).create(location);
  }

  @patch('/requests/{id}/location', {
    responses: {
      '200': {
        description: 'Request.Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Partial<Location>,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.requestRepository.location(id).patch(location, where);
  }

  @del('/requests/{id}/location', {
    responses: {
      '200': {
        description: 'Request.Location DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.requestRepository.location(id).delete(where);
  }
}
