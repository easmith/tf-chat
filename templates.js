$.template(
  "userItem",
"<div class='userItem' id=${id}>" +
"	<div class='userStatus ${online}'></div>" +
"	<div class='userName'>${fName}, ${age}</div>" +
"	<div class='float-right'>" +
"		<div class='userCounter'>${counter}</div>" +
		"<div class='userAvatar' style='background: url(&quot;${avatar}&quot;) no-repeat scroll center center white;)'>" +
"			<img src='${avatar}' style='visibility: hidden;' />" +
"		</div>" +
"	</div>" +
"</div>"
);

$.template(
  "messageItem",
"<div class='messageItem' id=${id}>" +
"	<div class='senderName'>${senderName}</div>" +
"	<div class='messageContent'>${content}</div>" +
"	<div class='messageRemove'>x</div>" +
"	<div class='messageTime'>${time}</div>" +
"</div>"
);