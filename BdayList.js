// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: birthday-cake;
// Author roflrolle
// Github: https://github.com/roflrolle/Scriptable

// change values here if neeeded:

// maximum bdays to be displayed
const maxvalues=4
// Birthday in your language
const bdaytext="Geburtstage"
const color_bg = "#181919"
const color_head= "#fff"
const color_text="#fff"
const color_subtext="#808080"
const fontsize_head= 16
const font_head=""
const font_text=""
const font_subtext=""
const fontsize_text=11
const fontsize_subtext=9
// #############################

const list = new ListWidget()

let now= new Date()
minutes=180
let then= new Date(now.getTime() + minutes*60000)
list.refreshAfterDate=then

list.backgroundColor=new Color(color_bg)

const header=list.addText("🎂 "+bdaytext)
  header.textColor=new Color(color_head)
  header.font = new Font(font_head,fontsize_head)
  list.addSpacer(5)

let containers = await ContactsContainer.all();
let contacts = await Contact.all(containers);

var array= []
contacts.forEach(function(contact){
  
  if(contact.birthday){

var datenow= new Date()
var date= new Date(contact.birthday)

if(date.getFullYear() == 1){
  date.setDate(date.getDate() + 2)
  date.setFullYear(1900)
}

var temp1 = new Date()
var temp2 = new Date(contact.birthday)

if(temp2.getFullYear() == 1){
  temp2.setDate(temp2.getDate() + 2)
}

temp1.setFullYear(2020)
temp1.setHours(0)
temp1.setMinutes(0)
temp1.setSeconds(0)
temp2.setFullYear(2020)
temp2.setHours(0)
temp2.setMinutes(0)
temp2.setSeconds(0)


var Difference_In_Time = temp2.getTime() - temp1.getTime(); 


var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

Difference_In_Days=Math.round(Difference_In_Days,2)

array.push(Difference_In_Days+";"+contact.givenName+" "+contact.familyName+";"+date)

}

})
array.sort(function(a, b){return a.split(";")[0] -b.split(";")[0]})

var x=0
array.forEach(function(element){

var birthday= new Date(element.split(";")[2])
var Name =  element.split(";")[1]
var DaysTill= element.split(";")[0]
if(DaysTill >= 0){
  x+=1
  if(x <=maxvalues){
    
    console.log(element)
    
      const label = list.addText(Name)
  label.font = new Font(font_text,fontsize_text)
  label.textColor=new Color(color_text)
  
  const form=new DateFormatter()
  form.dateFormat="dd.MM.yyyy"

  const bday = list.addText("("+DaysTill+") "+form.string(birthday))
  bday.font = new Font(font_subtext,fontsize_subtext)
  bday.textColor=new Color(color_subtext)
  bday.rightAlignText()
  list.addSpacer(5)
    
  }
}
  

})

if (!config.runsInWidget) {
  list.presentSmall()
}
Script.setWidget(list)
Script.complete()