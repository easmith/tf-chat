$.template(
  "userItem",
"<div class='userItem' id=${id}>" +
"	<div class='userStatus ${online}'></div>" +
"	<div class='userName'>${fName}, ${age}</div>" +
"	<div class='float-right'>" +
"		<div class='userCounter'>1${counter}</div>" +
		"<div class='userAvatar' style='background: url(&quot;Storage/avatar/${avatar}-small.png&quot;) no-repeat scroll center center white;)'>" +
"			<img src='Storage/avatar/${avatar}-small.png' style='visibility: hidden;' />" +
"		</div>" +
"	</div>" +
"</div>"
);

$.template(
  "dialog",
"	<div id='userInfo'></div>" +
"	<div calss='dialogLayout'>" +
"	<div id='messageContainer'></div>" +
"	<div id='messageForm'>" +
"		<div id='sendingInfo'>Хотите узнать о прочтении вашего сообщения? <a href='' id='notifSending'>узнать</a></div>" +
"		<form action='server.php?cmd=sendMessage&amp;from=${from}&amp;to=${to}' method='POST' id='sendMessage'>" +
"		<textarea name='messageContent' id='messageContent'></textarea>" +
"		<button class='sendBtn'>Отправить</button>" +
"		<div class='sendGift'><a href='#' id='sendGift'>Отправить подарок</a></div>" +
"		<div class='sendRate'><div class='srats-small'></div><a href='#' id='sendRate'>Отправить оценку</a></div>" +
"		</form>" +
"	</div>" +
"	<div class='transDialogBg'></div>" +
"	</div>"
);

$.template(
"userInfo",
"	<div class='userAvatar' style='background: url(&quot;Storage/avatar/${avatar}-big.png&quot;) no-repeat scroll center center white;)'>" +
"		<img src='Storage/avatar/${avatar}-big.png' style='visibility: hidden;' />" +
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
"<div class='messageItem {{if type == '1'}}rate{{/if}}' id='${id}'>" +
"	<div class='senderName{{if isActor}} self{{/if}}'>${senderName}</div>" +
"	<div class='messageContent'>" +
"		{{if type == '2'}}<img src='Storage/gift/${content}.png' width=50 height=50 />" +
"				{{if isActor}}Вы{{else}}Вам{{/if}} отправили подарок. <a href='' class='msgSendGift'>Отправить {{if isActor}}еще{{else}}в ответ{{/if}}</a>{{/if}}" +
"		{{if type == '1'}}" +
"			{{if content > 8}}" +
"				{{if isMutually}}<div class='mutally'></div><div>У вас взаимная симпатия!</br><a href='' class='msgSendGift'>Подарок</a> - лучший способ продолжить отношения.</div>" +
"				{{else}}" +
"					<div class='sympathy'></div><div>" +
"					{{if isActor}}Вы проявили симпатию!</br><a href='' class='msgSendGift'>Подарок</a> - лучший способ продолжить отношения." +
"					{{else}}Ты понравил{{if sex == 1}}ся{{else}}ась{{/if}}. <a href='' class='msgSendMutally'>Отправить взаимную симпатию!</a>" +
"					{{/if}}</div>" +
"				{{/if}}" +
"			{{else}}<div class='rateMsg'>${content}</div>" +
"					{{if isActor}}Вы{{else}}Ваc{{/if}} оценили. <a href='' class='msgSendRate'>Оценить {{if isActor}}еще{{else}}в ответ{{/if}}!</a>{{/if}}" +
"			{{/if}}"+
"		{{if type == '0'}}${content}{{/if}}"+
"	</div>" +
"	<div class='messageRemove'></div>" +
"	<div class='messageTime'>${time}</div>" +
"</div>"
);

$.template(
  "firstMessage",
"<div class='firstMessageBox'>" +
"	<h3>Начни с интересной фразы</h3>" +
"		<span>Произведи хорошее впечатление</span>" +
"		<a href='' id='compliment'>Чертовски привлекательный</a>" +
"		<a href='' id='otherCompliment'>Другой комплимент</a>" +
"</div>"
);

$.template(
  "sendRate",
"	<div class='transMsgBg'>" +
"	<div id='sendRateForm'>" +
"		<span>Отправьте ${fName} оценку</span>" +
"		<div class='closeWindow'></div>" +
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
"	</div>" +
"	</div>"
);

$.template(
  "sendGift",
"	<div class='transMsgBg'>" +
"	<div id='sendGiftForm'>" +
"		<span>Отправьте ${fName} подарок</span>" +
"		<div class='closeWindow'></div>" +
"		<div class='gifts'>" +
"			<div class='gift-1' giftId='1'></div>" +
"			<div class='gift-2' giftId='2'></div>" +
"			<div class='gift-3' giftId='3'></div>" +
"			<div class='gift-4' giftId='4'></div>" +
"			<div class='gift-5' giftId='5'></div>" +
"		</div>" +
"	</div>" +
"	</div>"
);

$.template(
  "removeMessage",
"	<div class='transMsgBg'>" +
"	<div id='removeMessageForm'>" +
"		<span>Вы действительно хотите удалить {{if type ==0}}сообщение{{/if}}{{if type ==1}}оценку{{/if}}{{if type ==2}}подарок{{/if}}?</span>" +
"		<div class='message'>{{if type ==0}}«${content}»{{/if}}{{if type ==2}}<img src='Storage/gift/${content}.png' />{{/if}}</div>" +
"		<div class='closeWindow'></div>" +
"	</div>" + 
"	<div class='confirmControls'><button class='sendBtn'>Удалить</button><a href=''>Нет, не надо удалять</a></div>" +
"	</div>"
);