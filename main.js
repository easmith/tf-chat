if (typeof(TF) == 'undefined') TF = {};

// текущий "залогиненныйй пользователь"
TF.actor = {};

// пользователь с кем ведется диалог
TF.currentUser = {};

// список всех польователей
TF.userList = {};

// список сообщений
TF.messages = {};

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
	for (var i in data)
	{
		TF.drawMessageItem(data[i]);
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
		$('#dialog').append($.tmpl('sendRate', null))
			.find(".stars div").click(function(){ TF.sendMessage(1, $(this).attr('rate')); $(".closeWindow").click(); });
		$(".transDialogBg").show();
	});

	$('#sendGift').click(function(){
		$('#dialog').append($.tmpl('sendGift', null))
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
	var date = new Date(data.ts * 1000);
	var tmplData = data;
	tmplData.time = date.getHours() + ':' + date.getMinutes();
	tmplData.content = data.content;
	tmplData.senderName = TF.userList[data.from].fName;
	tmplData.isActor = data.from == TF.actor.id;
	var messageItem = $.tmpl('messageItem', tmplData);
	messageItem.find(".messageRemove").click( function(){
		if ($(this).parent().hasClass('removedMessage')) return false;
		TF.removeMessage(data.id)
	});
	$('#messageContainer').append(messageItem);
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

		TF.getUserList();

//		setInterval(function(){
//			TF.getEvents();
//		}, 2000);

});
