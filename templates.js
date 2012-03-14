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
"		<div class='sendGift'><a href='#' id='sendGift'>Отправить подарок</a></div>" +
"		<div class='sendRate'><div class='srats-small'></div><a href='#' id='sendRate'>Отправить оценку</a></div>" +
"		</form>" +
"	</div>"
);

$.template(
"userInfo",
"	<div class='userAvatar' style='background: url(&quot;/Storage/avatar/${avatar}-big.png&quot;) no-repeat scroll center center white;)'>" +
"		<img src='/Storage/avatar/${avatar}-big.png' style='visibility: hidden;' />" +
"	</div>" +
"	<div class='userProfile'>" +
"		<div class='userName'><a href='#${id}' onclick='return false'>${fName}, ${age}</a></div>" +
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
"	<div class='messageContent'>" +
"		{{if type == '2'}} Подарок №: ${content}<img src='/Storage/gift/${content}.png' />{{/if}}" +
"		{{if type == '1'}}{{if content > 8}}Вам проявили симпатю!{{else}}Оценка: ${content}{{/if}}{{/if}}"+
"		{{if type == '0'}}${content}{{/if}}"+
"	</div>" +
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
"			<div rate='1'>1</div>" +
"			<div rate='2'>2</div>" +
"			<div rate='3'>3</div>" +
"			<div rate='4'>4</div>" +
"			<div rate='5'>5</div>" +
"			<div rate='6'>6</div>" +
"			<div rate='7'>7</div>" +
"			<div rate='8'>8</div>" +
"			<div rate='9'>9</div>" +
"			<div rate='10'>10</div>" +
"		</div>" +
"	</div>"
);

$.template(
  "sendGift",
"	<div id='sendGiftForm'>" +
"		Отправьте %% подарок" +
"		<div class='closeWindow'>X</div>" +
"		<div class='gifts'>" +
"			<div class='gift-1' giftId='1'></div>" +
"			<div class='gift-2' giftId='2'></div>" +
"			<div class='gift-3' giftId='3'></div>" +
"			<div class='gift-4' giftId='4'></div>" +
"			<div class='gift-5' giftId='5'></div>" +
"		</div>" +
"	</div>"
);