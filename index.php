<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName">Word-Finder</h1>
        <h3 id="groupName">The Raging Disappointments</h3>
        <h3>Instructions:</h3>
        <div id="gameDesc" class="jumbotron">
            <div>
                <p>
                    <b>How to Win</b>
                    <br>
                    The goal of the game is to accumulate the most points by the time the game finishes. The game has <code>n</code> rounds (defined by the player). A round consists of a turn for each player.
                </p>
                <p>
                <br>
                    <b>Turns</b>
                    <br>
                    A turn is split into two sections - The Action Phase and Word Phase. In the Action Phase, a player gets a chance to either: rotate a column (up/down), rotate a row (right/left), or swap a letter with any other letter. The Word Phase provides a player the option to select a word on the board to be removed. If a word is removed, the letters are re-populated randomly.
                </p>
                <p>
                <br>
                    <b>Rules</b>
                    <br>
                <ul>
                    <li>A word may only go from left to right or up to down.</li>
                    <li>A word must be formed with adjacent letters that are not diagonal.</li>
                    <li>The maximum board size is 12 letters by 12 letters.</li>
                    <li>There may be up to four players and a bot. His name is sadly not Botty Mc. BotFace. Instead it's Bot. Go figure.</li> 
                </ul>
                </p>
            </div>
        </div>

        <h3>Play It!</h3>
        <form id="gameSettings" class="well">
        </form>
    </article>
    <?php include $base."footer.php"; ?>
	</div>
</div>
<script type="text/javascript">
    newWindowBtn(1000,900,"games/Word-Finder/build/index.html", ['textBoxDemo', 'btnDemo', 'selectDemo']);
</script>
</body>
</html>
