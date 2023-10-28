import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Location, LocationRelations, Request, Distance} from '../models';
import {RequestRepository} from './request.repository';
import {DistanceRepository} from './distance.repository';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.id,
  LocationRelations
> {

  public readonly request: BelongsToAccessor<Request, typeof Location.prototype.id>;

  public readonly distance: HasOneRepositoryFactory<Distance, typeof Location.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('DistanceRepository') protected distanceRepositoryGetter: Getter<DistanceRepository>,
  ) {
    super(Location, dataSource);
    this.distance = this.createHasOneRepositoryFactoryFor('distance', distanceRepositoryGetter);
    this.registerInclusionResolver('distance', this.distance.inclusionResolver);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
