import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayMethod, PayMethodRelations, Passenger} from '../models';
import {PassengerRepository} from './passenger.repository';

export class PayMethodRepository extends DefaultCrudRepository<
  PayMethod,
  typeof PayMethod.prototype.id,
  PayMethodRelations
> {

  public readonly passenger: BelongsToAccessor<Passenger, typeof PayMethod.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PassengerRepository') protected passengerRepositoryGetter: Getter<PassengerRepository>,
  ) {
    super(PayMethod, dataSource);
    this.passenger = this.createBelongsToAccessorFor('passenger', passengerRepositoryGetter,);
    this.registerInclusionResolver('passenger', this.passenger.inclusionResolver);
  }
}
