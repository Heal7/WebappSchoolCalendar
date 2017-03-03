//$函数获取id的html标签对象
function $(id){
	return document.getElementById(id);
}

//兼容各个浏览器的添加事件函数
function addEvent(node,eventType,handler){
	if(typeof(node.addEventListener)=="function"){
		node.addEventListener(eventType,handler,false);
	}
	else if(typeof(node.attachEvent)=="function"){
		node.attachEvent("on"+eventType,handler);
	}
	else{
		node["on"+eventType]=handler;
	}
}

var year_area = $("year"),
	month_area = $("month"),
	btn_last_month = $("btn-last-month"),
	btn_next_month = $("btn-next-month"),
	body_table = $('calendar-body'),
	body_days = body_table.getElementsByTagName('td');

function drawCalendar(){
	this.fitIE = function(x){ //兼容火狐与IE
		return x<10 ? "0"+x : x;
	}
	//设置对象的相关属性
	this.nowTime = new Date();//2017.02.25
	this.year = this.nowTime.getFullYear();//2017
	this.month = this.nowTime.getMonth()+1;//1+1
	this.date = this.nowTime.getDate();
	this.day = this.nowTime.getDay();
	this.schoolevents = new SchoolEvents();
	this.offset = new Date(this.year+"-"+this.fitIE(this.month)+"-"+"01").getDay();

	//定义对象的方法
	this.isLeap = function(year){
		if(this.year%400==0||(this.year%4==0&&this.year%100!=0)){
			this.daysOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
		}
		else{
			this.daysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
		}
		this.dayCount = this.daysOfMonth[this.month-1];//该月总天数
		this.ldayCount = this.daysOfMonth[new Date(this.year+"-"+(this.month-1)+"-"+this.date).getMonth()];
	}


	this.fillNavbar = function(){ //填写导航栏的年月信息
		this.isLeap(this.year);
		year_area.innerHTML = this.year+'-';
		month_area.innerHTML = this.fitIE(this.month);
	}

	this.fillBody = function(){   //绘制日期表格
		// if(this.month==2 && this.date>this.daysOfMonth[1]){
		// 	this.date = this.daysOfMonth[1];
		// }
		// else{
		// 	this.date = this.nowTime.getDate();
		// }
		
		//填写本月信息
		for(var i=(typeof(arguments[0])!="undefined"?arguments[0]:this.offset),jday=1;i<(typeof(arguments[0])!="undefined"?arguments[0]:this.offset)+(typeof(arguments[1])!="undefined"?arguments[1]:this.dayCount);i++){
			var timeStr=this.year+"-"+this.fitIE(this.month)+"-"+this.fitIE(jday);
			var today = new Date();
			// var lunarDate=this.lunarObj.lunar_calc(solarStr).lunar_date;
			if(this.year==today.getFullYear()&& this.month==(today.getMonth()+1)&& jday==today.getDate()){
				body_days[i].innerHTML="<span class='today'>"+jday+"</span>";
			}
			else{
				body_days[i].innerHTML="<span>"+jday+"</span>";
			}
			var d = new Date(timeStr);
			var eventTitle = this.schoolevents.getTitle(d);
			if(this.year == today.getFullYear()&& this.month == today.getMonth()+1 && jday == today.getDate() && eventTitle != null){
				body_days[i].innerHTML += "<span class='event-title'>"+eventTitle+"</span>"
			}
			else if((this.year != today.getFullYear() || this.month != today.getMonth()+1 ||jday != today.getDate()) && eventTitle != null){
				body_days[i].innerHTML ="<span class='eventIsShow'>"+jday+"</span>"+"<span class='event-title'>"+eventTitle+"</span>";
			}			
			jday++;
		}
		//填写下个月的日期信息
		for(var i=(typeof(arguments[0])!="undefined"?arguments[0]:this.offset)+(typeof(arguments[1])!="undefined"?arguments[1]:this.dayCount),jday=1;i<body_days.length;i++){
			body_days[i].innerHTML="<span>"+""+"</span>";
			jday++;
		}
		//填写上个月的日期信息
		for(var i=(typeof(arguments[0])!="undefined"?arguments[0]:this.offset)-1,jday=(typeof(arguments[2])!="undefined"?arguments[2]:this.ldayCount);i>=0;i--){
			body_days[i].innerHTML="<span>"+""+"</span>";
			jday--;
		}
	}
	
	this.bindEvent = function(){  //绑定相关事件
		addEvent(btn_last_month,"click",this.eventHandler.go_last_month);
		addEvent(btn_next_month,"click",this.eventHandler.go_next_month);
	}
	this.eventHandler={
		go_last_month:function(){//跳至上一个月
			calendar.month-=1;			
			if(calendar.month<1){
				calendar.month=12;
				calendar.year-=1;
				calendar.isLeap(calendar.year);
			}
			var monthStr=calendar.fitIE(calendar.month);
			var monthStr1=calendar.fitIE(calendar.month-1);
			var dateStr=calendar.fitIE(calendar.date);
			// var today=new Date(calendar.year+"-"+monthStr+"-"+dateStr);
			var offset=new Date(calendar.year+"-"+monthStr+"-"+"01").getDay();
			var dayCount=calendar.daysOfMonth[calendar.month-1];
			if(calendar.month==1){
				var ldayCount=31;
			}
			else{
				var ldayCount=calendar.daysOfMonth[new Date(calendar.year+"-"+monthStr1+"-"+dateStr).getMonth()];
			}
			calendar.fillNavbar();
			calendar.fillBody(offset,dayCount,ldayCount);
		},

		go_next_month:function(){//跳至下个月
			calendar.month+=1;
			if(calendar.month>12){
				calendar.year+=1;
				calendar.month=1;
				calendar.isLeap(calendar.year);
			}
			var monthStr=calendar.fitIE(calendar.month);
			var monthStr1=calendar.fitIE(calendar.month-1);
			var dateStr=calendar.fitIE(calendar.date);
			// var today=new Date(calendar.year+"-"+monthStr+"-"+dateStr);
			var offset=new Date(calendar.year+"-"+monthStr+"-"+"01").getDay();
			var dayCount=calendar.daysOfMonth[calendar.month-1];
			if(calendar.month==1){
				var ldayCount=31;
			}
			else{
				var ldayCount=calendar.daysOfMonth[new Date(calendar.year+"-"+monthStr1+"-"+dateStr).getMonth()];
			}
			calendar.fillNavbar();
			calendar.fillBody(offset,dayCount,ldayCount);
		}
	}
}
var calendar = new drawCalendar();
calendar.fillNavbar();
calendar.fillBody();
calendar.bindEvent();

function changestyle(){
	var change = $("btnc");
	var one = $("one");
	var two = $("two");
	if(change.innerHTML == '显示所有月份'){
		change.innerHTML = '仅显示单月历';
		one.style.display = 'none';
		two.style.display = 'block';
	}
	else{
		change.innerHTML = '显示所有月份';
		one.style.display = 'block';
		two.style.display = 'none';
	}
}