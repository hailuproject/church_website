import dashboardRepository from '../repositories/dashboard.repository.js';

class DashboardService {
  async overview() {
    return dashboardRepository.overview();
  }

  async recentActivities(limit) {
    return dashboardRepository.recentActivities(limit);
  }

  async recentMembers(limit) {
    return dashboardRepository.recentMembers(limit);
  }

  async recentSermons(limit) {
    return dashboardRepository.recentSermons(limit);
  }

  async recentEvents(limit) {
    return dashboardRepository.recentEvents(limit);
  }

  async recentAnnouncements(limit) {
    return dashboardRepository.recentAnnouncements(limit);
  }

  async recentDonations(limit) {
    return dashboardRepository.recentDonations(limit);
  }

  async recentMessages(limit) {
    return dashboardRepository.recentMessages(limit);
  }

  async charts(months) {
    const [memberStats, sermonStats, donationSeries, usersByRole, eventsByCategory, sermonsByCategory] = await Promise.all([
      dashboardRepository.memberStatsByMonth(months),
      dashboardRepository.sermonStatsByMonth(months),
      dashboardRepository.donationMonthlySeries(new Date().getFullYear()),
      dashboardRepository.usersByRole(),
      dashboardRepository.eventsByCategory(),
      dashboardRepository.sermonsByCategory(),
    ]);
    return { memberStats, sermonStats, donationSeries, usersByRole, eventsByCategory, sermonsByCategory };
  }

  async full(months) {
    const [overview, recentActivities, recentMembers, recentSermons, recentEvents, recentAnnouncements, recentDonations, recentMessages, charts] =
      await Promise.all([
        this.overview(),
        this.recentActivities(10),
        this.recentMembers(5),
        this.recentSermons(5),
        this.recentEvents(5),
        this.recentAnnouncements(5),
        this.recentDonations(5),
        this.recentMessages(5),
        this.charts(months),
      ]);

    return {
      overview,
      recentActivities,
      recentMembers,
      recentSermons,
      recentEvents,
      recentAnnouncements,
      recentDonations,
      recentMessages,
      charts,
    };
  }
}

export default new DashboardService();
