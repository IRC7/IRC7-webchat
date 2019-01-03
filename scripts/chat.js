// Math Functions
function Rand(min,max) {
	return Math.floor((Math.random() * max) + min);
}

// HTML functions
var _bDrawDebug = false;

function htmlEncode(value){
  return anchorme($('<div/>').text(value).html(),
	  {
		attributes:[
			{
				name:"target",
				value:"_blank"
			}
		]
	  }
  );
}

function _loadCSS() {
	var linkCSS = document.createElement("link");
	linkCSS.type = "text/css";
	linkCSS.rel = "stylesheet";
	linkCSS.href = "app_themes/default/chat.css";
	document.head.appendChild(linkCSS);
}

function _createElement(elementType, parent, id, className) {
	var div = document.createElement(elementType);

	if (className != null) { div.className = className; }
	else { div.className = id; }

	div.id = id;
	if (_bDrawDebug) { div.style.border = "1px solid rgb(" + Rand(1,255) + "," + Rand(1,255) + "," + Rand(1,255) + ")"; }
	parent.appendChild(div);
	return div;
}

function _createDiv(parent,id,className) {
	return _createElement("div", parent, id, className);
}
function _setDivSize(div,x,y,width,height) {
	div.style.top = y;
	div.style.left = x;
	div.style.width = width;
	div.style.height = height;
}
function EnableDebugDrawing() {
	_bDrawDebug = true;
}

// Chat Control

var _bTimeStamps = true;

// Consts
var Admin = 0x8;
var Owner = 0x4;
var Host = 0x2;
var Voice = 0x1;
var Normal = 0x0;

function CreateChatControl() {
	var _chatControl = _createDiv(document.body,"chatControl");
	var _chatBody = _createDiv(_chatControl,"chatBody");
	var _chatPane = _createDiv(_chatBody, "chatPane");
	var _chatHeader = _createDiv(_chatPane, "chatTitle", "chatHeader");

	_chatHeader.innerHTML = "<center><strong>" + ChatControl.Topic + "</center></strong>"

	var channel = _createDiv(_chatPane, "channel");
	_chatControl.channel = channel;

	var channelInput = _createElement("input", _chatPane, "", "inputBox");
	channelInput.name = "channelInput";
	channelInput.type = "text";
	channelInput.onkeypress = function(event) {
		if (event.which == 13) {
			SendMessage();
		}
	}

	var submitButton = _createElement("input", _chatPane, "", "submitButton");
	submitButton.name = "channelSubmit";
	submitButton.type = "button";
	submitButton.value = "Send";
	submitButton.onclick = function(event) {
		SendMessage();
	}

	var actionButton = _createElement("input", _chatPane, "", "actionButton");
	actionButton.name = "channelAction";
	actionButton.type = "button";
	actionButton.value = "!";
	actionButton.onclick = function(event) {
		SendAction();
	}

	var _infoPane = _createDiv(_chatBody, "infoPane");
	var _chatHeader = _createDiv(_infoPane, "chatHeader");
	_chatHeader.innerHTML = "<img src='images/ssl.gif' /> " + ChatControl.RoomName.replace("%#","").replace("\\b"," ").replace("\\c", ",").replace("\\\\","\\");

	var _userInfo = _createDiv(_infoPane, "userInfo");
	_userInfo.innerHTML = "";

	var _nickList = _createDiv(_infoPane, "nickList");

	_chatControl.Nicklist = _createElement("ul", _nickList, "", "");
	_chatControl.UserInfo = _userInfo;
	_chatControl.InputBox = channelInput;

	return _chatControl;
}

function _init() {
	ChatControl.User = CreateMember();;
	ChatControl.Members.length = 0;
	_clearNicklist();
}
function _clearNicklist() {
	while (ChatControl.Control.Nicklist.firstChild) {
		ChatControl.Control.Nicklist.removeChild(ChatControl.Control.Nicklist.firstChild);
	}
}

