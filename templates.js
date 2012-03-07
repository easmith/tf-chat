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
  "dialog",
"	<div id='userInfo'></div>" +
"	<div id='messageContainer'></div>" +
"	<div id='messageForm'>" +
"		<form action='server.php?cmd=sendMessage&amp;from=${from}&amp;to=${to}' method='POST' id='sendMessage'>" +
"		<div>Узнать о доставки сообщения</div>" +
"		<textarea name='messageContent' id='messageContent'></textarea>" +
"		<input type='submit' value='Отправить'/>" +
"		<div class='sendGift' id='sendGift'>Отправить подарок</div>" +
"		<div class='sendRate'><a href='#' id='sendRate'>Отправить оценку</a></div>" +
"		</form>" +
"	</div>"
);


$.template(
  "messageItem",
"<div class='messageItem' id=${id}>" +
"	<div class='senderName'>${senderName}</div>" +
"	<div class='messageContent'>{{if type == '2'}} Подарок №{{/if}} {{if type == '1'}} Оценка: {{/if}}${content}</div>" +
"	<div class='messageRemove'>x</div>" +
"	<div class='messageTime'>${time}</div>" +
"</div>"
);

$.template(
  "sendRate",
"	<div id='sendRateForm'>" +
"		Отправьте %% оценку" +
"		<div class='closeWindow'>X</div>" +
"		<div class='stars'>" +
"			<div rate='1'></div>" +
"			<div rate='2'></div>" +
"			<div rate='3'></div>" +
"			<div rate='4'></div>" +
"			<div rate='5'></div>" +
"			<div rate='6'></div>" +
"			<div rate='7'></div>" +
"			<div rate='8'></div>" +
"			<div rate='9'></div>" +
"			<div rate='10'></div>" +
"		</div>" +
"	</div>"
);