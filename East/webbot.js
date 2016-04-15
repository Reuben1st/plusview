//var userSheet = "1zwm-WdLguQ2FcHUy4OJIzwkwgl_ZeKkF_qI81cifkcg" //west
var userSheet = "1ooChaOT0aW6pn-1zxbzbz51JMhnVr793clPzLc7HwDY" //east
function htmlEncode(value){
  return $('<div/>').text(value).html();
}
var timestore = "";
function updateUser(json)
{
	if (json == undefined){return;}
	Users = json.feed.entry[0]
	time = Users.gsx$timestamp.$t

	if (timestore == time){return;}
	timestore = time
	username = Users.gsx$username.$t
	flags = Users.gsx$flags.$t
	ping = Users.gsx$ping.$t
	IconCode = Users.gsx$icon.$t
	level = Users.gsx$level.$t
	clan = Users.gsx$clan.$t
	
	channel = Users.gsx$channel.$t //$$

	a = IconCode.split("$")
	b = level.split("$")
	c = username.split("$")
	d = clan.split("$")
	e = ping.split("$")
	f = flags.split("$")
	data = ""
	
	
	$("#hoverUsers").html("")
	
	for (i = 0; i < a.length; i++)
	{
		b1 = b[i]
		if (b[i] == 0){b[i] = ""}
		switch(a[i].substr(-2, 1))
		{
			case "H": Tier = "Human"; break;
			case "O": Tier = "Orc"; break;
			case "N": Tier = "Night Elf"; break;
			case "U": Tier = "Undead"; break;
			case "R": Tier = "Random"; break;
			case "D": Tier = "Tournament"; break;
		};
			 
		switch(a[i])
		{
			case "W3H2": IconName = "Rifleman"; break;
			case "W3H3": IconName = "Sorceress"; break;
			case "W3H4": IconName = "Spellbreaker"; break;
			case "W3H5": IconName = "Blood Mage"; break;
			case "W3H6": IconName = "Jaina"; break;
			case "W3O2": IconName = "Troll Headhunter"; break;
			case "W3O3": IconName = "Shaman"; break;
			case "W3O4": IconName = "Spirit Walker"; break;
			case "W3O5": IconName = "Shadow Hunter"; break;
			case "W3O6": IconName = "Rexxar"; break;
			case "W3N2": IconName = "Huntress"; break;
			case "W3N3": IconName = "Druid of the Talon"; break;
			case "W3N4": IconName = "Dryad"; break;
			case "W3N5": IconName = "Keeper of the Grove"; break;
			case "W3N6": IconName = "Maiev"; break;
			case "W3U2": IconName = "Crypt Fiend"; break;
			case "W3U3": IconName = "Banshee"; break;
			case "W3U4": IconName = "Destroyer"; break;
			case "W3U5": IconName = "Crypt Lord"; break;
			case "W3U6": IconName = "Sylvanas"; break;
			case "W3R2": IconName = "Myrmidon"; break;
			case "W3R3": IconName = "Siren"; break;
			case "W3R4": IconName = "Dragon Turtle"; break;
			case "W3R5": IconName = "Sea Witch"; break;
			case "W3R6": IconName = "Illidan"; break;
			case "W3D2": IconName = "Felguard"; break;
			case "W3D3": IconName = "Infernal"; break;
			case "W3D4": IconName = "Doomguard"; break;
			case "W3D5": IconName = "Pit Lord"; break;
			case "W3D6": IconName = "Archimonde"; break;
			default	 : IconName = "Peon"; break;
			
		};
		
		if (e[i] <200){bar = 1}
		if (e[i] >199 && e[i] <300){bar = 2}
		if (e[i] >299 && e[i] <400){bar = 3}
		if (e[i] >399 && e[i] <500){bar = 4}
		if (e[i] >499 && e[i] <600){bar = 5}
		if (e[i] >600){bar = 6}
		
		hoverData = "<div class='hover'><table class='hoverstats'>";
		hoverData = hoverData + "<caption>"+c[i]+"</caption><tr><td><span class='hoverlabel'>Level:</span> "+b1+"</td><td><span class='hoverlabel'>Icon:</span> "+IconName+"</td><td><span class='hoverlabel'>Tier:</span> "+Tier+"</td></tr><tr><td><span class='hoverlabel'>Ping:</span> "+e[i]+"ms</td><td><span class='hoverlabel'>Clan:</span> "+d[i]+"</td></tr>";
		hoverData = hoverData + "</table></div>"
		
		$("#hoverUsers").append(hoverData)
		newData = "<tr class='users"+f[i]+"'>";
		newData = newData + "<td class='icon'><img src='images/tft/"+a[i]+".gif' /></td>";
		newData = newData + "<td class='level'>"+b[i]+"</td>";
		newData = newData + "<td class='username'>"+c[i]+"</td>";
		newData = newData + "<td class='clan'>"+d[i]+"</td>";
		newData = newData + "<td class='ping'><img src='images/ping/"+bar+".gif' /></td></tr>";
		

		if (f[i] == 0)
		{
			data = data + newData
		}
		
		if (f[i] == 2)
		{
			data = newData + data
		}
	}
	ch = channel.split("$$")
	channelData = '<tr><th id="channeldata" colspan="5">' + ch[0] + ' (' +  ch[1]+ ')</th></tr>'
	//console.log(channelData + data)
	$(".usertable").html(channelData + data)
	
}



