class WinnersListModel {
  constructor(data = {}) {
    this.winnerId = data.winner_id || null;
    this.winType = data.win_type || null;
    this.amount = data.amount || null;
    this.userName = data.user_name || null;
    this.phone = data.phone || null;
    this.ticketNumber = data.ticket_number || null;
    this.prizeName = data.prize_name || null;
    this.gameTitle = data.game_title || null;
  }

  // Convert to plain object for component use
  toJSON() {
    return {
      winnerId: this.winnerId,
      winType: this.winType,
      amount: this.amount,
      userName: this.userName,
      phone: this.phone,
      ticketNumber: this.ticketNumber,
      prizeName: this.prizeName,
      gameTitle: this.gameTitle
    };
  }

  // FIXED: Static method to create array from API response
  static fromAPIResponse(response) {
    if (!response || !response.success || !Array.isArray(response.data)) {
      return [];
    }
    // FIXED: Changed from OfferModel to WinnersListModel
    return response.data.map(item => new WinnersListModel(item));
  }
}

export default WinnersListModel;