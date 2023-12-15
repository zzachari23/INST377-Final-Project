async function searchPlayer() {
    const playerName = document.getElementById('playerName').value;
    const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`);
    const playerData = await response.json();
    const playerStats = document.getElementById('playerStats');
    playerStats.innerHTML = '';

    if (playerData.data.length === 0) {
        playerStats.innerHTML = '<p>No players found. Please try again.</p>';
    } else {
        playerData.data.forEach(async player => {
            const averagesResponse = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player.id}`);
            const averagesData = await averagesResponse.json();
            const averages = averagesData.data[0];
            playerStats.innerHTML += `<p>Name: ${player.first_name} ${player.last_name}<br>Team: ${player.team.full_name}<br>Position: ${player.position}<br>Height: ${player.height_feet}'${player.height_inches}"<br>Weight: ${player.weight_pounds} lbs<br>Points per game: ${averages.pts}<br>Assists per game: ${averages.ast}<br>Rebounds per game: ${averages.reb}</p>`;
        });
    }
}
async function searchTeam() {
    const teamName = document.getElementById('teamName').value;
    const response = await fetch(`https://www.balldontlie.io/api/v1/teams`);
    const teamData = await response.json();
    const teamInfo = document.getElementById('teamInfo');
    teamInfo.innerHTML = '';

    const matchingTeams = teamData.data.filter(team =>
        team.full_name.toLowerCase().includes(teamName.toLowerCase())
    );

    if (matchingTeams.length === 0) {
        teamInfo.innerHTML = '<p>No teams found. Please try again.</p>';
    } else {
        matchingTeams.forEach(team => {
            teamInfo.innerHTML += `<p>Full Name: ${team.full_name}<br>Abbreviation: ${team.abbreviation}<br>City: ${team.city}<br>Conference: ${team.conference}<br>Division: ${team.division}<br>Name: ${team.name}</p>`;
        });
    }
}

async function searchDate() {
    const gameDate = document.getElementById('gameDate').value;
    const response = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${gameDate}`);
    const gameData = await response.json();
    const gameInfo = document.getElementById('gameInfo');
    gameInfo.innerHTML = '';

    if (gameData.data.length === 0) {
        gameInfo.innerHTML = '<p>No games found. Please try again.</p>';
    } else {
        gameData.data.forEach(game => {
            gameInfo.innerHTML += `<p>${game.home_team.full_name} vs ${game.visitor_team.full_name}, ${game.home_team_score}:${game.visitor_team_score}</p>`;
        });
    }
}

async function searchStats() {
    const statDate = document.getElementById('statDate').value;
    const response = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${statDate}`);
    const gameData = await response.json();
    const statInfo = document.getElementById('statInfo');
    statInfo.innerHTML = '';

    if (gameData.data.length === 0) {
        statInfo.innerHTML = '<p>No games found. Please try again.</p>';
    } else {
        gameData.data.forEach(async game => {
            const statsResponse = await fetch(`https://www.balldontlie.io/api/v1/stats?game_ids[]=${game.id}`);
            const statsData = await statsResponse.json();
            const homeTeamStats = statsData.data.filter(stat => stat.team.id === game.home_team.id);
            const visitorTeamStats = statsData.data.filter(stat => stat.team.id === game.visitor_team.id);

            statInfo.innerHTML += `<p>${game.home_team.full_name} vs ${game.visitor_team.full_name}, ${game.home_team_score}:${game.visitor_team_score}</p>`;
            statInfo.innerHTML += '<h3>Home Team Stats</h3>';
            homeTeamStats.forEach(stat => {
                statInfo.innerHTML += `<p>Player: ${stat.player.first_name} ${stat.player.last_name}<br>Points: ${stat.pts}<br>Assists: ${stat.ast}<br>Rebounds: ${stat.reb}<br>Blocks: ${stat.blk}<br>Steals: ${stat.stl}</p>`;
            });
            statInfo.innerHTML += '<h3>Visitor Team Stats</h3>';
            visitorTeamStats.forEach(stat => {
                statInfo.innerHTML += `<p>Player: ${stat.player.first_name} ${stat.player.last_name}<br>Points: ${stat.pts}<br>Assists: ${stat.ast}<br>Rebounds: ${stat.reb}<br>Blocks: ${stat.blk}<br>Steals: ${stat.stl}</p>`;
            });
        });
    }
}

