//Cutscene Lengths in ms
var Praetorium =
{
    0: { name: "Opening", duration: 53000},
    1: { name: "Ah Cid, My Boy", duration: 135690 },
    2: { name: "Cid is a Creeper", duration: 31690 },
    3: { name: "Maggie is a Good Doggo", duration: 50690},
    4: { name: "Doggie Projectile Vomits All Over Door", duration: 72690 },
    5: { name: "Daddy Never Loved Me!", duration: 200690 },
    6: { name: "Massive Power Surge", duration: 101690 },
    7: { name: "Bloody Glib, Gaius! You Looked Better in Black", duration: 230690 },
    8: { name: "Scenic Route to the Weapon of Mass Destruction", duration: 27690 },
    9: { name: "I Took Out My Sword, JUST to Put it Away Again!", duration: 90690 },
    10: { name: "SUCH DEVASTATION", duration: 250690 },
    11:{ name: "Thancred's Lala Bread", duration: 190690},
    length: 12
}
var CastrumMeridianum =
{
    0: { name: "Opening", duration: 20000 },
    1: { name: "The Scenic View", duration: 22000 },
    2: { name: "1 v 1....err...8", duration: 21000},
    3: { name: "Okay, Maybe it is a Bit of a Grudge.", duration: 115000 },
    4: { name: "Obligatory totally stealthy portion", duration: 10000 },
    5: { name: "Tactical Drone Inbound", duration: 25000 },
    6: { name: "Raise some hell", duration: 65000 },
    7: { name: "I Love Fireworks!", duration: 94000 },
    8: { name: "What isn't conventional about this weapon?", duration: 46000 },
    9: { name: "Time to Play the Claw Game", duration: 63000 },
    10:{ name: "No Thanks, You Can Keep Gaius", duration: 92000 },
    length: 11
}
var E12S =
{
    0: { name: "Phase Change", duration: 75230 },
    length: 1
}
var E8S =
{
    0: { name: "Phase Change", duration: 50670 },
    length: 1
}
var CastrumMarinum =
{
    0: { name: "Notice Me Daddy Gaius!", duration: 39870 },
    1: { name: "The Dude that Turns into Another Dude", duration: 57870 },
    length: 2
}
var CinderDrift =
{
    0: { name: "Big Fat Tacos", duration: 40000 },
    1: { name: "The Chick that Turns into Another Chick", duration: 60560 },
    length: 2
}
var TEA =
{
    0: { name: "Phase Change", duration: 57590 },
    length: 1
}
var O8S =
{
    0: { name: "Phase Change", duration: 37360 },
    length: 1
}
var E1 = 
{
    0: { name: "Opening Cutscene", duration: 30300 },
    1: { name: "Phase Change", duration: 47310 },
    length: 2
}
var OrbonneMonastery =
{
    0: { name: "Opening Cutscene", duration: 31850 },
    1: { name: "Analysis", duration: 14120 },
    2: { name: "Ultima, Hold the Weapon", duration: 54580 },
    length: 3
}

var currentCutscene;
var currentDuty = JSON.parse(JSON.stringify(Praetorium));
var timeRemaining;
var timerTask;
var RemoveRowClasses = ["h-8","w-64","text-m","bg-red-300","rounded-lg"];
var noSleep = new NoSleep();

function BeginDutyClick()
{
    var errorMessage = ValidatedInputsIfNecessary();
    if(!errorMessage)
    {
        document.getElementById("DutyDisplay").classList.add("hidden");
        document.getElementById("CutsceneTimerDisplay").classList.remove("hidden");
        currentCutscene = 0;
        document.getElementById("currentCutsceneName").innerHTML = "Waiting for first cutscene to start";
        document.getElementById("nextCutsceneName").innerHTML = "Next Cutscene: "+currentDuty[0].name;
        document.getElementById("timeRemaining").innerHTML = "";
        document.getElementById("StartCutsceneButton").classList.remove("hidden");
    }
    else
    {
        alert(errorMessage);
    }
}

