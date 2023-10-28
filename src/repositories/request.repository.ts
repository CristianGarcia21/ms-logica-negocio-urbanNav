import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Request, RequestRelations, Driver, Passenger, Status, Location, Travel} from '../models';
import {DriverRepository} from './driver.repository';
import {PassengerRepository} from './passenger.repository';
import {StatusRepository} from './status.repository';
import {LocationRepository} from './location.repository';
import {TravelRepository} from './travel.repository';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.id,
  RequestRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof Request.prototype.id>;

  public readonly passenger: BelongsToAccessor<Passenger, typeof Request.prototype.id>;

  public readonly status: HasOneRepositoryFactory<Status, typeof Request.prototype.id>;

  public readonly location: HasOneRepositoryFactory<Location, typeof Request.prototype.id>;

  public readonly travel: HasOneRepositoryFactory<Travel, typeof Request.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>, @repository.getter('PassengerRepository') protected passengerRepositoryGetter: Getter<PassengerRepository>, @repository.getter('StatusRepository') protected statusRepositoryGetter: Getter<StatusRepository>, @repository.getter('LocationRepository') protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('TravelRepository') protected travelRepositoryGetter: Getter<TravelRepository>,
  ) {
    super(Request, dataSource);
    this.travel = this.createHasOneRepositoryFactoryFor('travel', travelRepositoryGetter);
    this.registerInclusionResolver('travel', this.travel.inclusionResolver);
    this.location = this.createHasOneRepositoryFactoryFor('location', locationRepositoryGetter);
    this.registerInclusionResolver('location', this.location.inclusionResolver);
    this.status = this.createHasOneRepositoryFactoryFor('status', statusRepositoryGetter);
    this.registerInclusionResolver('status', this.status.inclusionResolver);
    this.passenger = this.createBelongsToAccessorFor('passenger', passengerRepositoryGetter,);
    this.registerInclusionResolver('passenger', this.passenger.inclusionResolver);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
    this.registerInclusionResolver('driver', this.driver.inclusionResolver);
  }
}
