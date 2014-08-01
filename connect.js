// Connect to PeerJS, have server assign an ID instead of providing one
// Showing off some of the configs available with PeerJS :).
var peer = new Peer({
    // Set API key for cloud server (you don't need this if you're running your
    // own.
    key: '9t3v4nsdk6ueg66r',

    // Set highest debug level (log everything!).
    debug: 3,

    // Set a logging function:
    logFunction: function() {
        var copy = Array.prototype.slice.call(arguments).join(' ');
        $('.log').append(copy + '<br>');
    },

    // Use a TURN server for more network support
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' }
    ]} /* Sample servers, please use appropriate ones */
});

var connectedPeers = {};

// Show this peer's ID.
peer.on('open', function(id){
    $(".me").val(id);
	
	if(location.search.length == 0)
	{
		player = vWhite;
		
	$("#GamesSettingsLink").removeClass("hidden");
	
	$(".friend-link").val(location.href + "?id=" + id);
	
	$(".friend-link").click(function(){ $(this).select() });
	
	}
	else
	{
		player = vBlack;
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

        c.on('data', function(data) {
		
			// if data is a move, don't print!
			if(data.indexOf("goMove=") > -1)
			{
				//console.log(data);
				
				var tdID = data.substring(data.indexOf('=')+1);
				
				var xPos = parseInt(tdID.substring(tdID.indexOf("i") + 1));
				var yPos = parseInt(tdID.substring(tdID.indexOf("j") + 1));
			
				addMove(xPos, yPos, otherValue(player));
				
				//console.log(tdID);
				
			    //$("#" + tdID).find("div").addClass("black");

				if ($('#IsUserAI').is(':checked'))
				{
				    autoMove();
				}
			}
			else if(data.indexOf("goRemove") > -1)
			{
			    //console.log(data);

			    var tdID = data.substring(data.indexOf('=') + 1);

			    //console.log(tdID);

			    //$("#" + tdID).find("div").removeClass("black white");
			}
			else if(data.indexOf("goSettings=") > -1)
			{
			    var settingsString = data.substring(data.indexOf('=') + 1);

			    var newSize = parseInt(settingsString.substring(settingsString.indexOf("s") + 1));
			    player = parseInt(settingsString.substring(settingsString.indexOf("p")));

			    setTable(newSize);
			}
			else
			{		
				dataDiv.append('<p>' + c.peer + ':</p><p>' + data +
				'</p>');

				dataDiv.scrollTop(dataDiv.prop("scrollHeight"));
			}
        });
        c.on('close', function() {
            alert(c.peer + ' has left the chat.');

            //if ($('.connection').length === 0) {
               // $('.filler').show();
            //}
            delete connectedPeers[c.peer];
        });
    } else if (c.label === 'file') {
        c.on('data', function(data) {
            // If we're getting a file, create a URL for it.
            if (data.constructor === ArrayBuffer) {
                var dataView = new Uint8Array(data);
                var dataBlob = new Blob([dataView]);
                var url = window.URL.createObjectURL(dataBlob);
                dataDiv.append('<p>' +
                    c.peer + ' has sent you a <a target="_blank" href="' + url + '">file</a>.</p>');
            }
        });
    }
}

$(document).ready(function () {


    var dataDiv = $("div.data");
    // Prepare file drop box.
    var box = $('#box');
    box.on('dragenter', doNothing);
    box.on('dragover', doNothing);
    box.on('drop', function(e){
        e.originalEvent.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];
        eachActiveConnection(function(c, $c) {
            if (c.label === 'file') {
                c.send(file);
                $c.find('div.data').append('<p>You sent a file.</span></p>');
            }
        });
    });
    function doNothing(e){
        e.preventDefault();
        e.stopPropagation();
    }
	
	if(location.search.length > 0)
	{
		var requestedPeer = location.search.substring(location.search.indexOf("=") + 1);
		
		if(!connectedPeers[requestedPeer]){
			var c = peer.connect(requestedPeer, {
				label: 'chat',
				serialization: 'none',
				reliable: false,
				metadata: {message: 'hi i want to chat with you!'}
				});
			c.on('open', function() {
				connect(c);
				});
			c.on('error', function(err){ alert(err);});
			var f = peer.connect(requestedPeer, {label: 'file' });
			f.on('open', function(){
				connect(f);
				});
			f.on('error', function(err){ alert(err);});
		
		}
		
		connectedPeers[requestedPeer] = 1;	
	}

    // Connect to a peer
    $('#connect').click(function() {
        requestedPeer = $('.him-her').val().trim();
        if (!connectedPeers[requestedPeer]) {
            // Create 2 connections, one labelled chat and another labelled file.
            var c = peer.connect(requestedPeer, {
                label: 'chat',
                serialization: 'none',
                reliable: false,
                metadata: {message: 'hi i want to chat with you!'}
            });
            c.on('open', function() {
                connect(c);
            });
            c.on('error', function(err) { alert(err); });
            var f = peer.connect(requestedPeer, { label: 'file' });
            f.on('open', function() {
                connect(f);
            });
            f.on('error', function(err) { alert(err); });
        }
        connectedPeers[requestedPeer] = 1;
    });
	
    //$("td").click(function () {
    $("#games-table").on('click', 'td', function(){
			//$(this).find("div").addClass("white");
			
			var itemID = $(this).attr('id')
			
			var xPos = parseInt( itemID.substring(itemID.indexOf("i") + 1) );
			var yPos = parseInt( itemID.substring(itemID.indexOf("j") + 1) )
			
			addMove(xPos, yPos, player );
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
    $('#close').click(function() {
        eachActiveConnection(function(c) {
            c.close();
        });
    });

    // Send a chat message to all active connections.
    $('#send').click(function (e) {

        //console.log("Sent:" + e);

        e.preventDefault();
        // For each active connection, send the message.
        var msg = $(".message").val();

        eachActiveConnection(function(c, $c) {
            if (c.label === 'chat') {
                c.send(msg);
                $('div.data').append('<p>You: </p><p>' + msg
                  + '</p>');
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

function sendMove(x, y)
{
    var msg = "goMove=" + "i" + x + "j" + y;

    //console.log(msg);

    eachActiveConnection(function (c, $c) {
        if (c.label === 'chat') {
            c.send(msg);
        }
    });
}

function sendSettings() {
    var msg = "goSettings=" + "s" + size + "p" + player;

    //console.log(msg);

    eachActiveConnection(function (c, $c) {
        if (c.label === 'chat') {
            c.send(msg);
        }
    });
}

// Make sure things clean up properly.

window.onunload = window.onbeforeunload = function(e) {
    if (!!peer && !peer.destroyed) {
        peer.destroy();
    }
};