function ValidatedInputsIfNecessary()
{
    if(document.getElementById("CutsceneCustomizationDisplay").classList.contains("hidden"))
        return "";
    var updatedDuty = { length: currentDuty.length};
    var table = document.getElementById("CustomDutyTable");
    for(var i = 0; i < currentDuty.length; i++)
    {
        var row = table.rows[i+1];
        updatedDuty[i] = { name: row.childNodes[0].childNodes[0].value, duration: 0};
        if(updatedDuty[i].name != null)
            updatedDuty[i].name = (updatedDuty[i].name.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"")).trim();
        else
            return "Invalid Cutscene Name";
        if(updatedDuty[i].name.length == 0)
            return "Invalid Cutscene Name";
        updatedDuty[i].duration = parseInt(row.childNodes[1].childNodes[0].value);
        if(Number.isNaN(updatedDuty[i].duration) || updatedDuty[i].duration <= 10 || updatedDuty[i].duration % 10 != 0)
            return "Only whole positive intervals of 10 allowed";
    }
    currentDuty = updatedDuty;
    return "";
}

function UpdateDutySelection()
{
    switch(document.getElementById("DutySelect").value)
    {
        case "praetorium":
            currentDuty = JSON.parse(JSON.stringify(Praetorium));
            break;
        case "castrummeridianum":
            currentDuty = JSON.parse(JSON.stringify(CastrumMeridianum));
            break;
        case "e12s":
            currentDuty = JSON.parse(JSON.stringify(E12S));
            break;
        case "e8s":
            currentDuty = JSON.parse(JSON.stringify(E8S));
            break;
        case "castrummarinum":
            currentDuty = JSON.parse(JSON.stringify(CastrumMarinum));
            break;
        case "cinderdrift":
            currentDuty = JSON.parse(JSON.stringify(CinderDrift));
            break;
        case "tea":
            currentDuty = JSON.parse(JSON.stringify(TEA));
            break;
        case "o8s":
            currentDuty = JSON.parse(JSON.stringify(O8S));
            break;
        case "e1":
            currentDuty = JSON.parse(JSON.stringify(E1));
            break;
        case "orbonnemonastery":
            currentDuty = JSON.parse(JSON.stringify(OrbonneMonastery));
            break;
        default:
            currentDuty = 
            {
                0: { name: "", duration: 0},
                length: 1
            };
            break;
    }
    if(!document.getElementById("CutsceneCustomizationDisplay").classList.contains("hidden"))
    {
        ClearDutyCustomizationTable();
        UpdateDutyCustomizationTable();
    }
}

function UpdateDutyCustomizationTable()
{
    var table = document.getElementById("CustomDutyTable");
    for(var r = 0;r < currentDuty.length; r++)
    {
        var row = table.insertRow(r+1);
        if(r%2 == 0)
            row.classList.add("bg-purple-100")
        for (c = 0; c < 3; c++) {
            var cell = row.insertCell(c) // create DIV element
            cell.classList.add("border-solid");
            cell.classList.add("border-4");
            cell.classList.add("border-purple-500");
            cell.classList.add("border-opacity-25");
            var cellContents = document.createElement("div");
            switch(c)
            {
                case 0:
                    cellContents = CreateTextInput(currentDuty[r].name);
                    cellContents.classList.add("w-96");
                    break;
                case 1:
                    cellContents = CreateTextInput(currentDuty[r].duration);
                    cellContents.classList.add("w-24");
                    cell.classList.add("text-center");
                    break;
                case 2:
                    if(currentDuty.length > 1)
                        cellContents = CreateRemoveCutsceneButton(table, r+1);
                    break;
            }
            cell.appendChild(cellContents);      // append DIV to the table cell
        }
    }
}

function CreateTextInput(value)
{
    var newInput = document.createElement("input");
    newInput.value = value;
    return newInput;
}

function CreateRemoveCutsceneButton(table, row)
{
    var button = document.createElement("button");
    button.innerHTML = "Delete Cutscene";
    RemoveRowClasses.forEach(className => {
        button.classList.add(className);
    });
    button.setAttribute("onclick","RemoveCutscene("+row+")");
    return button;
}

