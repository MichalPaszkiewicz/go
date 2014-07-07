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
    $(".me").val(id)
});

// Await connections from others
peer.on('connection', connect);

// Handle a connection object.
function connect(c) {

    var dataDiv = $("div.data");
    // Handle a chat connection.
    if (c.label === 'chat') {

        var chatbox = $('<div>' + c.peer + 'has connected</div>').addClass('connection').addClass('active').attr('id', c.peer);
        chatbox.appendTo('.data');

        c.on('data', function(data) {
            dataDiv.append('<p>' + c.peer + ':</p><p>' + data +
              '</p>');
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

    // Connect to a peer
    $('#connect').click(function() {
        requestedPeer = $('.him-her').val();
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

    // Close a connection.
    $('#close').click(function() {
        eachActiveConnection(function(c) {
            c.close();
        });
    });

    // Send a chat message to all active connections.
    $('#send').click(function (e) {

        console.log("Sent:" + e);

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
    });

    // Goes through each active peer and calls FN on its connections.
    function eachActiveConnection(fn) {
        var actives = $('.active');
        var checkedIds = {};
        actives.each(function() {
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

    // Show browser version
    $('#browsers').text(navigator.userAgent);
});

// Make sure things clean up properly.

window.onunload = window.onbeforeunload = function(e) {
    if (!!peer && !peer.destroyed) {
        peer.destroy();
    }
};