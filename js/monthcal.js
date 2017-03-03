 function CreateCalendar(para,paraJsonName){
	var cc = document.getElementById('calendarcontainer');

	var c = para.c, 
		y = para.y, //2017
		m = para.m, //2
		a = para.a,
		f = para.f;

	var today = new Date();
	var weekNum = 1;
	// var dmin = new Date(a.d1),dmax = new Date(a.d2);
    var se = new SchoolEvents();
    tmp = '';

    for (var i =0;i<f; i++){
    	d1 = new Date(y,m-1+i);//y,m,1
    	month = d1.getMonth()+1;//月份循环

    	tmp += '<table class="twoTable">';
    	tmp += '<tr class="monthName"><th colspan="8">'+month+'月'+'</th>'+'</tr>';
    	tmp += '<tr class="weekName">';
    	tmp += '<th></th>';
    	tmp += '<th>周一</th>';
    	tmp += '<th>周二</th>';
    	tmp += '<th>周三</th>';
    	tmp += '<th>周四</th>';
    	tmp += '<th>周五</th>';
    	tmp += '<th>周六</th>';
    	tmp += '<th>周日</th>'+'</tr>';

    	var dayCount = new Date(new Date(y,month,1)-86400000).getDate();//当前月一共有多少天，下个月1号减去一天的时间
    	offset = d1.getDay()-1;//当前月的第一天是星期几

    	if(month == 2){
    		for(var j=4; j<=6; j++){
    			tmp += '<tr>';
    			tmp += '<td></td>';

    			for ( var k=1; k<=7; k++){

    				var d = (j-1)*7+k-offset;
    				if( d<1||d>dayCount){
    					tmp += '<td></td>';
    				}
    				else{
    					weekNum = Math.floor((d-20)/7)+1;//对应的周数
    					date = new Date(y,month-1,d);
    					tmp += '<td'
    					if(today.getFullYear()==y && today.getMonth()==month && today.getDate() == date){
    						tmp += ' id="cur"';
    					}
    					else{
    						tmp += '';
    					}
    					var title = se.getTitle(date);
    					if(title!=null){
    						tmp += ' class="desc"';
    						tmp += '>'+'<span>'+d+'</span>'+'<span class="title">'+title+'</span>'+'</td>';
    					}
    					else{
    						tmp += '>'+d+'</td>';
    					}
    				}

    			}//列结束
    			tmp += '<td class="weekNum">第'+weekNum+'周</td>';
    			tmp += '</tr>';
    			
    		}//行结束
    		tmp += '</table>';
    	}
    	else{
    	for(var j=1; j<=6; j++){
    		tmp += '<tr>';
    		tmp += '<td></td>';

    		for ( var k=1; k<=7; k++){
    			var d = (j-1)*7+k-offset;
    			if( d<1||d>dayCount){
    				tmp += '<td></td>';
    			}
    			else{
    				switch(month)
    				{
    					case 3: weekNum = Math.floor((d+8)/7)+1;break;
    					case 4: weekNum = Math.floor((d+8+31)/7)+1;break;
    					case 5: weekNum = Math.floor((d+8+31+30)/7)+1;break;
    					case 6: weekNum = Math.floor((d+8+31+30+31)/7)+1;break;
    					case 7: weekNum = Math.floor((d+8+31+30+31+30)/7)+1;break;
    				}
    				date = new Date(y,month-1,d);
    				tmp += '<td'
    				if(today == date){
    					tmp += ' class="cur"';
    				}
    				else{
    					tmp += '';
    				}
    				var title = se.getTitle(date);
    				if(title!=null){
    					tmp += ' class="desc"';
    					tmp += '>'+'<span>'+d+'</span>'+'<span class="title">'+title+'</span>'+'</td>';
    				}
    				else{
    					tmp += '>'+'<span>'+d+'</span>'+'<span>'+' '+'</span>'+'</td>';
    				}
    			}
    		}   		
    		tmp += '<td class="weekNum">第'+weekNum+'周</td>';
    		tmp += '</tr>';
    	}
    	tmp += '</table>';
    	}
	}	
	cc.innerHTML += tmp;
}