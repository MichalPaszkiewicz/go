var Go;
(function (Go) {
    function getLegalMoves() {
        var array = Go.GameService.Instance.board;
        var value = Go.GameService.Instance.Colour;
        var emptyCells = Go.getCellsWithValue(array, 0 /* EMPTY */);
        var legalMoves = [];
        for (var i = 0; i < emptyCells.length; i++) {
            if (Go.canMove(array, emptyCells[i].x, emptyCells[i].y, value)) {
                legalMoves.push(emptyCells[i]);
            }
        }
        return legalMoves;
    }
    Go.getLegalMoves = getLegalMoves;
    function aiMove() {
        var aiPlayer = Go.PlayerService.Instance.otherPlayer();
        var legalMoves = getLegalMoves();
        var i = Math.floor(legalMoves.length * Math.random());
        var x = legalMoves[i].x;
        var y = legalMoves[i].y;
        Go.addMove(x, y, aiPlayer);
        if ($('#IsUserAI').is(':checked')) {
            Go.autoMove();
        }
    }
    Go.aiMove = aiMove;
})(Go || (Go = {}));
var Go;
(function (Go) {
    $('.him-her').keypress(function (e) {
        if (e.keyCode == 13)
            $('#connect').click();
    });
    $('.message').keypress(function (e) {
        if (e.keyCode == 13)
            $('#send').click();
    });
    function setTable(newSize) {
        Go.GameService.Instance.newGame(newSize);
        Go.GameService.Instance.gameMode = parseInt($("#game-mode-select").val());
        $("table").html(getNewTableHtml(newSize));
        $("table").removeClass("hidden");
        if (Go.GameService.Instance.isHost && Go.GameService.Instance.gameMode == 1 /* Online */) {
            $("#GamesSettingsLink").removeClass("hidden");
        }
        if (Go.GameService.Instance.gameMode == 0 /* Local */ || Go.GameService.Instance.gameMode == 2 /* AI */) {
            $("#GamesSettingsLink").addClass("hidden");
        }
        Go.updateDisplay();
        $("#player-notifier").removeClass("hidden");
    }
    ;
    function getNewTableHtml(newSize) {
        $('table').width(51 * newSize);
        var html = "";
        for (var i = newSize - 1; i > -1; i--) {
            html += "<tr>";
            for (var j = 0; j < newSize; j++) {
                html += "<td id=i" + j + "j" + i + "><div class='counter'></div></td>";
            }
            html += "</tr>";
        }
        return html;
    }
    var customCodeNode = document.getElementById("custom-coder");
    var myCodeMirror = CodeMirror(customCodeNode, {
        lineNumbers: true,
        theme: "ambiance"
    });
    function resetCode() {
        myCodeMirror.getDoc().setValue("\t/***Insert code here!***/\r\n\t/*You can get the values on the board from: array[x][y]*/\r\n\tvar legalMoves = Go.getLegalMoves();\r\n\tvar lm = Math.floor(legalMoves.length * Math.random());\r\n\tvar x = legalMoves[lm].x;\r\n\tvar y = legalMoves[lm].y;\r\n\tvar player = Go.GameService.Instance.Colour;\r\n\tGo.addMove(x,y,player);");
    }
    var localCode = localStorage.getItem("go-AI.js");
    if (localCode != null) {
        myCodeMirror.setValue(localCode);
    }
    else {
        resetCode();
    }
    $("#custom-coder").append("<div class='custom-coder-settings'><input id='IsUserAI' type='checkbox' name='IsUserAI'>Run code automatically</input>" + "<button onclick='Go.autoMove()'>Run code</button>" + "<button onclick='localStorage.setItem(\"go-AI.js\", myCodeMirror.getValue())'>Save code</button>" + "<button onclick='resetCode()'>Reset</button>" + "<div class='clearfix'></div></div>");
    function autoMove() {
        eval(myCodeMirror.getValue());
        if (Go.GameService.Instance.gameMode == 2 /* AI */) {
            Go.aiMove();
        }
    }
    Go.autoMove = autoMove;
    function newSettings() {
        Go.MemoryService.Instance.clearHistory();
        if ($("#game-mode-select").val() == "online") {
            Go.PlayerService.Instance.player = parseInt($('input[name=player]:checked').val());
        }
        else {
            Go.PlayerService.Instance.setWhite();
            Go.GameService.Instance.setColour(1 /* PLAYER_1 */);
        }
        Go.GameService.Instance.isHost = true;
        setTable($('#BoardSize').val());
    }
    Go.newSettings = newSettings;
    $("#game-mode-select").change(function () {
        if ($("#game-mode-select").val() == "online") {
            $(".player-item").removeClass("hidden");
        }
        else {
            $(".player-item").addClass("hidden");
        }
    });
    console.log("%c" + "A website made by Michal Paszkiewicz", "color: aliceBlue; text-shadow: black 1px 1px 4px; font-size: 40px;");
})(Go || (Go = {}));
var Go;
(function (Go) {
    function logArray(targetArray) {
        console.log("y");
        console.log(" |\\");
        for (var i = targetArray.length - 1; i > -1; i--) {
            var newString = i + "|  ";
            for (var j = 0; j < targetArray[i].length; j++) {
                newString += " " + targetArray[j][i];
            }
            console.log(newString);
        }
        console.log("   -----------------------> x");
    }
    Go.logArray = logArray;
})(Go || (Go = {}));
var Go;
(function (Go) {
    var Cell = (function () {
        function Cell(x, y, value) {
            this.x = x;
            this.y = y;
            this.value = value;
        }
        Cell.prototype.equalTo = function (otherCell) {
            return this.x == otherCell.x && this.y == otherCell.y && this.value == otherCell.value;
        };
        return Cell;
    })();
    Go.Cell = Cell;
})(Go || (Go = {}));
/// <reference path="cell.ts" />
var Go;
(function (Go) {
    function getValue(targetArray, x, y) {
        if (isOutOfBounds(targetArray, x, y)) {
            return new Go.Cell(x, y, 3 /* OUT_OF_BOUNDS */);
        }
        return new Go.Cell(x, y, targetArray[x][y]);
    }
    Go.getValue = getValue;
    function getAdjacentCells(targetArray, x, y) {
        var adjacentValues = [];
        adjacentValues.push(getValue(targetArray, x - 1, y));
        adjacentValues.push(getValue(targetArray, x + 1, y));
        adjacentValues.push(getValue(targetArray, x, y - 1));
        adjacentValues.push(getValue(targetArray, x, y + 1));
        return adjacentValues;
    }
    Go.getAdjacentCells = getAdjacentCells;
    function getAdjacentNonZeroCells(targetArray, x, y) {
        var nonZeroValues = [];
        var adjacentValues = getAdjacentCells(targetArray, x, y);
        for (var i = 0; i < adjacentValues.length; i++) {
            if (adjacentValues[i].value != 0 /* EMPTY */) {
                nonZeroValues.push(adjacentValues[i]);
            }
        }
        return nonZeroValues;
    }
    Go.getAdjacentNonZeroCells = getAdjacentNonZeroCells;
    function getAdjacentNonZeroValuesCount(targetArray, x, y) {
        return getAdjacentNonZeroCells(targetArray, x, y).length;
    }
    Go.getAdjacentNonZeroValuesCount = getAdjacentNonZeroValuesCount;
    function isOutOfBounds(targetArray, x, y) {
        var result = x < 0 || y < 0 || x >= targetArray.length || y >= targetArray.length;
        return result;
    }
    Go.isOutOfBounds = isOutOfBounds;
    function getAdjacentWithValue(targetArray, x, y, value) {
        var adjacentWithValue = [];
        var adjacent = getAdjacentCells(targetArray, x, y);
        for (var i = 0; i < adjacent.length; i++) {
            if (adjacent[i].value == value) {
                adjacentWithValue.push(adjacent[i]);
            }
        }
        return adjacentWithValue;
    }
    Go.getAdjacentWithValue = getAdjacentWithValue;
    function getCellsWithValue(targetArray, value) {
        var cellList = [];
        for (var x = 0; x < targetArray.length; x++) {
            for (var y = 0; y < targetArray.length; y++) {
                var cell = getValue(targetArray, x, y);
                if (cell.value == value) {
                    cellList.push(cell);
                }
            }
        }
        return cellList;
    }
    Go.getCellsWithValue = getCellsWithValue;
})(Go || (Go = {}));
/// <reference path="typings/jquery/jquery.d.ts" />
var Go;
(function (Go) {
    // Connect to PeerJS, have server assign an ID instead of providing one
    // Showing off some of the configs available with PeerJS :).
    var peer = new Peer({
        // Set API key for cloud server (you don't need this if you're running your
        // own.
        key: '9t3v4nsdk6ueg66r',
        // Set highest debug level (log everything!).
        debug: 3,
        // Set a logging function:
        logFunction: function () {
            var copy = Array.prototype.slice.call(arguments).join(' ');
            $('.log').append(copy + '<br>');
        },
        // Use a TURN server for more network support
        config: {
            'iceServers': [
                { url: 'stun:stun.l.google.com:19302' }
            ]
        } /* Sample servers, please use appropriate ones */
    });
    var connectedPeers = {};
    // Show this peer's ID.
    peer.on('open', function (id) {
        $(".me").val(id);
        $(".friend-link").val(location.href + "?id=" + id);
        $(".friend-link").click(function () {
            $(this).select();
        });
        if (location.search.length == 0) {
            Go.PlayerService.Instance.setWhite();
        }
        else {
            //$("#games-table").removeClass("hidden");
            Go.PlayerService.Instance.setBlack();
        }
    });
    // Await connections from others
    peer.on('connection', connect);
    // Handle a connection object.
    function connect(c) {
        var dataDiv = $("div.data");
        // Handle a chat connection.
        if (c.label === 'chat') {
            var chatbox = $('<div>' + c.peer + ' has connected</div>').addClass('connection').addClass('active').attr('id', c.peer);
            chatbox.appendTo('.data');
            c.on('data', function (data) {
                // if data is a move, don't print!
                if (data.indexOf("goMove=") > -1) {
                    //console.log(data);
                    var tdID = data.substring(data.indexOf('=') + 1);
                    var xPos = parseInt(tdID.substring(tdID.indexOf("i") + 1));
                    var yPos = parseInt(tdID.substring(tdID.indexOf("j") + 1));
                    Go.addMove(xPos, yPos, Go.PlayerService.Instance.otherPlayer());
                    //$("#" + tdID).find("div").addClass("black");
                    if ($('#IsUserAI').is(':checked')) {
                        Go.autoMove();
                    }
                }
                else if (data.indexOf("goRemove") > -1) {
                    //console.log(data);
                    var tdID = data.substring(data.indexOf('=') + 1);
                }
                else if (data.indexOf("goSettings=") > -1) {
                    Go.GameService.Instance.isHost = false;
                    var settingsString = data.substring(data.indexOf('=') + 1);
                    var newSize = parseInt(settingsString.substring(settingsString.indexOf("s") + 1));
                    var sentPlayer = parseInt(settingsString.substring(settingsString.indexOf("p") + 1));
                    Go.GameService.Instance.newGame(newSize);
                    Go.GameService.Instance.setColour(parseInt(settingsString.substring(settingsString.indexOf("c") + 1)));
                    Go.PlayerService.Instance.player = sentPlayer;
                    Go.PlayerService.Instance.switchSides();
                }
                else {
                    dataDiv.append('<p>' + c.peer + ':</p><p>' + data + '</p>');
                    dataDiv.scrollTop(dataDiv.prop("scrollHeight"));
                }
            });
            c.on('close', function () {
                alert(c.peer + ' has left the chat.');
                //if ($('.connection').length === 0) {
                // $('.filler').show();
                //}
                delete connectedPeers[c.peer];
            });
        }
        else if (c.label === 'file') {
            c.on('data', function (data) {
                // If we're getting a file, create a URL for it.
                if (data.constructor === ArrayBuffer) {
                    var dataView = new Uint8Array(data);
                    var dataBlob = new Blob([dataView]);
                    var url = window["URL"].createObjectURL(dataBlob);
                    dataDiv.append('<p>' + c.peer + ' has sent you a <a target="_blank" href="' + url + '">file</a>.</p>');
                }
            });
        }
        if (location.search.length == 0) {
            setTimeout(function () {
                sendSettings();
            }, 500);
        }
    }
    Go.connect = connect;
    $(document).ready(function () {
        var dataDiv = $("div.data");
        // Prepare file drop box.
        var box = $('#box');
        box.on('dragenter', doNothing);
        box.on('dragover', doNothing);
        box.on('drop', function (e) {
            e.originalEvent.preventDefault();
            var file = e.originalEvent.dataTransfer.files[0];
            eachActiveConnection(function (c, $c) {
                if (c.label === 'file') {
                    c.send(file);
                    $c.find('div.data').append('<p>You sent a file.</span></p>');
                }
            });
        });
        function doNothing(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (location.search.length > 0) {
            var requestedPeer = location.search.substring(location.search.indexOf("=") + 1);
            if (!connectedPeers[requestedPeer]) {
                var c = peer.connect(requestedPeer, {
                    label: 'chat',
                    serialization: 'none',
                    reliable: false,
                    metadata: { message: 'hi i want to chat with you!' }
                });
                c.on('open', function () {
                    connect(c);
                });
                c.on('error', function (err) {
                    alert(err);
                });
                var f = peer.connect(requestedPeer, { label: 'file' });
                f.on('open', function () {
                    connect(f);
                });
                f.on('error', function (err) {
                    alert(err);
                });
            }
            connectedPeers[requestedPeer] = 1;
        }
        // Connect to a peer
        $('#connect').click(function () {
            requestedPeer = $('.him-her').val().trim();
            if (!connectedPeers[requestedPeer]) {
                // Create 2 connections, one labelled chat and another labelled file.
                var c = peer.connect(requestedPeer, {
                    label: 'chat',
                    serialization: 'none',
                    reliable: false,
                    metadata: { message: 'hi i want to chat with you!' }
                });
                c.on('open', function () {
                    connect(c);
                });
                c.on('error', function (err) {
                    alert(err);
                });
                var f = peer.connect(requestedPeer, { label: 'file' });
                f.on('open', function () {
                    connect(f);
                });
                f.on('error', function (err) {
                    alert(err);
                });
            }
            connectedPeers[requestedPeer] = 1;
        });
        //$("td").click(function () {
        $("#games-table").on('click', 'td', function () {
            //$(this).find("div").addClass("white");
            var itemID = $(this).attr('id');
            var xPos = parseInt(itemID.substring(itemID.indexOf("i") + 1));
            var yPos = parseInt(itemID.substring(itemID.indexOf("j") + 1));
            Go.addMove(xPos, yPos, Go.PlayerService.Instance.player);
            if (Go.GameService.Instance.gameMode == 2 /* AI */) {
                Go.aiMove();
            }
        });
        $('td').bind('contextmenu', function (e) {
            //$(this).find("div").removeClass("black white");
            var msg = "goRemove=" + $(this).attr('id');
            //console.log(msg);
            eachActiveConnection(function (c, $c) {
                if (c.label === 'chat') {
                    c.send(msg);
                }
            });
            return false;
        });
        // Close a connection.
        $('#close').click(function () {
            eachActiveConnection(function (c) {
                c.close();
            });
        });
        // Send a chat message to all active connections.
        $('#send').click(function (e) {
            //console.log("Sent:" + e);
            e.preventDefault();
            // For each active connection, send the message.
            var msg = $(".message").val();
            eachActiveConnection(function (c, $c) {
                if (c.label === 'chat') {
                    c.send(msg);
                    $('div.data').append('<p>You: </p><p>' + msg + '</p>');
                }
            });
            $(".message").val('');
            $(".message").focus();
            dataDiv.scrollTop(dataDiv.prop("scrollHeight"));
        });
        // Show browser version
        $('#browsers').text(navigator.userAgent);
    });
    // Goes through each active peer and calls FN on its connections.
    function eachActiveConnection(fn) {
        var actives = $('.active');
        var checkedIds = {};
        actives.each(function () {
            var peerId = $(this).attr('id');
            if (!checkedIds[peerId]) {
                var conns = peer.connections[peerId];
                for (var i = 0, ii = conns.length; i < ii; i += 1) {
                    var conn = conns[i];
                    fn(conn, $(this));
                }
            }
            checkedIds[peerId] = 1;
        });
    }
    function sendMove(x, y) {
        var msg = "goMove=" + "i" + x + "j" + y;
        //console.log(msg);
        eachActiveConnection(function (c, $c) {
            if (c.label === 'chat') {
                c.send(msg);
            }
        });
    }
    Go.sendMove = sendMove;
    function sendSettings() {
        var msg = "goSettings=" + "s" + Go.GameService.Instance.board.length + "p" + Go.PlayerService.Instance.player + "c" + Go.GameService.Instance.Colour;
        //console.log(msg);
        eachActiveConnection(function (c, $c) {
            if (c.label === 'chat') {
                c.send(msg);
            }
        });
    }
    Go.sendSettings = sendSettings;
    // Make sure things clean up properly.
    window.onunload = window.onbeforeunload = function (e) {
        if (!!peer && !peer.destroyed) {
            peer.destroy();
        }
    };
})(Go || (Go = {}));
var Go;
(function (Go) {
    function updateDisplay() {
        var array = Go.GameService.Instance.board;
        var size = Go.GameService.Instance.board.length;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                $("#i" + i + "j" + j + " div").removeClass("white black");
                if (array[i][j] == 1) {
                    $("#i" + i + "j" + j + " div").addClass("white");
                }
                if (array[i][j] == 2) {
                    $("#i" + i + "j" + j + " div").addClass("black");
                }
            }
        }
        var player = Go.PlayerService.Instance.player;
        var currentTurn = Go.GameService.Instance.Colour;
        if (player == 1 /* PLAYER_1 */) {
            $("#player-colour").text("You are white").css({ color: "white", "text-shadow": "1px 1px black" });
        }
        if (player == 2 /* PLAYER_2 */) {
            $("#player-colour").text("You are black").css({ color: "black", "text-shadow": "none" });
        }
        if (currentTurn == 1 /* PLAYER_1 */) {
            $("#move-notifier").text("White to move").css({ color: "white", "text-shadow": "1px 1px black" });
        }
        else {
            $("#move-notifier").text("Black to move").css({ color: "black", "text-shadow": "none" });
        }
    }
    Go.updateDisplay = updateDisplay;
    function gameOver() {
        alert("Game over");
    }
    Go.gameOver = gameOver;
})(Go || (Go = {}));
var Go;
(function (Go) {
    // attach the .equals method to Array's prototype to call it on any array
    function arraysEqual(targetArray, otherArray) {
        // if the other array is a falsy value, return
        if (!targetArray || !otherArray) {
            throw new Error("One of the arrays is empty");
            return false;
        }
        // compare lengths - can save a lot of time 
        if (otherArray.length != targetArray.length) {
            return false;
        }
        for (var i = 0; i < otherArray.length; i++) {
            for (var j = 0; j < otherArray[i].length; j++) {
                if (targetArray[i][j] != otherArray[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    Go.arraysEqual = arraysEqual;
    // set array to equal array properly.
    function copyFrom(fromArray) {
        // if the other array is a falsy value, return
        if (!fromArray || fromArray.length < 1) {
            return [];
        }
        var toArray = [];
        for (var i = 0; i < fromArray.length; i++) {
            toArray.push([]);
        }
        for (var i = 0; i < fromArray.length; i++) {
            for (var j = 0; j < fromArray[i].length; j++) {
                toArray[i][j] = fromArray[i][j];
            }
        }
        return toArray;
    }
    Go.copyFrom = copyFrom;
})(Go || (Go = {}));
var Go;
(function (Go) {
    (function (Value) {
        Value[Value["EMPTY"] = 0] = "EMPTY";
        Value[Value["PLAYER_1"] = 1] = "PLAYER_1";
        Value[Value["PLAYER_2"] = 2] = "PLAYER_2";
        Value[Value["OUT_OF_BOUNDS"] = 3] = "OUT_OF_BOUNDS";
        Value[Value["AAARGH_AN_ERROR"] = 4] = "AAARGH_AN_ERROR";
    })(Go.Value || (Go.Value = {}));
    var Value = Go.Value;
    function otherValue(value) {
        if (value == 1 /* PLAYER_1 */) {
            return 2 /* PLAYER_2 */;
        }
        else if (value == 2 /* PLAYER_2 */) {
            return 1 /* PLAYER_1 */;
        }
        else {
            return 4 /* AAARGH_AN_ERROR */;
        }
    }
    Go.otherValue = otherValue;
})(Go || (Go = {}));
/// <reference path="extensions.ts" />
/// <reference path="cell-finder.ts" />
/// <reference path="cell.ts" />
/// <reference path="values.ts" />
var Go;
(function (Go) {
    function addMove(x, y, value) {
        if (canMove(Go.GameService.Instance.board, x, y, value)) {
            Go.GameService.Instance.board[x][y] = value;
            takePieces(Go.GameService.Instance.board, x, y, value);
            Go.sendMove(x, y);
            Go.MemoryService.Instance.add(Go.copyFrom(Go.GameService.Instance.board));
            Go.GameService.Instance.switchColour();
            if (Go.GameService.Instance.gameMode == 0 /* Local */) {
                Go.PlayerService.Instance.switchSides();
            }
            if (Go.GameService.Instance.gameMode == 2 /* AI */) {
            }
        }
        else {
            return;
        }
        Go.updateDisplay();
        if (Go.getLegalMoves().length == 0) {
            Go.gameOver();
        }
    }
    Go.addMove = addMove;
    function removeMove(targetArray, x, y) {
        targetArray[x][y] = 0;
    }
    function passesKoRule(x, y, value) {
        var history = Go.MemoryService.Instance.history;
        if (history.length < 3) {
            return true;
        }
        var testArray = [];
        testArray = Go.copyFrom(Go.GameService.Instance.board);
        // todo: actually needs to take pieces, otherwise this will not be getting correct latest move
        testArray[x][y] = value;
        takePieces(testArray, x, y, value);
        // passes ko rule test array not the same as last time you moved
        var result = !Go.arraysEqual(testArray, history[history.length - 2]); // !ARRAYminus2.equals(testArray);
        return result;
    }
    function canMove(targetArray, x, y, value) {
        var isEmpty = targetArray[x][y] == 0;
        var isPlayerTurn = true;
        // only true for actual turn in game
        if (Go.arraysEqual(Go.GameService.Instance.board, targetArray)) {
            isPlayerTurn = (value == Go.GameService.Instance.Colour);
        }
        var ko = passesKoRule(x, y, value);
        var willPlaceNicely = notSuicide(targetArray, x, y, value);
        return isEmpty && isPlayerTurn && ko && willPlaceNicely;
    }
    Go.canMove = canMove;
    function notSuicide(targetArray, x, y, value) {
        var testArray = [];
        testArray = Go.copyFrom(targetArray);
        var noTakeArray = [];
        noTakeArray = Go.copyFrom(targetArray);
        noTakeArray[x][y] = value;
        testArray[x][y] = value;
        takePieces(testArray, x, y, value);
        var willRemove = false;
        // this equals is returning a bad value... seems takepieces does not work
        if (!Go.arraysEqual(testArray, noTakeArray)) {
            willRemove = true;
        }
        // need to calculate whether item must remove enemy pieces.
        var mustRemovePiece = mustRemove(targetArray, x, y, value);
        if (!mustRemovePiece) {
            return true;
        }
        return willRemove;
    }
    function mustRemove(targetArray, x, y, value) {
        var testArray = Go.copyFrom(targetArray);
        testArray[x][y] = value;
        var cellGroup = getCellGroup(testArray, x, y);
        var emptyCount = 0;
        var enemyCount = 0;
        for (var i = 0; i < cellGroup.length; i++) {
            var adjacents = Go.getAdjacentCells(testArray, cellGroup[i].x, cellGroup[i].y);
            for (var j = 0; j < adjacents.length; j++) {
                if (adjacents[j].value == 0 /* EMPTY */) {
                    emptyCount++;
                }
                if (adjacents[j].value == Go.otherValue(value)) {
                    enemyCount++;
                }
            }
        }
        return emptyCount < 1;
    }
    // need to research how, and whether this actually works. Seems to break on all but active array.
    function takePieces(targetArray, x, y, value) {
        var placedValue = value;
        var enemyValue = Go.otherValue(value);
        var adjacentEnemies = Go.getAdjacentWithValue(targetArray, x, y, enemyValue);
        for (var i = 0; i < adjacentEnemies.length; i++) {
            var cellGroup = getCellGroup(targetArray, adjacentEnemies[i].x, adjacentEnemies[i].y);
            removeSurrounded(targetArray, cellGroup);
        }
    }
    // this now works great!
    function getCellGroup(targetArray, x, y) {
        var startCell = Go.getValue(targetArray, x, y);
        var cells = [];
        var queueCells = [startCell];
        while (queueCells.length > 0) {
            var researchCell = queueCells.pop();
            cells.push(researchCell);
            var adjacents = Go.getAdjacentWithValue(targetArray, researchCell.x, researchCell.y, startCell.value);
            for (var i = 0; i < adjacents.length; i++) {
                var addCell = true;
                for (var j = 0; j < cells.length; j++) {
                    if (adjacents[i].equalTo(cells[j])) {
                        addCell = false;
                        break;
                    }
                }
                for (var j = 0; j < queueCells.length; j++) {
                    if (adjacents[i].equalTo(queueCells[j])) {
                        addCell = false;
                        break;
                    }
                }
                if (addCell) {
                    queueCells.push(adjacents[i]);
                }
            }
        }
        return cells;
    }
    Go.getCellGroup = getCellGroup;
    function removeSurrounded(targetArray, cellGroup) {
        for (var i = 0; i < cellGroup.length; i++) {
            var nonZeroAdjacents = Go.getAdjacentNonZeroValuesCount(targetArray, cellGroup[i].x, cellGroup[i].y);
            //console.log("Non zero adjacents: " + nonZeroAdjacents + " at: (" + cellGroup[i].xPos + "," + cellGroup[i].yPos + ")");
            if (nonZeroAdjacents < 4) {
                return;
            }
        }
        for (var i = 0; i < cellGroup.length; i++) {
            removeMove(targetArray, cellGroup[i].x, cellGroup[i].y);
        }
    }
})(Go || (Go = {}));
/// <reference path="../values.ts" />
var Go;
(function (Go) {
    (function (GameMode) {
        GameMode[GameMode["Local"] = 0] = "Local";
        GameMode[GameMode["Online"] = 1] = "Online";
        GameMode[GameMode["AI"] = 2] = "AI";
    })(Go.GameMode || (Go.GameMode = {}));
    var GameMode = Go.GameMode;
    var GameService = (function () {
        function GameService() {
            this.gameMode = 0 /* Local */;
            this._colour = 1 /* PLAYER_1 */;
        }
        Object.defineProperty(GameService.prototype, "Colour", {
            get: function () {
                return this._colour;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameService, "Instance", {
            get: function () {
                if (!GameService._instance) {
                    GameService._instance = new GameService();
                }
                return GameService._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameService.prototype.newGame = function (size) {
            this._colour = 1 /* PLAYER_1 */;
            Go.MemoryService.Instance.clearHistory();
            this.board = [];
            for (var i = 0; i < size; i++) {
                this.board.push([]);
                for (var j = 0; j < size; j++) {
                    this.board[i][j] = 0 /* EMPTY */;
                }
            }
        };
        GameService.prototype.setColour = function (val) {
            this._colour = val;
        };
        GameService.prototype.switchColour = function () {
            this._colour = Go.otherValue(this._colour);
        };
        return GameService;
    })();
    Go.GameService = GameService;
})(Go || (Go = {}));
var Go;
(function (Go) {
    var MemoryService = (function () {
        function MemoryService() {
            this.history = [];
        }
        Object.defineProperty(MemoryService, "Instance", {
            get: function () {
                if (!MemoryService._instance) {
                    MemoryService._instance = new MemoryService();
                }
                return MemoryService._instance;
            },
            enumerable: true,
            configurable: true
        });
        MemoryService.prototype.add = function (newArray) {
            this.history.push(newArray);
        };
        MemoryService.prototype.clearHistory = function () {
            this.history = [];
        };
        return MemoryService;
    })();
    Go.MemoryService = MemoryService;
})(Go || (Go = {}));
var Go;
(function (Go) {
    var PlayerService = (function () {
        function PlayerService() {
            this.player = 1 /* PLAYER_1 */;
        }
        Object.defineProperty(PlayerService, "Instance", {
            get: function () {
                if (!PlayerService._instance) {
                    PlayerService._instance = new PlayerService();
                }
                return PlayerService._instance;
            },
            enumerable: true,
            configurable: true
        });
        PlayerService.prototype.setWhite = function () {
            this.player = 1 /* PLAYER_1 */;
        };
        PlayerService.prototype.setBlack = function () {
            this.player = 2 /* PLAYER_2 */;
        };
        PlayerService.prototype.switchSides = function () {
            this.player = Go.otherValue(this.player);
        };
        PlayerService.prototype.otherPlayer = function () {
            if (this.player == 1 /* PLAYER_1 */) {
                return 2 /* PLAYER_2 */;
            }
            return 1 /* PLAYER_1 */;
        };
        return PlayerService;
    })();
    Go.PlayerService = PlayerService;
})(Go || (Go = {}));
//# sourceMappingURL=@script.js.map