let initNickname = ''
let createChannel = ''
let createCategory = ''
let createTopic = ''
let createKey = 'k' + md5(Date.now()).substring(0,16)
	
function _parseTopic(topic) {
	return '%' + topic.substring(0,60).replace(/ /g,'\\b').replace(/,/g,'\\c');
}

function CreateChannel(chan,cat,topic) {
	createChannel = chan;
	createCategory = cat;
	createTopic = _parseTopic(topic);
}

function RenderChat(serverName, serverPort, nickName, channelName, channelTopic, Ticket, Profile, RegCookie) {
	_loadCSS();
	ChatControl.ServerHostname = serverName;
	ChatControl.ServerPORT = serverPort;
	ChatControl.User = CreateMember();
	ChatControl.User.nickname = initNickname = nickName;
	ChatControl.RoomName = channelName;
	ChatControl.Topic = channelTopic;
	ChatControl.Ticket = Ticket;
	ChatControl.Profile = Profile;
	ChatControl.RegCookie = RegCookie;
	ChatControl.Control = CreateChatControl();
	ChatControl.SelectedUser = null;
	
	if (ChatControl.Ticket == "" || ChatControl.Profile == "") { ChatControl.Guest = true; }
	else { ChatControl.Guest = false; }
	
	_init()

	sock = new primusIrcJS(ChatControl.ServerHostname, ChatControl.ServerPORT, true)
	sock.removeListener('connect') // Stop the default listener, so we can auth. #ALWAYS DO THIS FIRST
	sock.showDebug(true);
	sock
		.on('disconnect', () => {
			ServerMessage("*** Disconnected");
		})
		// .on('connect', () => { _init(); })
		.on('ACTION', (text) => { UserAction(sock.event.nick, text); } )
		.on('PRIVMSG', (text) => { AddMessage(ChatControl.Members[FindMember(sock.event.nick)],text); })
		.on('NOTICE', (text) => console.log(`-${ sock.event.nick }- ${ text }`))
		.on('CTCP', (cmd, text) => { console.log(`[${ sock.event.nick } ${ cmd }] ${ text }`) })
		.on('CTCPREPLY', (cmd, text) => console.log(`[${ sock.event.nick } ${ cmd } reply] ${ text }`))
		.on('JOIN', (data) => {
			var user;

			if (ChatControl.Members.length == 0) {
				user = ChatControl.User;
			}
			else {
				user = CreateMember();
			}

			DigestProfile(user, data.split(","));
			user.nickname = sock.event.nick;
			user.address = sock.event.address;
			AddMember(user);

			UserJoin(user.nickname);
		})
		.on('PART', (data) => {
			UserPart(sock.event.nick);
		})
		.on('QUIT', (data) => {
			UserQuit(sock.event.nick, data);
		})
		.on('KICK', (data) => {
			// quick and dirty doesnt work for :: and waiting for JD fix
			UserKick(ChatControl.Members[FindMember(sock.event.nick)], sock.event.target, sock.event.rawMsg.split(":")[2]);
		})
		.on('KILL', (data) => {
			UserKill(ChatControl.Members[FindMember(sock.event.nick)], sock.event.target, sock.event.rawMsg.split(":")[2]);
		})
		.on('MODE', (data) => {

			var params = data.split(" ");

			switch (params[0].substr(1,1)) {
				case "q": case "o": case "v":{
					SetMode(sock.event.nick, params[1], params[0]);
					UpdateNicklist();
					break;
				}
				default:{
					// normal channel mode
					break;
				}
			}

		})
		.on('NICK', (data) => {
			SetNick(sock.event.nick, data);
			UserNickChange(sock.event.nick, data);
		})
		.on('WHISPER', (data) => {
			// quick and dirty doesnt work for :: and waiting for JD fix
			UserWhisper(sock.event.nick, sock.event.rawMsg.split(":")[2]);
		})
		.on('raw 353', (data) => {
		  ParseChannelNames(data.params[3]);
		})
		.on('raw 433', (data) => {
		  // Nickname in use
		  sock.setNickname(ChatControl.User.nickname + "_?????");
		  ChatControl.User.nickname = sock.client.me;
		  sock.send(`JOIN ${ ChatControl.RoomName }`);
		})
		.on('raw 403', (data) => {
			// No such channel
			sock.send(`CREATE GN ${ ChatControl.RoomName } ${ ChatControl.RoomName } - EN-US 1 ${ createKey } 0`);
		})
		.on('raw 818', (data) => {
		  // PUID Check 
		  if (data.params[2] == "PUID") {
			  OpenProfile(data.params[3]);
		  }
		})

		// Otherwise no need to set NickName as it is in RegCookie
		sock.connect((sock) => {
			_init()
			ServerMessage("<div style='color: red'>Connected</div>");
			sock.removeListener('connect') // Remove default ircJS listener
			sock['server'] = sock.hostname // --\ These are to replicate the ircJS
			sock.connectionState = 1       // --/ internal methods called on connect.

			const authProvider = new GateKeeper('irc.irc7.com')
			  // Note: race condition issue
			  sock.send(`IRCVERS IRC8 ircJS en-us :${ sock._versionString }`)
			  sock.send(authProvider.init(ChatControl.Ticket, ChatControl.Profile))

			  sock.on('AUTH', (sequence, parameter) => {
				if (sequence === 'S') sock.send(authProvider.subsequent(parameter))
						if (sequence === '*') {
							if (ChatControl.Regcookie != "") {
								sock.send(`PROP $ MSNREGCOOKIE :${ ChatControl.RegCookie }`)
							}
							
							var nickPrefix = (ChatControl.Guest ? '>' : '')
							sock.setNickname(nickPrefix + initNickname)
							console.log(JSON.stringify(ChatControl.User))
							
							
							if (createChannel !== "") {
								sock.send(`CREATE ${ createCategory } ${ createChannel } ${ createTopic } - EN-US 1 ${ createKey } 0`);
							}
							else {
								sock.send('JOIN ' + ChatControl.RoomName);
							}
						}
				})
		})

}

