$.template(
  "userItem",
"<div class='userItem' id='${_id}'>" +
"	<div class='userStatus ${online}'></div>" +
"	<div class='userName'>${fName}, ${age}</div>" +
"	<div class='float-right'>" +
"		<div class='hideUser'></div>" +
"		<div class='userCounter'>${counter}</div>" +
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
"	<div id='messageContainer'><ui></ui></div>" +
"	<div id='messageForm'>" +
"		<div id='sendingInfo'><div class='msgStatus sending'></div><span>Хотите узнать о прочтении вашего сообщения? <a href='' id='notifSending'>узнать</a></span></div>" +
"		<form action='server.php?cmd=sendMessage&amp;from=${from}&amp;to=${to}' method='POST' id='sendMessage'>" +
"		<textarea name='messageContent' id='messageContent'></textarea>" +
"		<button class='sendBtn'>Отправить</button>" +
"		<div class='sendGift'><a href='javascript:' id='sendGift'>Отправить подарок</a></div>" +
"		<div class='sendRate'><div class='srats-small'></div><a href='javascript:' id='sendRate'>Отправить оценку</a></div>" +
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
"		<div class='userName'><a href='#${_id}' onclick='return false'>${fName}, ${age}</a></div>" +
"		<div class='userLocation'>${country}, ${city}</div>" +
"	</div>"+
"	<div class='userTools'>" +
"	<a href='javascript:'>Добавить в закладки</a>" +
"	<a href='javascript:'>Пожаловаться</a>" +
"	</div>" 
)

$.template(
  "messageItem",
"<li class='messageItem {{if (type == '1' || type == '2') }}rate{{/if}}' id='${_id}'>" +
"	<div class='senderName{{if isActor}} self{{/if}}'>{{if !isPrevSender}}${senderName}{{/if}}</div>" +
"	<div class='messageContent'>" +
"		{{if type == '2'}}<div class='gift gift-${content}'></div>" +
"				<span>{{if isActor}}Вы{{else}}Вам{{/if}} отправили подарок. <a href='javascript:' class='msgSendGift'>Отправить {{if isActor}}еще{{else}}в ответ{{/if}}</a>{{/if}}</span>" +
"		{{if type == '1'}}" +
"			{{if content > 8}}" +
"				{{if isMutually}}<div class='mutally'></div><div>У вас взаимная симпатия!</br><a href='javascript:' class='msgSendGift'>Подарок</a> - лучший способ продолжить отношения.</div>" +
"				{{else}}" +
"					<div class='sympathy'></div><div>" +
"					{{if isActor}}Вы проявили симпатию!</br><a href='javascript:' class='msgSendGift'>Подарок</a> - лучший способ продолжить отношения." +
"					{{else}}Ты понравил{{if sex == 1}}ся{{else}}ась{{/if}}. <a href='javascript:' class='msgSendMutally'>Отправить взаимную симпатию!</a>" +
"					{{/if}}</div>" +
"				{{/if}}" +
"			{{else}}<div class='rateMsg'>${content}</div>" +
"				<span>{{if isActor}}Вы{{else}}Ваc{{/if}} оценили. <a href='javascript:' class='msgSendRate'>Оценить {{if isActor}}еще{{else}}в ответ{{/if}}!</a>{{/if}}</span>" +
"			{{/if}}"+
"		{{if type == '0'}}<span>{{html content}}</span>{{/if}}"+
"	</div>" +
"	<div class='messageRemove'></div>" +
"	<div class='messageTime'>${time}</div>" +
"</li>"
);

$.template(
  "firstMessage",
"<div class='firstMessageBox'>" +
"	<h3>Начни с интересной фразы</h3>" +
"		<span>Произведи хорошее впечатление</span>" +
"		<a href='javascript:' id='compliment'>Чертовски привлекательный</a>" +
"		<a href='javascript:' id='otherCompliment'><div></div>Другой комплимент</a>" +
"		<div class='trCloud'></div>" +
"		<span>Напиши первое сообщение</span>" +
"</div>"
);

$.template(
  "sendRate",
"	<div class='transMsgBg'>" +
"	<div id='sendRateForm'>" +
"		<span>Отправьте ${fName} оценку</span>" +
"		<div class='closeWindow'></div>" +
"		<div class='stars'>" +
"			{{each(i,rate) [1,2,3,4,5,6,7,8,9,10]}} " +
"				<div rate='${rate}'>${rate}</div>" +
"			{{/each}}" +
"		</div>" +
"	</div>" +
"	</div>"
);

$.template(
  "sendGift",
"	<div class='transMsgBg'>" +
"	<div id='sendGiftForm'>" +
"		<h2>Подарки</h2>" +
"		<div class='closeWindow'></div>" +
"		<div class='gifts'>"+
"			<div class='giftsHead'>ПОДАРКИ ЗА 2 <img src='img/coins.png'/></div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [1,2,3,4,5,6,7,8,9,10,11,12,13]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'><div></div></div>" +
"			<div class='scrollBtn arrowRight'><div></div></div>" +
"		</div>"+
"		<div class='gifts'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 6 <img src='img/coins.png'/></div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [14,15,16,17,18,19,20,21,22,23]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'><div></div></div>" +
"			<div class='scrollBtn arrowRight'><div></div></div>" +
"		</div>" +
"		<div class='gifts'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 12 <img src='img/coins.png'/></div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [24,25,26,27,28,29,30,31,32,33]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'><div></div></div>" +
"			<div class='scrollBtn arrowRight'><div></div></div>" +
"		</div>" +
"		<div class='gifts'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 18 <img src='img/coins.png'/></div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [60,51,72,53,84,55,96,57,58,59]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'><div></div></div>" +
"			<div class='scrollBtn arrowRight'><div></div></div>" +
"		</div>" +
"		<div class='gifts vip'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 1 <img src='img/coins.png'/> - доступно только для пользователей со статусом VIP</div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [101,102,103]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"		</div>" +
"		<a href='javascript:' class='howVIP'>Как стать VIP</a>" +
"	</div>" +
"	</div>"
);

$.template(
  "removeMessage",
"	<div class='transMsgBg'>" +
"	<div id='removeMessageForm'>" +
"		<span>Вы действительно хотите удалить {{if type ==0}}сообщение{{/if}}{{if type ==1}}оценку{{/if}}{{if type ==2}}подарок{{/if}}?</span>" +
"		<div class='message'>{{if type ==0}}«{{html content}}»{{/if}}{{if type ==2}}<div class='gift gift-${content}'></div>{{/if}}</div>" +
"		<div class='closeWindow'></div>" +
"	</div>" + 
"	<div class='confirmControls'><button class='sendBtn'>Удалить</button><a href='javascript:'>Нет, не надо удалять</a></div>" +
"	</div>"
);
