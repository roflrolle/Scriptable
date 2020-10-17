// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: newspaper;
// created by roflrolle

// maximum number of news to be displayed
// 4,5 and 6 are worling good
const maxnews=4

var widgetwidth=Math.round((120/maxnews)/2,2)

// change the colors here
const color_bg_widget="#2159A2"
const color_text_head="#fff"
const color_text_err="#fff"
const color_text_title="#fff"
const color_text_sub="#d6cecc"

// adjust this if you use more then 6 news or less then 4
var fontsizeTitle=12
var fontsizeSub=8

let widget = new ListWidget()

var isonline=false

var url = "https://www.tagesschau.de/api2"

var isonline=false
try{
  let req = new Request(url)
  var json = await req.loadJSON()
  isonline=true
}
catch{
  
}

let stack1=widget.addStack()
stack1.borderWidth=0
stack1.centerAlignContent()
stack1.size=new Size(320,30)

let title=stack1.addText("Tagesschau:")

title.textColor=new Color(color_text_head)

if(isonline){
  for(var i=0;i< maxnews;i++){
    
    let stack0=widget.addStack()
    stack0.borderWidth=0
    stack0.centerAlignContent()
    stack0.size=new Size(320,widgetwidth)
    let title=stack0.addText(json.news[i].title)
    stack0.url=json.news[i].detailsweb
    
    let stack2=widget.addStack()
    stack2.borderWidth=0
    stack2.centerAlignContent()
    stack2.size=new Size(320,widgetwidth)
    stack2.url=json.news[i].detailsweb
    let subtitle=stack2.addText(json.news[i].firstSentence)
    
    title.font=new Font("",fontsizeTitle)
    subtitle.font=new Font("",fontsizeSub)
      subtitle.textColor=new Color(color_text_sub)
      title.textColor=new Color(color_text_title)
  
  }
}
else{
  let errortext=widget.addText("Currently no internet connection")
  
  errortext.font=new Font("",12)
  errortext.textColor=new Color(color_text_err)
}


widget.backgroundColor= new Color(color_bg_widget)

  Script.setWidget(widget)
  widget.presentMedium()
  Script.complete()