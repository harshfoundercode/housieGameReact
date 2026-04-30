export class RoundModel {
  constructor(data = {}) {
    this.roundId = data.round_id || null;
    this.createdAt = data.created_at || null;
  }

  // Get time ago in human readable format
  getDaysAgo() {
    if (!this.createdAt) return '';
    
    const createdDate = new Date(this.createdAt);
    const currentDate = new Date();
    
    const diffTime = currentDate - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes === 0) {
          return 'Just now';
        }
        return `${diffMinutes} min ago`;
      }
      return `${diffHours} hr ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  }

  // Get formatted date and time
  getFormattedDate() {
    if (!this.createdAt) return '';
    
    const date = new Date(this.createdAt);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get only date
  getDate() {
    if (!this.createdAt) return '';
    
    const date = new Date(this.createdAt);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // Get only time
  getTime() {
    if (!this.createdAt) return '';
    
    const date = new Date(this.createdAt);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  toJSON() {
    return {
      roundId: this.roundId,
      createdAt: this.createdAt,
      daysAgo: this.getDaysAgo(),
      formattedDate: this.getFormattedDate(),
      date: this.getDate(),
      time: this.getTime()
    };
  }
}

export class GameRoundsModel {
  constructor(data = {}) {
    this.gameId = data.game_id || null;
    this.title = data.title || '';
    this.totalRounds = data.total_rounds || 0;
    this.rounds = Array.isArray(data.rounds) 
      ? data.rounds.map(round => new RoundModel(round))
      : [];
  }

  // Check if game has rounds
  hasRounds() {
    return this.rounds.length > 0;
  }

  // Get latest round
  getLatestRound() {
    return this.rounds.length > 0 ? this.rounds[0] : null;
  }

  // Get oldest round
  getOldestRound() {
    return this.rounds.length > 0 ? this.rounds[this.rounds.length - 1] : null;
  }

  // Get round by ID
  getRoundById(roundId) {
    return this.rounds.find(round => round.roundId === roundId) || null;
  }

  // Get all rounds sorted by date (newest first - default from API)
  getSortedRounds(order = 'desc') {
    return [...this.rounds].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  toJSON() {
    return {
      gameId: this.gameId,
      title: this.title,
      totalRounds: this.totalRounds,
      hasRounds: this.hasRounds(),
      rounds: this.rounds.map(round => round.toJSON()),
      latestRound: this.getLatestRound()?.toJSON() || null,
      oldestRound: this.getOldestRound()?.toJSON() || null
    };
  }
}

export class GameRoundsResponseModel {
  constructor(response = {}) {
    this.success = response.success || false;
    this.message = response.message || '';
    this.data = Array.isArray(response.data) 
      ? response.data.map(game => new GameRoundsModel(game))
      : [];
  }

  // Get games that have rounds
  getGamesWithRounds() {
    return this.data.filter(game => game.hasRounds());
  }

  // Get games without rounds
  getGamesWithoutRounds() {
    return this.data.filter(game => !game.hasRounds());
  }

  // Get game by ID
  getGameById(gameId) {
    return this.data.find(game => game.gameId === gameId) || null;
  }

  // Get game by title
  getGameByTitle(title) {
    return this.data.find(game => game.title.toLowerCase() === title.toLowerCase()) || null;
  }

  // Get all rounds across all games
  getAllRounds() {
    const allRounds = [];
    this.data.forEach(game => {
      allRounds.push(...game.rounds);
    });
    return allRounds;
  }

  // Get total rounds count
  getTotalRoundsCount() {
    return this.data.reduce((total, game) => total + game.totalRounds, 0);
  }

  // Get games sorted by total rounds (most rounds first)
  getGamesSortedByRounds() {
    return [...this.data].sort((a, b) => b.totalRounds - a.totalRounds);
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      data: this.data.map(game => game.toJSON()),
      gamesWithRounds: this.getGamesWithRounds().map(game => game.toJSON()),
      gamesWithoutRounds: this.getGamesWithoutRounds().map(game => game.toJSON()),
      totalGamesCount: this.data.length,
      totalRoundsCount: this.getTotalRoundsCount(),
      allRounds: this.getAllRounds().map(round => round.toJSON())
    };
  }

  static fromAPIResponse(response) {
    return new GameRoundsResponseModel(response);
  }
}