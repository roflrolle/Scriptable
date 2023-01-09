// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: birthday-cake;
// Author roflrolle
// Github: https://github.com/roflrolle/Scriptable
// Version: 2.0

// ############################# change values here if neeeded:
const maxvalues = 3                 // maximum bdays to be displayed
const bdayemoji="🎂"                // Emoji for Bday
const bdaytext = "Geburtstage"      // Birthday in your language
const daystext = " Tag(e)"          // Day Text in your language
const yearstext = " Jahre alt"      // Year Text in your language
const color_bg = "#181919"          // Background Color of the widget
const color_head = "#fff"           // Color of headline
const color_text = "#fff"           // color of Contact Name
const color_subtext = "#808080"     // Color of Birthday
const color_daysleft = "#ffff00"    // Color of Date counter and year counter
const show_datecounter = true       // if you want to display the days till the event
const show_yearcounter = true       // if you want to display the age of the contact
const fontsize_head = 16            // header fontsize
const font_head = ""                // define font if needed
const font_text = ""                // define font if needed
const font_subtext = ""             // define font if needed
const fontsize_text = 12            // header font size
const fontsize_subtext = 10         // Birthday font size
const fontsize_subtext2 = 10        // Subtext Font size
// #############################

const list = new ListWidget()

let now = new Date()
minutes = 180
let then = new Date(now.getTime() + minutes * 60000)
list.refreshAfterDate = then

list.backgroundColor = new Color(color_bg)

const header = list.addText(bdayemoji+" " + bdaytext)
header.textColor = new Color(color_head)
header.font = new Font(font_head, fontsize_head)
list.addSpacer(10)

let containers = await ContactsContainer.all();
let contacts = await Contact.all(containers);

var array = []
contacts.forEach(function (contact) {

  if (contact.birthday) {

    var datenow = new Date()
    var date = new Date(contact.birthday)

    var agetemp = new Date(Date.now() - date.getTime())

    var bdayyear = (new Date(agetemp)).getUTCFullYear()
    var age = Math.abs(bdayyear - 1970) + 1

    if (date.getFullYear() == 1) {
      date.setDate(date.getDate() + 2)
      date.setFullYear(1900)
    }

    var temp1 = new Date()
    var temp2 = new Date(contact.birthday)

    if (temp2.getFullYear() == 1) {
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

    Difference_In_Days = Math.round(Difference_In_Days, 2)

    array.push(Difference_In_Days + ";" + contact.givenName + " " + contact.familyName + ";" + date + ";" + age)

  }

})
array.sort(function (a, b) { return a.split(";")[0] - b.split(";")[0] })

var x = 0
array.forEach(function (element) {

  var birthday = new Date(element.split(";")[2])
  var Name = element.split(";")[1]
  var DaysTill = element.split(";")[0]
  var alter = element.split(";")[3]

  if (DaysTill >= 0) {
    x += 1
    if (x <= maxvalues) {

      const form = new DateFormatter()
      form.dateFormat = "dd.MM.yyyy"

      const label = list.addText(Name)
      label.font = new Font(font_text, fontsize_text)
      label.textColor = new Color(color_text)

      const bday = list.addText(form.string(birthday))
      bday.font = new Font(font_subtext, fontsize_subtext)
      bday.textColor = new Color(color_subtext)
      bday.rightAlignText()

      var mytext = ""

      if (show_datecounter && show_yearcounter) {
        mytext = alter + yearstext + " | " + DaysTill + daystext
      }
      else if (show_yearcounter) {
        mytext = alter + yearstext
      }
      else if (show_datecounter) {
        mytext = DaysTill + daystext
      }
      const left = list.addText(mytext)
      left.font = new Font(font_subtext, fontsize_subtext2)
      left.textColor = new Color(color_daysleft)
      left.rightAlignText()

      list.addSpacer(5)
    }
  }
})

if (!config.runsInWidget) {
  list.presentSmall()
}
Script.setWidget(list)
Script.complete()
