🎲 Knuckles

Knuckles is a 2-player web game inspired by a classic grid dice battle. It’s fully playable in any modern browser on desktop, tablet, or mobile. The game features turn-based dice placement, matching mechanics for score multipliers, and knockout rules for competitive play.

📜 Game Rules

    Each player has a 3×3 grid.

    Players take turns rolling a 6-sided die and placing the die in one of the lowest available slots of any of the three columns on their own grid.

    Dice drop from the top of the column, similar to Connect Four.

    The score for each player is the sum of their dice, but:

        If there are two dice of the same value in the same column, they multiply together (e.g., two 5s → 5×5=25).

        If there are three dice of the same value in the same column, they multiply three times (e.g., three 3s → 3×3×3=27).

        If the dice value is 1, it scores linearly instead: one 1=1, two 1s=2, three 1s=3.

    Knockout mechanic: if you place a die with the same value in the same column as your opponent's die, you knock it out, removing the opponent's die from that column.

    Knocked-out dice fall upwards, filling the empty spot below them.

    Once a player’s grid is full (all 9 spots filled), the game ends and the player with the highest score wins.

✨ Features

✅ 2D responsive design that scales to mobile, tablet, and desktop
✅ Animated dice rolling, die placement, knockouts, and falling dice
✅ Player name input with validation to avoid duplicates
✅ Dynamic scoring with highlight animations for matched dice
✅ Retro-inspired pixel font support via Google Fonts
✅ Start and end screens with game results
📦 Project Structure

/index.html
/styles.css
/script.js
/assets/        # (optional for dice images, sounds, etc.)
/README.md

🛠️ How to Play Locally

    Clone the repository:

    git clone https://github.com/yourusername/knuckles.git
    cd knuckles

    Open index.html in your browser.

    Enter unique player names on the start screen.

    Play turns by rolling and placing dice until a player’s board fills up.

    The game will display the winner on the end screen.

🧮 Game Logic Overview

    Dice Placement: The die is placed into the lowest empty row of the chosen column.

    Score Calculation: After every turn, scores are recalculated by iterating each column for each player, counting same-value dice:

        If a single die exists → added as-is.

        If two matching dice → multiply once (e.g., 3×3).

        If three matching dice → multiply twice (e.g., 3×3×3).

        Special case for 1s: they add linearly by their count (1, 2, or 3).

    Knockout Logic: When placing a die, the opponent’s same-value dice in the same column are removed, and higher dice fall down to fill gaps.

📄 License

This game is open-source and available under the MIT License.