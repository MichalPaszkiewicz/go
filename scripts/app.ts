module Go {

    $('.him-her').keypress(function (e) {
            if (e.keyCode == 13)
                $('#connect').click();
        });
        $('.message').keypress(function (e) {
            if (e.keyCode == 13)
                $('#send').click();
        });

        function setTable(newSize) {
            GameService.Instance.newGame(newSize)
            GameService.Instance.gameMode = parseInt($("#game-mode-select").val());
            $("table").html(getNewTableHtml(newSize));	
            $("table").removeClass("hidden");
            if(GameService.Instance.isHost && GameService.Instance.gameMode == GameMode.Online)
            {
            	$("#GamesSettingsLink").removeClass("hidden");
            }
            if (GameService.Instance.gameMode == GameMode.Local
                || GameService.Instance.gameMode == GameMode.AI)
            {
            	$("#GamesSettingsLink").addClass("hidden");
            }
           
           updateDisplay(); 
           
           $("#player-notifier").removeClass("hidden");
        };
        
        function getNewTableHtml(newSize)
        {
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
        
        //setTable(11);

        declare var CodeMirror: any;

        var customCodeNode = document.getElementById("custom-coder");
        var myCodeMirror = CodeMirror(customCodeNode, {
            lineNumbers: true,
            theme: "ambiance"
        });
        
        function resetCode()
        {
        	myCodeMirror.getDoc().setValue("\t/***Insert code here!***/\r\n\t/*You can get the values on the board from: array[x][y]*/\r\n\tvar legalMoves = Go.getLegalMoves();\r\n\tvar lm = Math.floor(legalMoves.length * Math.random());\r\n\tvar x = legalMoves[lm].x;\r\n\tvar y = legalMoves[lm].y;\r\n\tvar player = Go.GameService.Instance.Colour;\r\n\tGo.addMove(x,y,player);");
        }
        
        var localCode = localStorage.getItem("go-AI.js");
        
        if(localCode != null)
        {
        	myCodeMirror.setValue(localCode);
        }
        else
        {
        	resetCode();
        }

        $("#custom-coder").append("<div class='custom-coder-settings'><input id='IsUserAI' type='checkbox' name='IsUserAI'>Run code automatically</input>" 
            + "<button onclick='Go.autoMove()'>Run code</button>"
            + "<button onclick='localStorage.setItem(\"go-AI.js\", myCodeMirror.getValue())'>Save code</button>"
            + "<button onclick='resetCode()'>Reset</button>"
            + "<div class='clearfix'></div></div>");

	export function autoMove()
	{
		eval(myCodeMirror.getValue());
		if(GameService.Instance.gameMode == GameMode.AI)
		{
			aiMove();
		}
	}
	
	export function newSettings()
    {
        MemoryService.Instance.clearHistory();
		if($("#game-mode-select").val() == "online")
		{
			PlayerService.Instance.player = parseInt($('input[name=player]:checked').val());
		}
		else
        {
            PlayerService.Instance.setWhite();
            GameService.Instance.setColour(Value.PLAYER_1);
        }
        GameService.Instance.isHost = true;
		setTable($('#BoardSize').val());
	}
	
	$("#game-mode-select").change(function(){
		if($("#game-mode-select").val() == "online")
		{
			$(".player-item").removeClass("hidden");
		}
		else
		{
			$(".player-item").addClass("hidden");	
		}
		
	});
	
	console.log("%c" + "A website made by Michal Paszkiewicz", "color: aliceBlue; text-shadow: black 1px 1px 4px; font-size: 40px;")

}