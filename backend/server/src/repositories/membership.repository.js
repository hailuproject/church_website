import Membership from '../models/Membership.js';
import BaseRepository from './base.repository.js';

class MembershipRepository extends BaseRepository {
  constructor() {
    super(Membership, {
      searchableFields: ['fullName', 'amharicName', 'baptismName', 'email', 'phone'],
      filterWhitelist: ['status', 'city'],
      defaultSort: { createdAt: -1 },
    });
  }

  async summaryCounts() {
    const [total, approved, pending] = await Promise.all([
      Membership.countDocuments({}),
      Membership.countDocuments({ status: 'approved' }),
      Membership.countDocuments({ status: 'pending' }),
    ]);
    return { total, approved, pending };
  }
}

export default new MembershipRepository();
