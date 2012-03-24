TF = {
	// Сокет
	socket : {},

	// текущий "залогиненныйй пользователь"
	actor : {},

	// пользователь с кем ведется диалог
	currentUser : {},

	// список всех польователей
	userList : {},

	// список сообщений
	messages : {},

	// Кто последний отправил сообщение?
	lastMsg : {},

	compliments : [
		[
			"Хороша! Даже пошлить не хочется)",
			"Никогда не видел таких длинных ног",
			"Ты выпала мне не случайно",
			"Какая у тебя гладкая кожа",
			"Если бы можно было убивать взглядом, тебя бы уже посадили за убийство",
			"Тебя надо клонировать, чтобы осчастливить побольше мужчин!",
			"Ты – лучшее, что создал бог!",
			"Сразила наповал!",
			"Секси-шмекси ",
			"Я в восхищении",
		],
		[
			"Отдаюсь в хорошие руки. По-моему, у тебя именно такие",
			"Бунтарь",
			"Сводишь с ума!",
			"Вот тебя-то мне для полного счастья и не хватало!",
			"Импозантный мужчина",
			"Мистер Позитив",
			"Ты бы меня спас, если бы я тонула?",
			"Вау, какой пресс!",
			"А я думала, настоящие мужчины вымерли…",
			"Ты такой сладкий, а я сладкоежка",
		]
	],

	notifSending : false

}

TF.setActor = function(){
	var uid = window.location.hash.substr(1);
	var cu = this.userList.length - 1;
	for (var i in this.userList)
	{
		if (this.userList[i]._id == uid)
		{
			cu = i;
			break;
		}
	}
	
	this.actor = this.userList[cu];
	window.location.hash = this.actor._id;
	
	this.socket.emit("setActor", this.actor._id);
	var users = this.userList;
	delete users[cu]
	for (i in users)
	{
		this.drawUserListItem(this.userList[i]);
	}

}

TF.drawUserListItem = function(data)
{
	data.online = data.online ? "" : " offline";
	var item = $('#userList').append($.tmpl('userItem', data));
	item.find('.closeWindow').click(function () {$(this).parent().parent().hide();});
}

TF.getUserById = function(id)
{
	for (var i in this.userList)
	{
		if (this.userList[i]._id == id)
			return this.userList[i];
	}
	return null;
}

TF.getDialog = function(senderId)
{
	this.lastMsg = {};
	this.currentUser = this.getUserById(senderId);
	
	this.socket.emit('getDialog', {pair :[TF.actor._id, TF.currentUser._id]}, function(data){
		TF.messages = data;
//		console.log(TF.messages);
		TF.drawDialog();
	});
}

TF.drawDialog = function()
{
	$(".userItem").removeClass('selected');
	$('#' + TF.currentUser._id).addClass('selected');

	$("#dialog").empty();
	$('#dialog').append($.tmpl('dialog', {from: TF.actor._id, to: TF.currentUser._id}));

	$("#userInfo").append(TF.drawUserInfo(TF.currentUser));

	// Отрисовываем сообщения, если есть они
	if (TF.messages.length)
	{
		$("#dialog").removeClass('firstMessage');
		for (var i in TF.messages) TF.drawMessageItem(TF.messages[i]);
	}
	else
	{
		$("#dialog").addClass('firstMessage');
		$('#messageContainer').append($.tmpl('firstMessage', {}));
		TF.changeCompliment();
		$("#otherCompliment").click(function(){TF.changeCompliment();return false;})
		$("#compliment").click(function(){TF.setCompliment($(this).attr('complimentId'));return false;})
	}

	$('#sendMessage').submit(function(){
		return TF.sendMessage(0, $('#messageContent').val());
	});

	$('#notifSending').click(function(){
		TF.notifSending = true;
		$(this).parent().html("Здесь будет отображаться статус отправки...");
		return false;
	});

	$('#sendRate').click(function(){
		var fName = rusNameDeclension.get(TF.currentUser.fName);
		$('.transDialogBg').append($.tmpl('sendRate', {fName: fName}))
			.find(".stars div").click(function(){TF.sendMessage(1, $(this).attr('rate'));$(".closeWindow").click();});
		$(".transDialogBg").show();
	});

	$('#sendGift').click(function(){
		var fName = rusNameDeclension.get(TF.currentUser.fName);
		$('.main').append($.tmpl('sendGift', {fName: fName}))
			.find(".scrollBtn").click(function(){TF.scrollGift(this)});
		$(".main").show();
	})

	$('#messageContent').keydown(function (e){
		if (e.ctrlKey && e.keyCode == 13){
			// Ctrl-Enter pressed
			return TF.sendMessage(0, $('#messageContent').val());
		}
	});
//	TF.setUserCounter(TF.currentUser._id, 0);
}

TF.changeCompliment = function()
{
	var compliments = this.compliments[this.currentUser.sex];
	var complimentId = Math.floor(Math.random() * compliments.length);
	$("#compliment").attr('complimentId', complimentId);
	$("#compliment").html("«" + compliments[complimentId] + "»");
	return false;
}

