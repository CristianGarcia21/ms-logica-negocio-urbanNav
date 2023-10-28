import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PayType,
  PayMethod,
} from '../models';
import {PayTypeRepository} from '../repositories';

export class PayTypePayMethodController {
  constructor(
    @repository(PayTypeRepository)
    public payTypeRepository: PayTypeRepository,
  ) { }

  @get('/pay-types/{id}/pay-method', {
    responses: {
      '200': {
        description: 'PayMethod belonging to PayType',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PayMethod),
          },
        },
      },
    },
  })
  async getPayMethod(
    @param.path.number('id') id: typeof PayType.prototype.id,
  ): Promise<PayMethod> {
    return this.payTypeRepository.payMethod(id);
  }
}
