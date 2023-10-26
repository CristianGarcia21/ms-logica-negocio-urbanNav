import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Car, CarRelations, Driver} from '../models';
import {DriverRepository} from './driver.repository';

export class CarRepository extends DefaultCrudRepository<
  Car,
  typeof Car.prototype.id,
  CarRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof Car.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(Car, dataSource);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);
  }
}
