import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Driver, DriverRelations, Car, Request} from '../models';
import {CarRepository} from './car.repository';
import {RequestRepository} from './request.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {

  public readonly car: HasOneRepositoryFactory<Car, typeof Driver.prototype.id>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof Driver.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CarRepository') protected carRepositoryGetter: Getter<CarRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(Driver, dataSource);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.car = this.createHasOneRepositoryFactoryFor('car', carRepositoryGetter);
    this.registerInclusionResolver('car', this.car.inclusionResolver);
  }
}
