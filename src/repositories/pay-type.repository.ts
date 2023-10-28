import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PayType, PayTypeRelations, PayMethod} from '../models';
import {PayMethodRepository} from './pay-method.repository';

export class PayTypeRepository extends DefaultCrudRepository<
  PayType,
  typeof PayType.prototype.id,
  PayTypeRelations
> {

  public readonly payMethod: BelongsToAccessor<PayMethod, typeof PayType.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PayMethodRepository') protected payMethodRepositoryGetter: Getter<PayMethodRepository>,
  ) {
    super(PayType, dataSource);
    this.payMethod = this.createBelongsToAccessorFor('payMethod', payMethodRepositoryGetter,);
    this.registerInclusionResolver('payMethod', this.payMethod.inclusionResolver);
  }
}
