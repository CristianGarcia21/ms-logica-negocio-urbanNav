import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Travel, TravelRelations, PayMethod, Request} from '../models';
import {PayMethodRepository} from './pay-method.repository';
import {RequestRepository} from './request.repository';

export class TravelRepository extends DefaultCrudRepository<
  Travel,
  typeof Travel.prototype.id,
  TravelRelations
> {

  public readonly payMethod: BelongsToAccessor<PayMethod, typeof Travel.prototype.id>;

  public readonly request: BelongsToAccessor<Request, typeof Travel.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PayMethodRepository') protected payMethodRepositoryGetter: Getter<PayMethodRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(Travel, dataSource);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
    this.payMethod = this.createBelongsToAccessorFor('payMethod', payMethodRepositoryGetter,);
    this.registerInclusionResolver('payMethod', this.payMethod.inclusionResolver);
  }
}
