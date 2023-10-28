import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Status,
  Request,
} from '../models';
import {StatusRepository} from '../repositories';

export class StatusRequestController {
  constructor(
    @repository(StatusRepository)
    public statusRepository: StatusRepository,
  ) { }

  @get('/statuses/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to Status',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof Status.prototype.id,
  ): Promise<Request> {
    return this.statusRepository.request(id);
  }
}
