import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Location,
  Request,
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationRequestController {
  constructor(
    @repository(LocationRepository)
    public locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to Location',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof Location.prototype.id,
  ): Promise<Request> {
    return this.locationRepository.request(id);
  }
}
