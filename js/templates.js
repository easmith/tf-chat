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
"	<div id='messageContainer'><ui></ui></div>" +
"	<div id='messageForm'>" +
"		<div id='sendingInfo'><div class='msgStatus sending'></div><span>Хотите узнать о прочтении вашего сообщения? <a href='' id='notifSending'>узнать</a></span></div>" +
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
"<li class='messageItem {{if type == '1'}}rate{{/if}}' id='${id}'>" +
"	<div class='senderName{{if isActor}} self{{/if}}'>{{if !isPrevSender}}${senderName}{{/if}}</div>" +
"	<div class='messageContent'>" +
"		{{if type == '2'}}<div class='gift gift-${content}'></div>" +
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
"</li>"
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
"			<div class='giftsHead'>ПОДАРКИ ЗА 6</div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [1,2,3,4,5,6,7,8,9,10,11,12,13]}} " +
"					<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'> + </div>" +
"			<div class='scrollBtn arrowRight'> + </div>" +
"		</div>"+
"		<div class='gifts'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 6</div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [14,15,16,17,18,19,20,21,22,23]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'> + </div>" +
"			<div class='scrollBtn arrowRight'> + </div>" +
"		</div>" +
"		<div class='gifts'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 12</div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [24,25,26,27,28,29,30,31,32,33]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'> + </div>" +
"			<div class='scrollBtn arrowRight'> + </div>" +
"		</div>" +
"		<div class='gifts'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 18</div>" +
"			<div class='giftsBox'><ui>{{each(i,giftId) [50,51,52,53,54,55,56,57,58,59]}} " +
"				<li class='gift gift-${giftId}' giftId='${giftId}'></li>" +
"			{{/each}}</ui></div>" +
"			<div class='scrollBtn arrowLeft'> + </div>" +
"			<div class='scrollBtn arrowRight'> + </div>" +
"		</div>" +
"		<div class='gifts vip'>" +
"			<div class='giftsHead'>ПОДАРКИ ЗА 1 <img src=''/> - доступно только для пользователей со статусом VIP</div>" +
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
"		<div class='message'>{{if type ==0}}«${content}»{{/if}}{{if type ==2}}<div class='gift gift-${content}'></div>{{/if}}</div>" +
"		<div class='closeWindow'></div>" +
"	</div>" + 
"	<div class='confirmControls'><button class='sendBtn'>Удалить</button><a href=''>Нет, не надо удалять</a></div>" +
"	</div>"
);