function AddCutscene()
{
    currentDuty[currentDuty.length++] = { name: "", duration: 0};
    ClearDutyCustomizationTable();
    UpdateDutyCustomizationTable();
}

function RemoveCutscene(row)
{
    var oldLength = currentDuty.length;
    var updatedDuty = { length: oldLength-1};
    for(var i = 0, c=0; i < oldLength; i++)
        if(i != row)
            updatedDuty[c++] = currentDuty[i];
    currentDuty = updatedDuty;
    ClearDutyCustomizationTable();
    UpdateDutyCustomizationTable();
}

function ClearDutyCustomizationTable()
{
    var table = document.getElementById("CustomDutyTable");
    for(var r = table.rows.length-2; r > 0; r--)
        table.deleteRow(r);
}

function CustomizeDutyClick()
{
    ClearDutyCustomizationTable();
    document.getElementById("CutsceneCustomizationDisplay").classList.remove("hidden");
    document.getElementById("CustomizeDutyButton").classList.add("hidden");
    document.getElementById("ResetCustomizationButton").classList.remove("hidden");
    UpdateDutyCustomizationTable();
}

function ResetCustomizationsClick()
{
    ClearDutyCustomizationTable();
    UpdateDutySelection();
    document.getElementById("CutsceneCustomizationDisplay").classList.add("hidden");    
    document.getElementById("ResetCustomizationButton").classList.add("hidden");
    document.getElementById("CustomizeDutyButton").classList.remove("hidden");
}

function ResetDutyClick()
{
    document.getElementById("DutyDisplay").classList.remove("hidden");
    document.getElementById("CutsceneTimerDisplay").classList.add("hidden");
    clearTimeout(timerTask);
}

function OnCutsceneClick()
{    
    if(timerTask != null)
        clearTimeout(timerTask);
	console.log("Playing cutscene "+currentCutscene);
    document.getElementById("currentCutsceneName").innerHTML = "Now Playing: "+currentDuty[currentCutscene].name;
    if(currentCutscene == currentDuty.length-1)
    {
        document.getElementById("StartCutsceneButton").classList.add("hidden");
        document.getElementById("nextCutsceneName").innerHTML = "Next Cutscene: Duty Completion";
    }
    else
        document.getElementById("nextCutsceneName").innerHTML = "Next Cutscene: "+currentDuty[currentCutscene+1].name;
    noSleep.enable();
    timeRemaining = document.getElementById("HDD").value ? currentDuty[currentCutscene].duration + 15000 : currentDuty[currentCutscene].duration;
    timerTask = setTimeout(UpdateTimer, 10);
    currentCutscene += 1;
}

function UpdateTimer()
{    
    timeRemaining = timeRemaining - 10;
    var minutes = Math.floor((timeRemaining / 60000)).toString();
    var seconds = (timeRemaining % 60000) / 1000;
    if(seconds < 10)
        seconds = "0"+seconds.toString();
    document.getElementById("timeRemaining").innerHTML = "Time Remaining: "+minutes+":"+seconds;

    if(timeRemaining > 0)
        timerTask = setTimeout(UpdateTimer, 10);
    else
    {
        OnCutsceneEnd();
        clearTimeout(timerTask);
    }
}

function OnCutsceneEnd()
{
    document.getElementById('CutsceneEndAudio').play();
    noSleep.disable();
    if(currentCutscene == currentDuty.length)
    {
        document.getElementById("currentCutsceneName").innerHTML = "Thank you for using this tool.";
        document.getElementById("nextCutsceneName").innerHTML = "If you liked it maybe buy me a kofi with the link at the bottom.";
        document.getElementById("timeRemaining").innerHTML = "Please report any bugs to spudmantwo@gmail.com or spudmantwo#3039 on Discord";
    }
    else
    {
        document.getElementById("currentCutsceneName").innerHTML = "Waiting for next cutscene to start";
        document.getElementById("timeRemaining").innerHTML = "";
    }
}