// GateKeeper class
class GateKeeper {
  constructor(hostname = '') {
    this.hostname = hostname
    this.packageName = 'GateKeeper'
  }

  init(passportTicket, passportProfile) {
    if ((typeof passportTicket !== 'undefined') &&
        (typeof passportProfile !== 'undefined')) {
      this.passportTicket = passportTicket
      this.passportProfile = passportProfile
      this.packageName = 'GateKeeperPassport'
    }
    return `AUTH ${ this.packageName } I :${ this.escape('GKSSP\0\0\0\u0003\0\0\0\u0001\0\0\0') }`
  }

  subsequent(parameter) {
	  if (parameter != "OK") {
		const challenge = this.unescape(parameter).substr(16)
		const result = md5(challenge + this.hostname, 'SRFMKSJANDRESKKC', true)
			// const result = md5(challenge + this.hostname, 'SRFMKSJANDRESKKC', true) + 'ffffffffffffffff'
		return `AUTH ${ this.packageName } S :${ this.escape(`GKSSP\0\0\0\u0003\0\0\0\u0003\0\0\0${ result }`) }`
	  }
	  else {
		  var sTicketLen = this.passportTicket.length.toString(16);
		  sTicketLen = "0".repeat(8 - sTicketLen.length) + sTicketLen;
		  
		  var sProfileLen = this.passportProfile.length.toString(16);
		  sProfileLen = "0".repeat(8 - sProfileLen.length) + sProfileLen;

		  var sPassportString = sTicketLen + this.passportTicket + sProfileLen + this.passportProfile;
		  return `AUTH ${ this.packageName } S :${ sPassportString }`
	  }
  }