var indexDisplay = 50
var lastIndexed = 0
var nextIndexed = 0
var stopScroll = false;
function updateChat(json)
{
	
	var time, type, username, message, chatLine, display;
	feedLen = json.feed.entry.length
	if (feedLen > indexDisplay)
	{
		nextIndexed = feedLen - indexDisplay
	}
	else
	{
		if (lastIndexed > 0)
		{
			nextIndexed = lastIndexed
		}
		else
		{
			nextIndexed = 0
		}
	}

	if (lastIndexed == nextIndexed+indexDisplay && lastIndexed != 0 && $('.firstStart')[0]){return;}

	if (lastIndexed == 0){lastIndexed = nextIndexed}

	for (var i = lastIndexed; i < feedLen; i++)
	{

		chatLine = json.feed.entry[i]
		time = chatLine.gsx$timestamp.$t
		type = chatLine.gsx$type.$t
		username = chatLine.gsx$username.$t
		message = chatLine.gsx$message.$t

		tmpUser = username.split("$")
		username = tmpUser[0]
		flag = tmpUser[1]
		//invite,remove,demotion,promotion,shutdown,logoff,memberleave,self,whisperfrom,whisperto,emote,talk,servererror,serverinfo
		
		
		tmpTime = time.split(" ")
		tmpTime[0] = tmpTime[0].split("/")
		time = tmpTime[0][2]+"-"+ tmpTime[0][1]+"-"+tmpTime[0][0]+" " +tmpTime[1]
		var date = new Date(time.split(' ').join('T'))
		time = date.getTime() //Unix Timestamp (GMT)
		
		var d = new Date(time);
		tmpTime = d.toLocaleString().split(" ")
		timeSplit = tmpTime[1].split(":")


		var HH = timeSplit[0];
		var MM = timeSplit[1];
		var SS = timeSplit[2];
		
		var AMPM = tmpTime[2]
		
		if (typeof AMPM == 'undefined')
		{
			if (HH > 12){AMPM = "PM"; HH = HH - 12}else if (HH == 12){AMPM = "PM"}else{AMPM = "AM"}
		}
		
		if (HH.toString().length < 2){HH = "0"+HH}
		if (MM.toString().length < 2){MM = "0"+MM}
		if (SS.toString().length < 2){SS = "0"+SS}
		time = HH + ":" + MM + ":" + SS + " " + AMPM

		dispTime = '<span title="'+d+'" class="time">['+time+']</span>'
		dispMsg = '<span class="msg'+type+'">'+htmlEncode(message)+'</span>'
		
		var step1regex = /(((https?:\/\/(www.)?|www.)([\.\w:@-]+)(\.)[a-z0-9]{2,}[\/=a-z0-9\?:&\(\.\*%@#;$+|{~\[\]_\\,!-]*([\)!:;}]([=\[\]\w|\*.]|&amp;)+(\\+)?)?)(?![^<]*<\/a>))/gi
		var ftpregex = /(ftps?:\/\/).+/i
		var emailregex = /(([\w-]+:)?[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,4}))/gi

		
		dispMsg = dispMsg.replace(step1regex,'<a href="$1" target=_blank>$1</a>')
		dispMsg = dispMsg.replace(/<a href="www/gi,'<a href="http://www')
		dispMsg = dispMsg.replace(ftpregex,'<a href="http://$1" target=_blank>$2</a>')
		dispMsg = dispMsg.replace(emailregex,'<a href="mailto:$1">$1</a>')
		/*
		invite,remove,demotion,promotion,shutdown,logoff,memberleave,self,whisperfrom,whisperto,emote,talk,servererror,serverinfo
		userself,userwhisperfrom,useremote,usertalk
		*/
		
		switch(type)
		{
			case "self":
				dispUsr = '<span class="'+type+'">&lt;</span><span class="user'+type+'">'+username+'</span><span class="'+type+'">&gt;</span> '+dispMsg;break;
			case "whisperfrom":	
				dispUsr = '<span class="'+type+'">&lt;From </span><span class="user'+type+'">'+username+'</span><span class="'+type+'">&gt;</span> '+dispMsg;break;
			case "whisperto":	
			dispUsr = '<span class="'+type+'">&lt;To </span><span class="user'+type+'">'+username+'</span><span class="'+type+'">&gt;</span> '+dispMsg;break;
			case "emote":
				dispUsr = '<span class="'+type+'">&lt;</span><span class="user'+type+'">'+username+'</span> '+dispMsg+'<span class="'+type+'">&gt;</span>' ;break;
			case "talk":
				dispUsr = '<span class="'+type+'">&lt;</span><span class="user'+type+flag+'">'+username+'</span><span class="'+type+'">&gt;</span> '+dispMsg;break;
		}
		
		dispTime = "<td class='left'>"+dispTime+"</td>"
		dispUsr = "<td class='right'>"+dispUsr+"</td>"

		$(".webtable").append("<tr>"+dispTime+dispUsr+"</tr>")
	}
	if(!$('.firstStart')[0]){$(".webtable").addClass("firstStart")}
	lastIndexed = i
	if(!stopScroll){$('#chat').scrollTop($('#chat')[0].scrollHeight)}
	
}

$(document).ready(function(e) {
//west2east4
	$.getJSON("https://spreadsheets.google.com/feeds/list/1zrBxgY9x0RfMMd0lGY4pnhI9d2uPh0zk62kkawS19qQ/4/public/values?alt=json-in-script&callback=?",function(result){
			updateUser(result)
	});
//west1east3
	$.getJSON("https://spreadsheets.google.com/feeds/list/1zrBxgY9x0RfMMd0lGY4pnhI9d2uPh0zk62kkawS19qQ/3/public/values?alt=json-in-script&callback=?",function(result){
			updateChat(result)
	});
	setInterval(function(){ 
    //code goes here that will be run every 5 seconds.  
//west2east4	
		$.getJSON("https://spreadsheets.google.com/feeds/list/1zrBxgY9x0RfMMd0lGY4pnhI9d2uPh0zk62kkawS19qQ/4/public/values?alt=json-in-script&callback=?",function(result){
			updateUser(result)
		});
//west1east3
		$.getJSON("https://spreadsheets.google.com/feeds/list/1zrBxgY9x0RfMMd0lGY4pnhI9d2uPh0zk62kkawS19qQ/3/public/values?alt=json-in-script&callback=?",function(result){
			updateChat(result)
		});
		
	}, 5000);
});
var showing = false;
$('html').on("mouseenter", '.usertable tr',function(e) {
	user = $(this).find(".username").html()
	fetchCard = $('caption').filter(function() {
		return $(this).text() === user;
	});
	hovercard = fetchCard.closest(".hover")
	$('.usertable tr').mousemove(function(e) {
		x = event.pageX
		y = event.pageY
		hovercard.css({ top: y + 15, left: x + 15})
	});
	$('html').on("mouseleave", '.usertable tr',function(e) {
		hovercard.hide()
		showing = false
	})
	
	if (!showing){showing = true;hovercard.show()}
	
});

$('html').on("mouseenter", '#chat',function(e) {
	stopScroll = true
});

$('html').on("mouseleave", '#chat',function(e) {
	stopScroll = false
});

$('html').on("click", '#sendToBot',function(e) {
	processMsg();
});

$('html').on("keypress", '#message, #msgPass',function(e) {
	if(e.which == 13) {
       processMsg();
    }
});

function processMsg()
{
	var L, M, R, P
	L = $("#Lmessage").val()
	M = $("#message").val()
	R = $("#Rmessage").val()
	P = $("#msgPass").val()
	LMR = encodeURIComponent(encodeURIComponent(L+M+R))
	
	//DataToSend = "entry.1917938046="+LMR+"&entry.353465762="+encryptedString(key,P)//west
	DataToSend = "entry.936390245="+LMR+"&entry.338630816="+encryptedString(key,P)//east
	$("#hiddenframe").replaceWith('<iframe id="hiddenframe" style="display:none" src = "https://docs.google.com/forms/d/'+userSheet+'/formResponse?ifq&'+DataToSend+'&submit=Submit&callback=sent"/>')
	//$("#hiddenframe").attr("src","https://docs.google.com/forms/d/"+userSheet+"/formResponse?ifq&"+DataToSend+"&submit=Submit&callback=sent");
	$("#message").val("")
}




