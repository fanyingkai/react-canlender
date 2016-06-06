import $ from '../components/jquery.js'

        var HM_Calendar=(function(){
             
             function calender(argument) {
                
                this.baseDefault();
                this.init(argument);
                
                var _self=this;

                var show= function(argument){
                   _show.call(_self,argument)
                   _self.addEvent();
                }

                return {show:show};

             }
             
             var _show=function(argument) {
                 // body...
                if(argument){
                  !(typeof(argument)=='string') && ('month' in argument) && !isNaN(argument.month) && this.init({month:argument.month,transition:argument.transition})
                  typeof(argument)=='string' && this.pageDown(argument);
                 
                }

                var _html=this.tmpl(this.tpl.cal_line,{ data : this.dateColl });
                // console.log(_html)
                $(this.elBox).html(this.tpl.cal_box);
                $(this.el).html('');
                $(this.el).append(this.tpl.cal_title);
                $(this.el).append(_html);
                $(this.el)[0].style.width=this.width;
                document.getElementById('curMonthText').innerHTML=this.chooseYear+"年" + this.chooseMonth+ '月';
                document.getElementById('curDayText').innerHTML='今天：'+ this.month+'月'+ this.date+'日';
                // $(this.elBox).height(400)//.height('auto');
                // curDate

             }; 


             calender.prototype.baseDefault=function() {
                 
                 this.width='91%';
                 this.curDate=new Date();
                 this.year=this.curDate.getFullYear();
                 this.month=this.curDate.getMonth()+1;
                 this.date=this.curDate.getDate();
                 this.day=this.curDate.getDay();
                 this.chooseMonth=this.month;
                 this.chooseYear=this.year;
                 this.cache = {};
                 // this.curDate=new Date();
                 
                 // body...
                 this.elBox='#calender';
                 this.el='#calender-box';
                 
                 // this.curYearDay=new Date(this.year,0,0);
                 this.dateColl=[];
                 this.dateCollMaps={};
                 
                 this.tpl={
                     'cal_box':'<div class="title-box clearfix">\
                       <div class="title" id="curMonthText"></div>\
                       <div class="title" id="curDayText"></div>\
                      </div>\
                      <div id="calender-box">\
                      </div>',
                     'cal_title':'<dl class="clearfix">\
                         <dt><em>日</em></dt><dt><em>一</em></dt><dt><em>二</em></dt><dt><em>三</em></dt><dt><em>四</em></dt><dt><em>五</em></dt><dt><em>六</em></dt>\
                     </dl>',
                     'cal_line':'<% for (var i =  0; i < Math.ceil(data.length / 7); i++) {  %>\
                     <dl class="clearfix">\
                         <% for (var j =  0; j < 7 && i*7+j < data.length; j++) {  %>\
                         <dd>\
                         <em id="<%=data[i*7+j].year %>_<%=data[i*7+j].month %>_<%=data[i*7+j].date %>" style="<% if(!data[i*7+j].ifCurMonth){ %> color:#D0CBCB; <% } %>" class="<% if(data[i*7+j].ifCurDay){ %> cur <% } %>" ><%= data[i*7+j].date %></em>\
                         </dd>\
                         <%  } %>\
                     </dl>\
                     <%  } %>'
                 };

             }

             calender.prototype.init=function(argument) {

                if(!!argument){

                    if(('visual' in argument) && argument.visual.width) {
                      var reg = new RegExp(/^\d+%$/);
                      var result = reg.test(argument.visual.width);
                      var isN=isNaN(argument.visual.width);
                      if(result){
                       this.width = argument.visual.width;
                      }
                      if(!isN){
                       this.width = argument.visual.width+'px';
                      }
                    }

                    ('nowDate' in argument) && (this.initCurDate(argument.nowDate));

                    var data=argument.data;
                    var curMonth=argument.curMonth||argument.month;
                    var criticalPoint=argument.criticalPoint;
                    var resultset=argument.resultset;
                    var date=argument.date;
                    var curMonth=''+curMonth;

                    if(!isNaN(curMonth) && (''+curMonth).length==6){
                      this.chooseMonth=Number(curMonth.slice(4));
                      this.chooseYear=curMonth.slice(0,4);
                    }

                    // console.log(this.chooseMonth+"   "+this.chooseYear);

                    this.criticalPointSec= criticalPoint;
                    this.criticalPoint= this.secondToTime(criticalPoint)
                    /*this.date=date.slice(6,8);

                    this.curDate=new Date(this.month+ '-' +this.year+ '-' +this.date+' 00:00:00');*/

                    this.resultset = resultset;


                }

                this.dateColl=[];
                this.leftDaysColl();
                // console.log('m-y'+this.month+ '-' +this.year)
                var startDate=new Date(this.chooseYear,this.chooseMonth-1,0);
                var endDate=new Date(this.chooseYear,this.chooseMonth,0);
                this.getMonthDayColl(startDate,endDate);
                
                this.rightDaysColl();

                for (var i =  0; i < this.dateColl.length; i++) {
                    // console.log(this.dateColl[i]);
                }

                // console.log('==========================')
                // console.log(this.dateColl)

             }


             calender.prototype.secondToTime=function(criticalPoint) {
                 
                 var h=criticalPoint/3600;
                 var m=criticalPoint%3600/60;
                 var s=criticalPoint%3600;

                 return h+'时'+m+ '分'+ s+'秒';

             }

             calender.prototype.compareTime=function(time) {
                 // 
                 // console.log(this.criticalPointSec+'   '+time)
                 return Number(time)<=Number(this.criticalPointSec);

             }

             calender.prototype.secondToDate=function(second){
                var date=new Date(second*1000);
                var Year=date.getFullYear();
                var Mouth=date.getMonth()+1;
                var day=date.getDate();
                return Year + '年' + Mouth+ '月' + day+'日';
             }

             calender.prototype.tmpl = function(str, data){
                  var fn = !/\W/.test(str) ?
                    cache[str] = cache[str] ||
                      tmpl(document.getElementById(str).innerHTML) :

                     new Function("obj",
                       "var p=[],print=function(){p.push.apply(p,arguments);};" +
                      
                       "with(obj){p.push('" +
                      
                       str
                         .replace(/[\r\t\n]/g, " ")
                         .split("<%").join("\t")
                         .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                         .replace(/\t=(.*?)%>/g, "',$1,'")
                         .split("\t").join("');")
                         .split("%>").join("p.push('")
                         .split("\r").join("\\'")
                     + "');}return p.join('');");
                 
                  return data ? fn( data ) : fn;
             };


             calender.prototype.initCurDate=function(curDay) {
                 var curDay=''+curDay;
                 if(!isNaN(curDay) && curDay.length==8){
                   this.year=curDay.slice(0,4);
                   this.month=Number(curDay.slice(4,6));
                   this.day=curDay.slice(6,8);
                   this.curDate=new Date(this.year ,Number(curDay.slice(4,6))-1 ,this.day);
                   this.date=this.curDate.getDate();
                 }

             }

             calender.prototype.leftDaysColl=function(argument) {
              // body...
                var leftDate=new Date(this.chooseYear,this.chooseMonth-1,0);
                var l=leftDate.getDay()+1;
                var leftDay=l;
                // console.log(l+" "+leftDay+"     "+leftDate+" "+leftDate.getDay())
                for (var i = leftDay; i>0; i--) {
                    var linD=this.getDatePro(leftDate);
                    linD.ifCurMonth=false;
                    this.dateColl.unshift(linD)
                    // console.log(linD)
                    leftDate.setDate(leftDate.getDate() - 1);
                }

             }

             calender.prototype.rightDaysColl=function(argument) {
              // body...
                var rightDate=new Date(this.chooseYear,this.chooseMonth,0);
                var r=6-rightDate.getDay();
                var rightDay=r;
                // console.log(r+" "+rightDay+"     "+rightDate+" "+rightDate.getDay())
                for (var i = 0; i<rightDay; i++) {
                    rightDate.setDate(rightDate.getDate() + 1);
                    var linD=this.getDatePro(rightDate);
                    linD.ifCurMonth=false;
                    // console.log(linD)
                    this.dateColl.push(linD)
                }

             }

             

             calender.prototype.pageDown=function(argument) {
              // body...\
                 
                 switch(argument){
                   case 'prev':
                    this.chooseMonth==1 ? (this.chooseMonth=12,this.chooseYear--) : this.chooseMonth--;
                    break;
                   case 'next':
                    this.chooseMonth==12 ? (this.chooseMonth=1,this.chooseYear++ ): this.chooseMonth++;
                    break;
                  }

                  this.init();
             }


             calender.prototype.addEvent=function(argument) {
              // body...
                 var _self=this;
                 var calenderDayChoose=function(event) {

                    var _this=$(this);
                    var id=this.getAttribute('id');
                    var dateArr=id.split("_");
                    $(_self.el+' dd em').removeClass('cur')
                    _this.addClass('cur');
                    // console.log('cur_id=========='+dateArr[0]+' '+dateArr[1]+' '+dateArr[2] )

                 }
                $(this.el).on('click','dd em',calenderDayChoose)

             }
            

             calender.prototype.getMonthDayColl=function(date2,date1) {
                // body...
                var i=0;
                while(!(date1.getFullYear() == date2.getFullYear() 
                    && date1.getMonth() == date2.getMonth() 
                    && date1.getDate() == date2.getDate())){

                    date2.setDate(date2.getDate() + 1);
                    var setting='';

                    if(this.resultset){
                      setting=this.resultset[0].setting;
                    }

                    var _datePro=this.getDatePro(date2);
                    _datePro.settingTrue=this.compareTime(setting);
                    setting=this.secondToTime(setting);
                    _datePro.setting=setting;
                    // 

                    this.dateColl.push(_datePro)
                    console.log(_datePro)
                    i++;
                }
            }


            calender.prototype.getDatePro=function(dateObj) {

                var year=dateObj.getFullYear();
                var month=dateObj.getMonth()+1;
                var date=dateObj.getDate();
                var day=dateObj.getDay();
                var ifCurDay=false;

                if(dateObj.getFullYear() == this.curDate.getFullYear() 
                    && dateObj.getMonth() == this.curDate.getMonth() 
                    && dateObj.getDate() == this.curDate.getDate()){
                    ifCurDay=true;
                }

                var _dateObj={
                    year:year,
                    month:month,
                    date:date,
                    day:day,
                    ifCurMonth:true,
                    ifCurDay:ifCurDay
                }

                return _dateObj;
            }

            return calender;

        })();

export default HM_Calendar