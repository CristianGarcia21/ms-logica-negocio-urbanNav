import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Travel,
  Request,
} from '../models';
import {TravelRepository} from '../repositories';

export class TravelRequestController {
  constructor(
    @repository(TravelRepository)
    public travelRepository: TravelRepository,
  ) { }

  @get('/travels/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to Travel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof Travel.prototype.id,
  ): Promise<Request> {
    return this.travelRepository.request(id);
  }
}