  escape(string) {
    const escapeChars = ['0', 't', 'n', 'r', 'b', 'c', '\\'],
          charCodes = [0x00, 0x09, 0x0A, 0x0D, 0x20, 0x2C, 0x5C]
    let escapedString = ''
    for (let i = 0; i < string.length; i++) {
      const location = charCodes.indexOf(string.charCodeAt(i))
      if (location != -1)
        escapedString += `\\${ escapeChars[location] }`
      else
        escapedString += string[i]
    }
    return escapedString
  }

  unescape(string) {
    const escapeChars = ['0', 't', 'n', 'r', 'b', 'c', '\\'],
          charCodes = [0x00, 0x09, 0x0A, 0x0D, 0x20, 0x2C, 0x5C]
    let escapedString = ''
    for (let i = 0; i < string.length; i++) {
      if (string[i] == '\\') {
        let location = escapeChars.indexOf(string[i+1])
        if (location != -1) {
          escapedString += String.fromCharCode(charCodes[location])
          i++
        }
        else
          escapedString += string[i]
      }
      else
        escapedString += string[i]
    }
    return escapedString
  }

}


// Chat Control - User Functions

function Action(msg) {
	sock.send(`PRIVMSG ${ ChatControl.RoomName } :` + String.fromCharCode(1) + `ACTION ${ msg }` + String.fromCharCode(1));
	UserAction(FormatNickname(ChatControl.User.nickname), msg);
}

function SendAction() {
	if (ChatControl.Control.InputBox.value != "") {
		Action(ChatControl.Control.InputBox.value);
		ChatControl.Control.InputBox.value = "";
	}
}
function SendMessage() {
	var msg = ChatControl.Control.InputBox.value;
	if (msg != "") {

		if (msg.substr(0,1) != "/") {
			sock.send(`PRIVMSG ${ ChatControl.RoomName } :${ msg }`);
			AddMessage(ChatControl.User, msg);
		}
		else {
			msg = msg.substr(1);
			//ServerMessage(`*** Processing Command: ${ msg }`)
			ProcessCommand(msg);
		}
		ChatControl.Control.InputBox.value = "";

	}
}

function ViewProfile(nickname) {
	
	sock.send(`PROP ${ nickname } PUID`);
	
}
function OpenProfile(puid) {
	window.open("view_profile.aspx?puid=" + puid,"_blank");
}

function ProcessCommand(msg) {

	var params = msg.split(" ");
	if (params.length > 0) {
		switch (params[0].toUpperCase()) {
			case 'QUIT':{
				var reason = msg.substr(params[0].length + 1);
				sock.send(`QUIT :${ reason }`);
				break;
			}
			case 'CONNECT':{
				_init();
				sock.connect((sock) => {
					ServerMessage("*** Connected to server");
					sock.send('JOIN ' + ChatControl.RoomName);
				})
				break;
			}
			case 'NICK':{
				sock.setNickname(params[1]);
				break;
			}
			case 'ME':{
				Action(msg.substr(3));
				break;
			}
			default:{
				sock.send(msg);
			}
		}
	}

}

// Chat Control - Chat & Event Functions

