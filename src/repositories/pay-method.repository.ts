import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayMethod, PayMethodRelations, Passenger, PayType, Travel} from '../models';
import {PassengerRepository} from './passenger.repository';
import {PayTypeRepository} from './pay-type.repository';
import {TravelRepository} from './travel.repository';

export class PayMethodRepository extends DefaultCrudRepository<
  PayMethod,
  typeof PayMethod.prototype.id,
  PayMethodRelations
> {

  public readonly passenger: BelongsToAccessor<Passenger, typeof PayMethod.prototype.id>;

  public readonly payType: HasOneRepositoryFactory<PayType, typeof PayMethod.prototype.id>;

  public readonly travels: HasManyRepositoryFactory<Travel, typeof PayMethod.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PassengerRepository') protected passengerRepositoryGetter: Getter<PassengerRepository>, @repository.getter('PayTypeRepository') protected payTypeRepositoryGetter: Getter<PayTypeRepository>, @repository.getter('TravelRepository') protected travelRepositoryGetter: Getter<TravelRepository>,
  ) {
    super(PayMethod, dataSource);
    this.travels = this.createHasManyRepositoryFactoryFor('travels', travelRepositoryGetter,);
    this.registerInclusionResolver('travels', this.travels.inclusionResolver);
    this.payType = this.createHasOneRepositoryFactoryFor('payType', payTypeRepositoryGetter);
    this.registerInclusionResolver('payType', this.payType.inclusionResolver);
    this.passenger = this.createBelongsToAccessorFor('passenger', passengerRepositoryGetter,);
    this.registerInclusionResolver('passenger', this.passenger.inclusionResolver);
  }
}
