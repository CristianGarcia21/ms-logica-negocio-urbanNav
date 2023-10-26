import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Request,
  Driver,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestDriverController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to Request',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof Request.prototype.id,
  ): Promise<Driver> {
    return this.requestRepository.driver(id);
  }
}