function UpdateScroll() {
	ChatControl.Control.channel.scrollTop = ChatControl.Control.channel.scrollHeight;
}
function UserKill(user, nickName, reason) {
	var _kickDiv = _createDiv(ChatControl.Control.channel, "", "comment kick");
	if (reason != "") { reason = " (" + reason + ")"; }

	_kickDiv.innerHTML = FormatNickname(user.nickname) + " has killed " + FormatNickname(nickName) + reason;
	RemoveMember(nickName);
	UpdateScroll();
}
function UserKick(user, nickName, reason) {
	var _kickDiv = _createDiv(ChatControl.Control.channel, "", "comment kick");
	if (reason != "") { reason = " (" + reason + ")"; }

	_kickDiv.innerHTML = FormatNickname(user.nickname) + " has kicked " + FormatNickname(nickName) + reason;
	RemoveMember(nickName);
	UpdateScroll();
}
function UserJoin(nickName) {
	var _joinDiv = _createDiv(ChatControl.Control.channel, "", "comment chatEvent");
	_joinDiv.innerHTML = FormatNickname(nickName) + " has joined the conversation";
	UpdateScroll();
}
function UserPart(nickName) {
	var _partDiv = _createDiv(ChatControl.Control.channel, "", "comment chatEvent");
	_partDiv.innerHTML = FormatNickname(nickName) + " has left the conversation";
	RemoveMember(nickName);
	UpdateScroll();
}
function UserQuit(nickName, reason) {
	var _quitDiv = _createDiv(ChatControl.Control.channel, "", "comment quit");

	if (reason != "") { reason = " (" + reason + ")"; }

	_quitDiv.innerHTML = FormatNickname(nickName) + " has quit the conversation" + reason;
	RemoveMember(nickName);
	UpdateScroll();
}
function UserAction(nickName, message) {
	var _actionDiv = _createDiv(ChatControl.Control.channel, "", "comment action");
	_actionDiv.innerHTML = FormatNickname(nickName) + " " + htmlEncode(message);
	UpdateScroll();
}
function UserWhisper(nickName, message) {
	var _whisperDiv = _createDiv(ChatControl.Control.channel, "", "comment whisper");
	_whisperDiv.innerHTML = "<strong>" + FormatNickname(nickName) + "</strong> whispers to <strong>" + FormatNickname(ChatControl.User.nickname) + ":</strong> " + htmlEncode(message);
	UpdateScroll();
}
function UserMode(nickName, targetNickname, mode) {
	var _userMode = _createDiv(ChatControl.Control.channel, "", "comment chatEvent");
	nickName = FormatNickname(nickName);
	targetNickname = FormatNickname(targetNickname);
	_userMode.innerHTML = `${ nickName } has made ${ targetNickname } ${ mode }`;
	UpdateScroll();
}

function UserNickChange(nickName, newNickname) {
	var _userNick = _createDiv(ChatControl.Control.channel, "", "comment chatEvent");
	nickName = FormatNickname(nickName);
	newNickname = FormatNickname(newNickname);
	_userNick.innerHTML = `${ nickName } is now known as ${ newNickname }`;
	UpdateScroll();
}

function ServerMessage(message) {
	var _servDiv = _createDiv(ChatControl.Control.channel, "", "comment chatEvent");
	_servDiv.innerHTML = message;
	UpdateScroll();
}

function ReplaceEmoji(message) {
	return message.replace(":)","🙂").replace(":(","🙁").replace("(L)","❤️").replace("(K)","👄").replace("(Y)","👍").replace(":D","😄").replace(":$","😳").replace(":S","😕").replace(":P","😜").replace(":O","😮");
}

function AddMessage(user,message) {

	var mode = user.chanmode;
	var commentColor, commentStatus;

	if (IsAdmin(user.modeFlag)) {
		commentColor = "purple";
		commentStatus = "butterfly";
	}
	else if (IsOwner(user.modeFlag)) {
		commentColor = "gold";
		commentStatus = "goldHammer";
	}
	else if (IsHost(user.modeFlag)) {
		commentColor = "brown";
		commentStatus = "brownHammer";
	}
	else {
		commentColor = "blue";
		commentStatus = "participant";
	}

	var _comment = _createDiv(ChatControl.Control.channel, "", "comment " + commentColor);
	var _messenger = _createDiv(_comment, "", "messenger");

	var _nickname = _createDiv(_messenger, "", "channelNicknameStatus " + commentStatus);
	_nickname.innerHTML = FormatNickname(user.nickname);

	var _message = _createDiv(_messenger, "", "message");
	_message.innerHTML = htmlEncode(ReplaceEmoji(message));

	UpdateScroll();
}

