function Tog(d) {
var expand=document.getElementById(d);
expand.style.display=(expand.style.display=='none')?'block': 'none';
}



//** Chrome Drop Down Menu- Author: Dynamic Drive (http://www.dynamicdrive.com)

//** Updated: July 14th 06' to v2.0
  //1) Ability to "left", "center", or "right" align the menu items easily, just by modifying the CSS property "text-align".
  //2) Added an optional "swipe down" transitional effect for revealing the drop down menus.
  //3) Support for multiple Chrome menus on the same page.

//** Updated: Nov 14th 06' to v2.01- added iframe shim technique

//** Updated: July 23rd, 08 to v2.4
  //1) Main menu items now remain "selected" (CSS class "selected" applied) when user moves mouse into corresponding drop down menu. 
  //2) Adds ability to specify arbitrary HTML that gets added to the end of each menu item that carries a drop down menu (ie: a down arrow image).
  //3) All event handlers added to the menu are now unobstrusive, allowing you to define your own "onmouseover" or "onclick" events on the menu items.
  //4) Fixed elusive JS error in FF that sometimes occurs when mouse quickly moves between main menu items and drop down menus

//** Updated: Oct 29th, 08 to v2.5 (only .js file modified from v2.4)
  //1) Added ability to customize reveal animation speed (# of steps)
  //2) Menu now works in IE8 beta2 (a valid doctype at the top of the page is required)

