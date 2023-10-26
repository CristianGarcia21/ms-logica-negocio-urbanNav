import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Car,
  Driver,
} from '../models';
import {CarRepository} from '../repositories';

export class CarDriverController {
  constructor(
    @repository(CarRepository)
    public carRepository: CarRepository,
  ) { }

  @get('/cars/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to Car',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Driver),
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof Car.prototype.id,
  ): Promise<Driver> {
    return this.carRepository.driver(id);
  }
}
