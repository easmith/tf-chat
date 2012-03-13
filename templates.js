$.template(
  "userItem",
"<div class='userItem' id=${id}>" +
"	<div class='userStatus ${online}'></div>" +
"	<div class='userName'>${fName}, ${age}</div>" +
"	<div class='float-right'>" +
"		<div class='userCounter'>1${counter}</div>" +
		"<div class='userAvatar' style='background: url(&quot;/Storage/avatar/${avatar}-small.png&quot;) no-repeat scroll center center white;)'>" +
"			<img src='/Storage/avatar/${avatar}-small.png' style='visibility: hidden;' />" +
"		</div>" +
"	</div>" +
"</div>"
);

$.template(
  "dialog",
"	<div id='userInfo'>" +
"</div>" +
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
"userInfo",
"	<div class='userAvatar' style='background: url(&quot;/Storage/avatar/${avatar}-big.png&quot;) no-repeat scroll center center white;)'>" +
"		<img src='/Storage/avatar/${avatar}-big.png' style='visibility: hidden;' />" +
"	</div>" +
"	<div class='userProfile'>" +
"		<div class='userName'><a href='' onclick='return false'>${fName}, ${age}</a></div>" +
"		<div class='userLocation'>${country}, ${city}</div>" +
"	</div>"+
"	<div class='userTools'>" +
"	<a href=''>Добавить в закладки</a>" +
"	<a href=''>Пожаловаться</a>" +
"	</div>" 
)


$.template(
  "messageItem",
"<div class='messageItem' id=${id}>" +
"	<div class='senderName{{if isActor}} self{{/if}}'>${senderName}</div>" +
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