var cssdropdown={
disappeardelay: 250, //set delay in miliseconds before menu disappears onmouseout
//dropdownindicator: '<img src="/assets/down.gif"" "border=0"/>', //specify full HTML to add to end of each menu item with a drop down menu
enablereveal: [true, 5], //enable swipe effect? [true/false, steps (Number of animation steps. Integer between 1-20. Smaller=faster)]
enableiframeshim: 1, //enable "iframe shim" in IE5.5 to IE7? (1=yes, 0=no)

//No need to edit beyond here////////////////////////

dropmenuobj: null, asscmenuitem: null, domsupport: document.all || document.getElementById, standardbody: null, iframeshimadded: false, revealtimers: {},

getposOffset:function(what, offsettype){
  var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
  var parentEl=what.offsetParent;
  while (parentEl!=null){
    totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
    parentEl=parentEl.offsetParent;
  }
  return totaloffset;
},

css:function(el, targetclass, action){
  var needle=new RegExp("(^|\\s+)"+targetclass+"($|\\s+)", "ig")
  if (action=="check")
    return needle.test(el.className)
  else if (action=="remove")
    el.className=el.className.replace(needle, "")
  else if (action=="add" && !needle.test(el.className))
    el.className+=" "+targetclass
},

showmenu:function(dropmenu, e){
  if (this.enablereveal[0]){
    if (!dropmenu._trueheight || dropmenu._trueheight<10)
      dropmenu._trueheight=dropmenu.offsetHeight
    clearTimeout(this.revealtimers[dropmenu.id])
    dropmenu.style.height=dropmenu._curheight=0
    dropmenu.style.overflow="hidden"
    dropmenu.style.visibility="visible"
    this.revealtimers[dropmenu.id]=setInterval(function(){cssdropdown.revealmenu(dropmenu)}, 10)
  }
  else{
    dropmenu.style.visibility="visible"
  }
  this.css(this.asscmenuitem, "selected", "add")
},

revealmenu:function(dropmenu, dir){
  var curH=dropmenu._curheight, maxH=dropmenu._trueheight, steps=this.enablereveal[1]
  if (curH<maxH){
    var newH=Math.min(curH, maxH)
    dropmenu.style.height=newH+"px"
    dropmenu._curheight= newH + Math.round((maxH-newH)/steps) + 1
  }
  else{ //if done revealing menu
    dropmenu.style.height="auto"
    dropmenu.style.overflow="hidden"
    clearInterval(this.revealtimers[dropmenu.id])
  }
},

clearbrowseredge:function(obj, whichedge){
  var edgeoffset=0
  if (whichedge=="rightedge"){
    var windowedge=document.all && !window.opera? this.standardbody.scrollLeft+this.standardbody.clientWidth-15 : window.pageXOffset+window.innerWidth-15
    var dropmenuW=this.dropmenuobj.offsetWidth
    if (windowedge-this.dropmenuobj.x < dropmenuW)  //move menu to the left?
      edgeoffset=dropmenuW-obj.offsetWidth
  }
  else{
    var topedge=document.all && !window.opera? this.standardbody.scrollTop : window.pageYOffset
    var windowedge=document.all && !window.opera? this.standardbody.scrollTop+this.standardbody.clientHeight-15 : window.pageYOffset+window.innerHeight-18
    var dropmenuH=this.dropmenuobj._trueheight
    if (windowedge-this.dropmenuobj.y < dropmenuH){ //move up?
      edgeoffset=dropmenuH+obj.offsetHeight
      if ((this.dropmenuobj.y-topedge)<dropmenuH) //up no good either?
        edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
    }
  }
  return edgeoffset
},

dropit:function(obj, e, dropmenuID){
  if (this.dropmenuobj!=null) //hide previous menu
    this.hidemenu() //hide menu
  this.clearhidemenu()
  this.dropmenuobj=document.getElementById(dropmenuID) //reference drop down menu
  this.asscmenuitem=obj //reference associated menu item
  this.showmenu(this.dropmenuobj, e)
  this.dropmenuobj.x=this.getposOffset(obj, "left")
  this.dropmenuobj.y=this.getposOffset(obj, "top")
  this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
  this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+1+"px"
  this.positionshim() //call iframe shim function
},

positionshim:function(){ //display iframe shim function
  if (this.iframeshimadded){
    if (this.dropmenuobj.style.visibility=="visible"){
      this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
      this.shimobject.style.height=this.dropmenuobj._trueheight+"px"
      this.shimobject.style.left=parseInt(this.dropmenuobj.style.left)+"px"
      this.shimobject.style.top=parseInt(this.dropmenuobj.style.top)+"px"
      this.shimobject.style.display="block"
    }
  }
},

hideshim:function(){
  if (this.iframeshimadded)
    this.shimobject.style.display='none'
},

isContained:function(m, e){
  var e=window.event || e
  var c=e.relatedTarget || ((e.type=="mouseover")? e.fromElement : e.toElement)
  while (c && c!=m)try {c=c.parentNode} catch(e){c=m}
  if (c==m)
    return true
  else
    return false
},

dynamichide:function(m, e){
  if (!this.isContained(m, e)){
    this.delayhidemenu()
  }
},

delayhidemenu:function(){
  this.delayhide=setTimeout("cssdropdown.hidemenu()", this.disappeardelay) //hide menu
},

hidemenu:function(){
  this.css(this.asscmenuitem, "selected", "remove")
  this.dropmenuobj.style.visibility='hidden'
  this.dropmenuobj.style.left=this.dropmenuobj.style.top="-1000px"
  this.hideshim()
},

clearhidemenu:function(){
  if (this.delayhide!="undefined")
    clearTimeout(this.delayhide)
},

addEvent:function(target, functionref, tasktype){
  if (target.addEventListener)
    target.addEventListener(tasktype, functionref, false);
  else if (target.attachEvent)
    target.attachEvent('on'+tasktype, function(){return functionref.call(target, window.event)});
},

startchrome:function(){
  if (!this.domsupport)
    return
  this.standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body
  for (var ids=0; ids<arguments.length; ids++){
    var menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a")
    for (var i=0; i<menuitems.length; i++){
      if (menuitems[i].getAttribute("rel")){
        var relvalue=menuitems[i].getAttribute("rel")
        var asscdropdownmenu=document.getElementById(relvalue)
        this.addEvent(asscdropdownmenu, function(){cssdropdown.clearhidemenu()}, "mouseover")
        this.addEvent(asscdropdownmenu, function(e){cssdropdown.dynamichide(this, e)}, "mouseout")
        this.addEvent(asscdropdownmenu, function(){cssdropdown.delayhidemenu()}, "click")
        try{
          menuitems[i].innerHTML=menuitems[i].innerHTML+" "//+this.dropdownindicator
        }catch(e){}
        this.addEvent(menuitems[i], function(e){ //show drop down menu when main menu items are mouse over-ed
          if (!cssdropdown.isContained(this, e)){
            var evtobj=window.event || e
            cssdropdown.dropit(this, evtobj, this.getAttribute("rel"))
          }
        }, "mouseover")
        this.addEvent(menuitems[i], function(e){cssdropdown.dynamichide(this, e)}, "mouseout") //hide drop down menu when main menu items are mouse out
        this.addEvent(menuitems[i], function(){cssdropdown.delayhidemenu()}, "click") //hide drop down menu when main menu items are clicked on
      }
    } //end inner for
  } //end outer for
  if (this.enableiframeshim && document.all && !window.XDomainRequest && !this.iframeshimadded){ //enable iframe shim in IE5.5 thru IE7?
    document.write('<IFRAME id="iframeshim" src="about:blank" frameBorder="0" scrolling="no" style="left:0; top:0; position:absolute; display:none;z-index:90; background: transparent;"></IFRAME>')
    this.shimobject=document.getElementById("iframeshim") //reference iframe object
    this.shimobject.style.filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
    this.iframeshimadded=true
  }
} //end startchrome

}

