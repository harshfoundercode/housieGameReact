export class GameRoundsResponseModel {
    constructor(data) {
        this.success = data.success;
        this.message = data.message;
        this.totalGames = data.data.totalGames;
        this.games = data.data.games;
    }

    static fromAPIResponse(response) {
        return new GameRoundsResponseModel(response);
    }

    // Helper methods
    getGamesWithRounds() {
        return this.games.filter(game => game.round_time !== null);
    }

    getGamesWithoutRounds() {
        return this.games.filter(game => game.round_time === null);
    }

    getGamesByDate(date) {
        return this.games.filter(game => game.game_date.split('T')[0] === date);
    }

    getGameById(gameId) {
        return this.games.find(game => game.game_id === gameId);
    }
}