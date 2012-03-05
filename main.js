if (typeof(TF) == 'undefined') TF = {};

TF.currentUser = {};
TF.userList = {};
TF.messages = {};

TF.currentUser.set = function(){
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
	TF.currentUser = TF.userList[cu];
	window.location.hash = TF.currentUser.id;
//	delete TF.userList[cu];
}

TF.ce = function (tagName, className, innerHTML)
{
	var div = document.createElement(tagName);
	div.className = className ? className : '';
	div.innerHTML = innerHTML ? innerHTML : '';
	return div;
}

TF.getUserList = function()
{
	$.getJSON('server.php?cmd=getUserList', function(data) {
		TF.userList = data;
		TF.currentUser.set();

		for (i in data)
		{
			if (data[i].id == TF.currentUser.id) continue;
			TF.drawUserListItem(data[i]);
		}

		$(".userItem").click(function(){
			TF.getDialog($(this).attr('id'));
		});
	});
}

TF.drawUserListItem = function(data)
{
	data.avatar = "/Storage/avatar/" + data.avatar + "-small.png";
	data.online = data.online ? "" : " offline";
	$('#userList').append($.tmpl('userItem', data));
}

TF.getDialog = function(senderId)
{
	$.getJSON('server.php?cmd=getMessage&senderId=' + senderId + '&ownerId=' + TF.currentUser.id, function(data) {
		TF.messages = data;
		TF.drawDialog(senderId, data);
	});
}

TF.drawDialog = function(uId, data)
{
	$(".userItem").removeClass('selected');
	$('#' + uId).addClass('selected');

	$("#dialog").empty();
	$("#dialog").append(TF.drawUserInfo(TF.userList[uId]))
	for (var i in data)
	{
		TF.drawMessageItem(data[i]);
	}
}

TF.drawMessageItem = function(data){
	var date = new Date(data.ts * 1000);
	data.time = date.getHours() + ':' + date.getMinutes();
	data.senderName = TF.userList[data.from].fName;
	$('#dialog').append($.tmpl('messageItem', data));
}

TF.drawUserInfo = function(data){
	var userInfo = TF.ce('div', 'userInfo', data.id + ': ' + data.fName + ', ' + data.age);
	return userInfo;
}















$().ready(function(){


		TF.getUserList();


});