// sort secured card table //
var sortcell = 0 //td element to sort by in secured card table, first cell is 0

$(document).ready(function() 
    { 
        $("#securedCardTable").tablesorter({
            sortList: [[sortcell,0]]
        }); 
    } 
); 

$(document).ready(function() 
    { 
        $("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        }); 
    } 
);
// ***************** sliders for secured card calculator ************//



$(document).ready(function () {
    var purBal = parseFloat($("#purBal").html());
    var cashBal = parseFloat($("#cashBal").html());
    var duration = parseFloat($("#duration").html());
    var cards = parseFloat($("#securedCards").html());

    // console.log('purBal is', purBal, 'and is of type ', typeof(purBal));
    // console.log('cashBal is', cashBal, 'and is of type ', typeof(cashBal));
    // console.log('duration is', duration, 'and is of type ', typeof(duration));
    // console.log('cards is', cards, 'and is of type ', typeof(cards));    

    function update (){
        for ( var i = 0 ; i<cards ; i++){
          var annualFee = parseFloat($('#annualFee'+i+'').html());
          var monthlyFee = parseFloat($('#monthlyFee'+i+'').html());
          var purAPR = parseFloat($('#purAPR'+i+'').html());
          var cashAPR = parseFloat($('#cashAPR'+i+'').html());
          var totalFee = duration * monthlyFee + Math.ceil(duration/12) * annualFee;
          var totalInt = ((duration/12)*365)*(purBal * purAPR/100/365 + cashBal * cashAPR/100/365);
          // console.log('annualFee is', annualFee, 'and is of type ', typeof(annualFee));
          // console.log('monthlyFee is', monthlyFee, 'and is of type ', typeof(monthlFee));
          // console.log('purAPR is', purAPR, 'and is of type ', typeof(purAPR));
          // console.log('cashAPR is', cashAPR, 'and is of type ', typeof(cashAPR));   
          // console.log('totalFee is', totalFee, 'and is of type ', typeof(totalFee));
          // console.log('totalInt is', totalInt, 'and is of type ', typeof(totalInt));                   
          $('#cardCost'+i+'').html("$" + (((totalInt+totalFee)/duration).toFixed(2)));
        };
    }


    $("#sliderPurBal").slider({
        value: purBal,
        min: 0,
        max: 1000,
        step: 50,
        slide: function (event, ui){
          $("#calcPurBal").html(ui.value).currency({decimals:0});
          purBal = ui.value;
          update(event, ui);
        },
        stop: function (event, ui) {$("#securedCardTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });

    $("#sliderCashBal").slider({
        value: cashBal,
        min: 0,
        max: 1000,
        step: 50,
        slide: function (event, ui) {
            $("#calcCashBal").html(ui.value).currency({decimals:0});
            cashBal = ui.value;
            update();
        },
        stop: function (event, ui) {
          $("#securedCardTable").tablesorter({
            sortList: [[sortcell,0]]
          });
        }           
    });

    $("#sliderDuration").slider({
        value: duration,
        min: 1,
        max: 36,
        step: 1,
        slide: function (event, ui) {
            $("#calcDuration").html(ui.value);
            duration = ui.value;
            update();
        },
        stop: function (event, ui) {$("#securedCardTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });

});
// ***************** sliders for secured card calculator************//



// ******************* slider for secured blogs site **************//
$(document).ready(function () {

    $("#blogSliderPurBal").slider({
        value: 600,
        min: 0,
        max: 1000,
        step: 50,
        slide: function (event, ui){
          $("#blogCalcPurBal").html(ui.value).currency({decimals:0});
          $("#criteria_PurBal").val(ui.value);  
        },
    });

    $("#blogSliderCashBal").slider({
        value: 0,
        min: 0,
        max: 1000,
        step: 50,
        slide: function (event, ui) {
            $("#blogCalcCashBal").html(ui.value).currency({decimals:0});
            $("#criteria_CashBal").val(ui.value);
        },
    });

    $("#blogSliderDuration").slider({
        value: 8,
        min: 1,
        max: 36,
        step: 1,
        slide: function (event, ui) {
            $("#blogCalcDuration").html(ui.value);
            $("#criteria_Duration").val(ui.value);
        },
    });

});
// ************** end slider for secured card blog site **********//


// ***************** sliders for prepaid card calculator ************//

$(document).ready(function () {
    var prepaidDuration = parseFloat($("#prepaidDuration").html());
    var wklyLoad = parseFloat($("#wklyLoad").html());
    var directDep = ($("#directDep").html())=="true";
    var wklyTrans = parseFloat($("#wklyTrans").html());
    var wklyATMBalChk = parseFloat($("#wklyATMBalChk").html());
    var wklyATMCash = parseFloat($("#wklyATMCash").html());
    var cards = parseFloat($("#prepaidCards").html());


    // console.log('purBal is', purBal, 'and is of type ', typeof(purBal));
    // console.log('cashBal is', cashBal, 'and is of type ', typeof(cashBal));
    // console.log('duration is', duration, 'and is of type ', typeof(duration));
    // console.log('cards is', cards, 'and is of type ', typeof(cards));    

    function update (){
        for ( var i = 0 ; i<cards ; i++){
          var activationFee = parseFloat($('#activationFee'+i+'').html());
          var mthFeeDirectDep = parseFloat($('#mthFeeDirectDep'+i+'').html());
          var mthFeeNoDirectDep = parseFloat($('#mthFeeNoDirectDep'+i+'').html());
          var transFeeSig = parseFloat($('#transFeeSig'+i+'').html());
          var atmBalInq = parseFloat($('#atmBalInq'+i+'').html());
          var atmWithdraw = parseFloat($('#atmWithdraw'+i+'').html()); 
          var reduceMthFeeLevel = parseFloat($('#reduceMthFeeLevel'+i+'').html());
          var reduceMthFee = parseFloat($('#reduceMthFee'+i+'').html());        
          var mthFeeDirectDep = parseFloat($('#mthFeeDirectDep'+i+'').html()); 


          var transFees = (wklyTrans*transFeeSig+wklyATMBalChk*atmBalInq+wklyATMCash*atmWithdraw)


          // calculates monthly fee based on minimums and direct deposit 
          if (!isNaN(reduceMthFeeLevel) && wklyLoad/7*30.5>=reduceMthFeeLevel) {prepaidMonthlyFee = reduceMthFee}
            else if (directDep) {prepaidMonthlyFee=mthFeeDirectDep}
              else {prepaidMonthlyFee=mthFeeNoDirectDep}

//          console.log('directDep is', directDep, 'and is of type ', typeof(directDep));
//          console.log('transFeeSig is', transFeeSig, 'and is of type ', typeof(transFeeSig));
//          console.log('wklyATMBalChk is', wklyATMBalChk, 'and is of type ', typeof(wklyATMBalChk));
//          console.log('atmBalInq is', atmBalInq, 'and is of type ', typeof(atmBalInq));   
//          console.log('wklyATMBalChk is', wklyATMBalChk, 'and is of type ', typeof(wklyATMBalChk));
//          console.log('atmWithdraw is', atmWithdraw, 'and is of type ', typeof(atmWithdraw));                   
//          $('#prepaidCost'+i+'').html("$" + (activationFee/prepaidDuration+transFees).toFixed(2));
          $('#prepaidCost'+i+'').html("$" + ((activationFee/prepaidDuration  + prepaidMonthlyFee)/30.5*7 + transFees).toFixed(2));
 
        };
    }
    $("#sliderWklyTrans").slider({
        value: wklyTrans,
        min: 0,
        max: 40,
        step: 1,
        slide: function (event, ui){
          $("#calcWklyTrans").html(ui.value);
          wklyTrans = ui.value;
          update();
        },
        stop: function (event, ui) {$("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });

    $("#sliderATMInq").slider({
        value: wklyATMBalChk,
        min: 0,
        max: 7,
        step: 1,
        slide: function (event, ui){
          $("#calcATMInq").html(ui.value);
          wklyATMBalChk= ui.value;
          update();
        },
        stop: function (event, ui) {$("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });

    $("#sliderATMCash").slider({
        value: wklyATMCash,
        min: 0,
        max: 7,
        step: 1,
        slide: function (event, ui){
          $("#calcATMCash").html(ui.value);
          wklyATMCash = ui.value;
          update();
        },
        stop: function (event, ui) {$("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });

    $("input[name='radioDirectDep']").change(function(){
        directDep = ($('input[name=radioDirectDep]:checked').val())=="true";
        if (directDep){$("#calcDirectDep").html("Yes")}
          else {$("#calcDirectDep").html("No")} ;
        update();
        $("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        });
    });

    $("#sliderWklyLoad").slider({
        value: wklyLoad,
        min: 20,
        max: 1000,
        step: 50,
        slide: function (event, ui){
          $("#calcWklyLoad").html(ui.value).currency({decimals:0});
          wklyLoad = ui.value;
          update();
        },
        stop: function (event, ui) {$("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });

    $("#sliderPrepaidDuration").slider({
        value: prepaidDuration,
        min: 1,
        max: 36,
        step: 1,
        slide: function (event, ui){
          $("#calcPrepaidDur").html(ui.value);
          prepaidDuration = ui.value;
          update();
        },
        stop: function (event, ui) {$("#prepaidTable").tablesorter({
            sortList: [[sortcell,0]]
        });
        }           
    });


});
// ***************** end sliders for prepaid card calculator************//


// ***************** sliders for prepaid card calculator blog version ************//

$(document).ready(function () {

    var prepaidDuration = parseFloat($("#prepaidDuration").html());
    var wklyLoad = parseFloat($("#wklyLoad").html());
    var directDep = ($("#directDep").html())=="true";
    var wklyTrans = parseFloat($("#wklyTrans").html());
    var wklyATMBalChk = parseFloat($("#wklyATMBalChk").html());
    var wklyATMCash = parseFloat($("#wklyATMCash").html());
    var cards = parseFloat($("#prepaidCards").html());

    $("#blogSliderWklyTrans").slider({
        value: wklyTrans,
        min: 0,
        max: 40,
        step: 1,
        slide: function (event, ui){
          $("#blogCalcWklyTrans").html(ui.value);
          $("#criteria_CalcWklyTrans").val(ui.value);  
        },
    });

    $("#blogSliderATMInq").slider({
        value: wklyATMBalChk,
        min: 0,
        max: 7,
        step: 1,
        slide: function (event, ui){
          $("#blogCalcATMInq").html(ui.value);
          $("#criteria_CalcATMInq").val(ui.value);  
        },
    });

    $("#blogSliderATMCash").slider({
        value: wklyATMCash,
        min: 0,
        max: 7,
        step: 1,
        slide: function (event, ui){
          $("#blogCalcATMCash").html(ui.value);
          $("#criteria_CalcATMCash").val(ui.value);  
        },        
    });

    $("input[name='blogRadioDirectDep']").change(function(){
        directDep = ($('input[name=blogRadioDirectDep]:checked').val())=="true";
        if (directDep){
            $("#blogCalcDirectDep").html("Yes");
            $("#criteria_CalcDirectDep").val("true");  
          }
          else {
            $("#blogCalcDirectDep").html("No");
            $("#criteria_CalcDirectDep").val("false");  
        };
    });

    $("#blogSliderWklyLoad").slider({
        value: wklyLoad,
        min: 20,
        max: 1000,
        step: 50,
        slide: function (event, ui){
          $("#blogCalcWklyLoad").html(ui.value).currency({decimals:0});
          $("#criteria_CalcWklyLoad").val(ui.value);  
        },
    });

    $("#blogSliderPrepaidDuration").slider({
        value: prepaidDuration,
        min: 1,
        max: 36,
        step: 1,
        slide: function (event, ui){
          $("#blogCalcPrepaidDur").html(ui.value);
          $("#criteria_CalcPrepaidDur").val(ui.value);  
        },           
    });


});
// ***************** end sliders for prepaid card calculator blog version ************//


