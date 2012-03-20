if (typeof(TF) == 'undefined') TF = {};

// текущий "залогиненныйй пользователь"
TF.actor = {};

// пользователь с кем ведется диалог
TF.currentUser = {};

// список всех польователей
TF.userList = {};

// список сообщений
TF.messages = {};

TF.compliments = [
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
];

TF.notifSending = false;

TF.actor.set = function(){
	var uid = window.location.hash.substr(1, 32);
	var cu = 0;
	for (var i in TF.userList)
	{
		if (TF.userList[i].id == uid)
		{
			cu = i;
		}
	}
	// Если не указан пользователь выбираем последнего =)
	if (cu == 0) cu = i;
	TF.actor = TF.userList[cu];
	window.location.hash = TF.actor.id;
//	delete TF.userList[cu];
}

TF.getUserList = function()
{
	$.getJSON('server.php?cmd=getUserList', function(data) {
		TF.userList = data;
		TF.actor.set();

		for (i in data)
		{
			if (data[i].id == TF.actor.id) continue;
			TF.drawUserListItem(data[i]);
		}

		$(".userItem").click(function(){
			TF.getDialog($(this).attr('id'));
		});
	});
}

TF.drawUserListItem = function(data)
{
	data.online = data.online ? "" : " offline";
	$('#userList').append($.tmpl('userItem', data));
}

TF.getDialog = function(senderId)
{
	TF.currentUser = TF.userList[senderId];
	$.getJSON('server.php?cmd=getMessage&senderId=' + senderId + '&ownerId=' + TF.actor.id, function(data) {
		TF.messages = data;
		TF.drawDialog(data);
	});
}

TF.drawDialog = function(data)
{
	$(".userItem").removeClass('selected');
	$('#' + TF.currentUser.id).addClass('selected');

	$("#dialog").empty();
	$('#dialog').append($.tmpl('dialog', {from: TF.actor.id, to: TF.currentUser.id}));

	$("#userInfo").append(TF.drawUserInfo(TF.userList[TF.currentUser.id]))

	// Отрисовываем сообщения, если есть они
	if (Object.keys(data).length)
	{
		$("#dialog").removeClass('firstMessage');
		for (var i in data) TF.drawMessageItem(data[i]);
	}
	else
	{
		$("#dialog").addClass('firstMessage');
		$('#messageContainer').append($.tmpl('firstMessage', {}));
		TF.changeCompliment();
		$("#otherCompliment").click(function(){ TF.changeCompliment(); return false; })
		$("#compliment").click(function(){ TF.setCompliment($(this).attr('complimentId')); return false; })
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
		var user = TF.currentUser;
		user.fName = rusNameDeclension.get(user.fName);
		$('.transDialogBg').append($.tmpl('sendRate', user))
			.find(".stars div").click(function(){ TF.sendMessage(1, $(this).attr('rate')); $(".closeWindow").click(); });
		$(".transDialogBg").show();
	});

	$('#sendGift').click(function(){
		var user = TF.currentUser;
		user.fName = rusNameDeclension.get(user.fName);
		$('.transDialogBg').append($.tmpl('sendGift', user))
			.find(".gifts div").click(function(){ TF.sendMessage(2, $(this).attr('giftId')); $(".closeWindow").click(); });
		$(".transDialogBg").show();
	})

	$('#messageContent').keydown(function (e){
		if (e.ctrlKey && e.keyCode == 13){
			// Ctrl-Enter pressed
			return TF.sendMessage(0, $('#messageContent').val());
		}
	});


	TF.setUserCounter(TF.currentUser.id, 0);
}

TF.changeCompliment = function()
{
	var compliments = TF.compliments[TF.currentUser.sex];
	var complimentId = Math.floor(Math.random() * compliments.length);
	$("#compliment").attr('complimentId', complimentId);
	$("#compliment").html("«" + compliments[complimentId] + "»");
	return false;
}

TF.setCompliment = function(complimentId){
	$("#messageContent").val(TF.compliments[TF.currentUser.sex][complimentId]);
}

