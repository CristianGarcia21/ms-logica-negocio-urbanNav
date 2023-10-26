import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Passenger, PassengerRelations, Request, PayMethod} from '../models';
import {RequestRepository} from './request.repository';
import {PayMethodRepository} from './pay-method.repository';

export class PassengerRepository extends DefaultCrudRepository<
  Passenger,
  typeof Passenger.prototype.id,
  PassengerRelations
> {

  public readonly requests: HasManyRepositoryFactory<Request, typeof Passenger.prototype.id>;

  public readonly payMethods: HasManyRepositoryFactory<PayMethod, typeof Passenger.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('PayMethodRepository') protected payMethodRepositoryGetter: Getter<PayMethodRepository>,
  ) {
    super(Passenger, dataSource);
    this.payMethods = this.createHasManyRepositoryFactoryFor('payMethods', payMethodRepositoryGetter,);
    this.registerInclusionResolver('payMethods', this.payMethods.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
  }
}
