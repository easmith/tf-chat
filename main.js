if (typeof(TF) == 'undefined') TF = {};

// текущий "залогиненныйй пользователь"
TF.actor = {};

// пользователь с кем ведется диалог
TF.currentUser = {};

// список всех польователей
TF.userList = {};

// список сообщений
TF.messages = {};

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
	//data.avatar = "/Storage/avatar/" + data.avatar + "-small.png";
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

	$('#sendRate').click(function(){
		$('#dialog').append($.tmpl('sendRate', null))
		.delegate(".closeWindow", "click", function(){ $("#sendRateForm").remove()} )
		.delegate(".stars div", "click", function(){ TF.sendMessage(1, $(this).attr('rate')); $("#sendRateForm").remove(); } )
	});

	TF.setUserCounter(TF.currentUser.id, 0);
}

TF.sendMessage = function(mType, mContent){
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
			eval(data.cmd);
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
	messageItem.delegate(".messageRemove", "click", function(){TF.removeMessage(data.id)} );
	$('#messageContainer').append(messageItem);
}

TF.removeMessage = function(mId)
{
	$.getJSON('server.php?cmd=removeMessage&mId=' + mId, function(data) {
		$('#'+mId).hide();
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
	$("#" + uId + " .userCounter").html(counter);
	if (counter == 0)
	{
		$("#" + uId + " .userCounter").hide();
	}
	else
	{
		$("#" + uId + " .userCounter").show();
	}
}











$().ready(function(){


		TF.getUserList();

//		setInterval(function(){
//			TF.getEvents();
//		}, 2000);

});