function DisplayUserInfo(user) {
	var userStatus, userStatusImg;

	if (IsAdmin(user.modeFlag)) {
		userStatus = "Admin";
		userStatusImg = "images/butterfly.bmp";
	}
	else if (IsOwner(user.modeFlag)) {
		userStatus = "Owner";
        userStatusImg = "images/gold.bmp";
	}
	else if (IsHost(user.modeFlag)) {
		userStatus = "Brown";
        userStatusImg = "images/brown.bmp";
	}
	else {
		userStatus = "Participant";
        userStatusImg = "images/normal.bmp";
	}

	var profileHtml = "";
	if ((user.nickname[0] != "'") && (user.nickname[0] != ">")) {
		profileHtml = "<div style=\"float: right; padding: 5px;\"><button onclick='ViewProfile(\"" + user.nickname + "\")'>View Profile</button></div>";
	}
	
    ChatControl.Control.UserInfo.innerHTML = "<div style=\"font-size: 20px; margin: 10px; display: inline-block; width: 230px;\"><img src=\'" + userStatusImg + "\'> " + 
											FormatNickname(user.nickname) + "</div>" + profileHtml;
													
}

// Mode functions

function SetNick(nickName, newNick) {
	var i = FindMember(nickName);
	if (i != null) {
		var user = ChatControl.Members[i];
		user.nickname = newNick;
		user.node.innerHTML = FormatNickname(newNick);
	}

	if (nickName == ChatControl.User.nickname) {
		ChatControl.User.nickname = newNick;
	}
}

function SetMode(nickName, targetNickname, mode) {

	var bModifier = true;

	var i = FindMember(targetNickname);
	if (i != null) {

		var user = ChatControl.Members[i];
		bModifier = (mode.substr(0,1) == "+" ? true : false);

		var c;
		for (c = 1; c < mode.length; c++) {
			var modeChar = mode.substr(c, 1);

			switch (modeChar) {
				case 'a':{
					SetAdmin(user, bModifier);
					break;
				}
				case 'q':{
					SetOwner(user, bModifier);
					break;
				}
				case 'o':{
					SetHost(user, bModifier);
					break;
				}
				case 'v':{
					SetVoice(user, bModifier);
				}
			}
			user.node.className = getUserIconClass(user.modeFlag);

			if (IsOwner(user.modeFlag)) { UserMode(nickName, targetNickname, "an Owner"); }
			else if (IsHost(user.modeFlag)) { UserMode(nickName, targetNickname, "a Host"); }
			else if (IsVoice(user.modeFlag)) { UserMode(nickName, targetNickname, "a Participant"); }
			else if (IsNormal(user.modeFlag)) { UserMode(nickName, targetNickname, "a Participant"); }
		}
	}
}

function IsAdmin(UserMode) { return ((Admin & UserMode) == Admin); }
function IsOwner(UserMode) { return ((Owner & UserMode) == Owner); }
function IsHost(UserMode) { return ((Host & UserMode) == Host); }
function IsVoice(UserMode) { return ((Voice & UserMode) == Voice); }
function IsNormal(UserMode) { return ((Normal | UserMode) == Normal); }

function SetAdmin(user, flag) {
	if (flag) { if (!IsAdmin(user.modeFlag)) { user.modeFlag += Admin; } }
	else { if (IsAdmin(user.modeFlag)) { user.modeFlag -= Admin; } }
}
function SetOwner(user, flag) {
	if (flag) { if (!IsOwner(user.modeFlag)) { user.modeFlag += Owner; } }
	else { if (IsOwner(user.modeFlag)) { user.modeFlag -= Owner; } }
}
function SetHost(user, flag) {
	if (flag) { if (!IsHost(user.modeFlag)) { user.modeFlag += Host; } }
	else { if (IsHost(user.modeFlag)) { user.modeFlag -= Host; } }
}
function SetVoice(user, flag) {
	if (flag) { if (!IsVoice(user.modeFlag)) { user.modeFlag += Voice; } }
	else { if (IsVoice(user.modeFlag)) { user.modeFlag -= Voice; } }
}