TF.setCompliment = function(complimentId){
	$("#messageContent").val(this.compliments[this.currentUser.sex][complimentId]);
}

TF.sendMessage = function(mType, mContent){
	if (isNaN(parseInt(mContent))) mContent = mContent.trim();
	if (mContent == '') return false;

	if (TF.notifSending){
		$("#sendingInfo span").html('Отправляем...');
		$("#sendingInfo .msgStatus").removeClass("error");
	}
	
	var message = {
		from: TF.actor._id,
		to: TF.currentUser._id,
		type: mType,
		content: mContent
	}
	
	this.socket.emit('sendMessage', message, function(data){
		if (TF.notifSending) $("#sendingInfo span").html('Сообщение успешно отправленно!');
	});
	
	return false;
}

TF.drawMessageItem = function(data){
	$("#dialog").removeClass('firstMessage');
	var tmplData = data;
	tmplData.time = new Date(data.ts * 1000).toTimeString().substr(0, 5);
	tmplData.content = data.content.replace(/</g, '&lt;').replace(/([^>])\n/g, '$1<br/>');
	tmplData.senderName = data.from == this.actor._id ? this.actor.fName : this.getUserById(data.from).fName;
	tmplData.sex = TF.actor.sex;
	tmplData.isActor = data.from == TF.actor._id;
	tmplData.isMutually = TF.isMutually(data);
	tmplData.isPrevSender = TF.lastMsg.from == data.from ? 1 : 0;

	var messageItem = $.tmpl('messageItem', tmplData);
	messageItem.find(".messageRemove").click( function(){
		var tmplData = data;
		tmplData.content = data.content.replace(/</g, '&lt;').replace(/([^>])\n/g, '$1<br/>');
		var modalWindow = $('.transDialogBg').append($.tmpl('removeMessage', data))
		modalWindow.find("button").click(function(){TF.removeMessage(data._id);$(".closeWindow").click();})
		modalWindow.find("a").click( function(){$(".closeWindow").click();return false;})

		$(".transDialogBg").show();
	});
	$('#messageContainer ui').append(messageItem);

	var mc = $("#messageContainer");
	// большое значение, для исключения необходимости вычислять точную позицию
	mc.scrollTop(4000);
			
	TF.lastMsg = data;
}

TF.isMutually = function (data)
{
	if (parseInt(data.type) != 1 || parseInt(data.content) < 8) return 0;
	for (var i in TF.messages)
	{
		if (TF.messages[i]._id == data._id) return 0;
		if (TF.messages[i].from == data.to && TF.messages[i].type == 1 && parseInt(TF.messages[i].content) > 7)
		{
			return 1;
		}
	}
	return 0;
}

TF.scrollGift = function(obj)
{
	var cont = $(obj).parent().find("ui");
	var maxPos = ($(obj).parent().find("ui li").siblings().length - 7) * (-82);
	var currentValue = parseInt(cont.css("left"));
	var newPos = currentValue + ($(obj).hasClass("arrowLeft") ? 82 : -82);
	newPos = newPos - (newPos % 82);

	if (newPos < maxPos || newPos > 0)
	{
		$(obj).hide();
		return false;
	}
	$(obj).parent().find("." + ($(obj).hasClass("arrowLeft") ? "arrowRight" : "arrowLeft")).show();
	cont.animate({left : newPos}, "fast");
	return false;
}

TF.removeMessage = function(mId)
{
	this.socket.emit("removeMsg", {actor: this.actor._id, mId: mId});
	$('#'+mId).addClass('removedMessage');
	$('#'+mId+' .messageContent').html('Сообщение было удалено.');
}

TF.drawUserInfo = function(data){
	return $.tmpl('userInfo', data)
}

TF.setUserCounter = function(uId, counter)
{
	var userItem = $("#" + uId + " .userCounter");
	userItem.html(counter);
	if (counter > 0)
	{
		userItem.css({display: 'inline-block'});
	}
}








$().ready(function(){
		TF.socket = io.connect();
		
		TF.socket.on('userList', function(data){
			TF.userList = data;
			TF.setActor();
			$(".userItem").click(function(){
				TF.getDialog($(this).attr('id'));
			});
		})
		
		TF.socket.on('newMsg', function(data){
			console.log(data);
			TF.drawMessageItem(data);
		})
		
		TF.socket.on('counters', function(data){
			console.log(data);
			for (var i in data)
			{
				TF.setUserCounter(data[i].from, data[i].items)
			}
		});
        
        
		$(window).delegate('.closeWindow', 'click', function(){
			$(".transMsgBg").remove();
			$(".transDialogBg").hide();
		});

		$(window).delegate("li.gift", "click", function(){
			TF.sendMessage(2, $(this).attr('giftId'));
			$(".closeWindow").click();
		});

		$(window).delegate('.msgSendGift', 'click', function () {$("#sendGift").click();return false;});
		$(window).delegate('.msgSendRate', 'click', function () {$("#sendRate").click();return false;});
		$(window).delegate('.msgSendMutally', 'click', function () {TF.sendMessage(1, "10");return false;});

//		TF.getUserList();

//		setInterval(function(){
//			TF.getEvents();
//		}, 1000);

});
