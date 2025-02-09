import { EntityRepository, InsertResult } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";

import { Anchor } from "../models/anchor";
import { Request } from "../models/request";
import { singleton } from "tsyringe";

@singleton()
@EntityRepository(Anchor)
export default class AnchorRepository extends BaseRepository<Anchor> {

  /**
   * Creates anchors
   * @param anchors - Anchors
   */
  public async createAnchors(anchors: Array<Anchor>): Promise<InsertResult> {
    return this.manager.getRepository(Anchor)
      .createQueryBuilder()
      .insert()
      .into(Anchor)
      .values(anchors)
      .execute();
  }

  /**
   * Gets anchor metadata
   * @param request - Request id
   */
  public async findByRequest(request: Request): Promise<Anchor> {
    return this.manager.getRepository(Anchor)
      .createQueryBuilder('anchor')
      .leftJoinAndSelect('anchor.request', 'request')
      .where('request.id = :requestId', { requestId: request.id })
      .getOne();
  }

}