// User functions

function CreateMember() {

	var Member = {
		nickname: "",
		address: "",
		profile: "",
		modeFlag: "",
		node: null,
		away: false,
		admin: false,
		profileIcon: 0
	}
	return Member;
}

function FormatNickname(nickName) { return nickName.replace(">", "Guest_").replace("'","");  }

function strcmp ( str1, str2 ) {
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

function SortMembers() {

	ChatControl.Members.sort(
		function(userA,userB) {
			if (userA.modeFlag != userB.modeFlag) { return userB.modeFlag - userA.modeFlag; }
			else { return strcmp(userA.nickname,userB.nickname); }
		}
	);

}

function UpdateNicklist() {

	_clearNicklist();
	SortMembers();

	var i;
	for (i = 0; i < ChatControl.Members.length; i++) {
		let Member = ChatControl.Members[i];
		let classMode = getUserIconClass(Member.modeFlag);
		let user = _createElement("li", ChatControl.Control.Nicklist, "", "");
		user.className = "nickListSelectable " + classMode;
		user.innerHTML = FormatNickname(Member.nickname);
		user.Member = Member;
		Member.node = user;

		user.onclick = function(event) {
			DisplayUserInfo(Member);
			SelectMember(Member);
		}
	}

}


function AddMember(Member) {
	ChatControl.Members.push(Member);
	UpdateNicklist();
	return Member;
}

function RemoveMember(memberName) {
	var i = FindMember(memberName);
	if (i != null) {
		ChatControl.Control.Nicklist.removeChild(ChatControl.Members[i].node);
		ChatControl.Members.splice(i, 1);
	}
}

function FindMember(memberName) {
	var i;
	for (i = 0; i < ChatControl.Members.length; i++) {
		if (ChatControl.Members[i].nickname == memberName) {
			return i;
		}
	}
}

function SelectMember(user) {
	DeselectUser();
	ChatControl.Control.SelectedUser = user;
	user.node.classList.add("nickListSelected");
}
function DeselectUser() {
	if (ChatControl.Control.SelectedUser != null) {
		ChatControl.Control.SelectedUser.node.classList.remove("nickListSelected");
	}
}

function getUserIconClass(modeFlag) {
	var classMode;

	if (IsAdmin(modeFlag)) {
		return "nickListButterfly";
	}
	else if (IsOwner(modeFlag)) {
		return "nickListGoldHammer";
	}
	else if (IsHost(modeFlag)) {
		return "nickListBrownHammer";
	}
	else {
		// profile logic
		return "nickListParticipant";

	}
}

function DigestProfile(user, params) {
		var mode = 0;
		var away = false;
		var admin = false;

		if (params.length > 3) {
			var nick = params[3];
			switch (nick.substr(0,1)) {
				case '.':{
					mode = Owner;
					nick = nick.substr(1);
					break;
				}
				case '@':{
					mode = Host;
					nick = nick.substr(1);
					break;
				}
				case '+':{
					mode = Voice;
					nick = nick.substr(1);
					break;
				}
			}
			user.nickname = nick;
		}

		if (params[0] == 'G') { away = true; }
		if (params[1] == "A") { admin = true; mode = Admin; }

		user.modeFlag = mode;

		user.away = away;
		user.admin = admin;
}

function ParseChannelNames(names) {

	var nameList = names.split(" ");

	var c;
	for (c = 0; c < nameList.length; c++) {

		var i;
		var nameParams = nameList[c].split(",");

		var user = CreateMember();
		DigestProfile(user, nameParams);

		if (user.nickname != ChatControl.User.nickname) {
			var user = AddMember(user);
		}

	}
	UpdateNicklist();
}

var ChatControl = {

	ServerHostname: "",
	ServerPORT: 0,
	RoomName: "",
	NickName: "",
	Topic: "",
	Ticket: "",
	Profile: "",
	RegCookie: "",
	Control: null,
	Members: new Array(0)

};
