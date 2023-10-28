import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Status, StatusRelations, Request} from '../models';
import {RequestRepository} from './request.repository';

export class StatusRepository extends DefaultCrudRepository<
  Status,
  typeof Status.prototype.id,
  StatusRelations
> {

  public readonly request: BelongsToAccessor<Request, typeof Status.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(Status, dataSource);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