TF.sendMessage = function(mType, mContent){
	mContent = mContent.trim();
	if (mContent == '') return false;

	if (TF.notifSending) $("#sendingInfo").html('Отправляем...');

	$.ajax({
		url: $('#sendMessage').attr('action'),
		type: "POST",
		dataType: "JSON",
		data: {
			from: TF.actor.id,
			to: TF.currentUser.id,
			type: mType,
			content: mContent
		},
		success: function(data) {
			// после отправки очищаю текст сообщения
			if (mType == 0) $('#messageContent').val('');
			// Устанавливаем статус отправки
			if (TF.notifSending) $("#sendingInfo").html('Сообщение успешно отправленно!');

			eval(data.cmd);
			var mc = $("#messageContainer");
			// большое значение, для исключения необходимости вычислять точную позицию
			mc.scrollTop(3000);
		},
		error: function(){
			if (TF.notifSending) $("#sendingInfo").html('Ваше сообщение не доставленно!');
		}
	});
	return false;
}

TF.drawMessageItem = function(data){
	$("#dialog").removeClass('firstMessage');
	var date = new Date(data.ts * 1000);
	var tmplData = data;
	tmplData.time = date.getHours() + ':' + date.getMinutes();
	tmplData.content = data.content;
	tmplData.senderName = TF.userList[data.from].fName;
	tmplData.sex = TF.actor.sex;
	tmplData.isActor = data.from == TF.actor.id;
	tmplData.isMutually = TF.isMutually(data);
	var messageItem = $.tmpl('messageItem', tmplData);
	messageItem.find(".messageRemove").click( function(){
		var modalWindow = $('.transDialogBg').append($.tmpl('removeMessage', data))
		modalWindow.find("button").click(function(){ TF.removeMessage(data.id); $(".closeWindow").click(); })
		modalWindow.find("a").click( function(){$(".closeWindow").click(); return false; })

		$(".transDialogBg").show();
	});
	$('#messageContainer').append(messageItem);
}

TF.isMutually = function (data)
{
	if (parseInt(data.type) != 1 || parseInt(data.content) < 8) return 0;
	for (var i in TF.messages)
	{
		if (TF.messages[i].id == data.id) return 0;
		if (TF.messages[i].from == data.to && TF.messages[i].type == 1 && parseInt(TF.messages[i].content) > 7)
		{
			console.log(TF.messages[i].from + ' =' + data.to + ' ' + TF.messages[i].type + ' ' + parseInt(TF.messages[i].content));
			return 1;
		}
	}
	return 0;
}

TF.removeMessage = function(mId)
{
	$.getJSON('server.php?cmd=removeMessage&mId=' + mId, function(data) {
		$('#'+mId).addClass('removedMessage');
		$('#'+mId+' .messageContent').html('Сообщение было удалено.');
	});
}

TF.setCounter = function(uId, counter)
{
	alert(uId.toString() + counter);
}

TF.drawUserInfo = function(data){
	return $.tmpl('userInfo', data)
}

TF.getEvents = function()
{
	$.getJSON('server.php?cmd=getEvents&cu=' + TF.actor.id + '&mu=' + TF.currentUser.id, function(data) {
		for (var c in data.counters)
		{
			TF.setUserCounter(c, data.counters[c]);
		}
		for (var m in data.messages)
		{
			//TF.drawMessageItem(data.messages[i]);
		}
	});
}

TF.setUserCounter = function(uId, counter)
{
	var userItem = $("#" + uId + " .userCounter");
	userItem.html(counter);
	if (counter == 0)
	{
		userItem.hide();
	}
	else
	{
		userItem.show();
	}
}











$().ready(function(){
		$("#dialog").delegate('.closeWindow', 'click', function(){
			$(".transMsgBg").remove();
			$(".transDialogBg").hide();
		});

		$(window).delegate('.msgSendGift', 'click', function () { $("#sendGift").click(); return false;});
		$(window).delegate('.msgSendRate', 'click', function () { $("#sendRate").click(); return false;});
		$(window).delegate('.msgSendMutally', 'click', function () { TF.sendMessage(1, "10"); return false;});

		$("#messageContainer").scroll(function(){
               alert('asdasd');
       });


		TF.getUserList();

//		setInterval(function(){
//			TF.getEvents();
//		}, 2000);

});
