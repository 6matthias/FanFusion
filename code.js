const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;
const saveKey = "history" //key "history"

function syllabify(words) {
    if (words.includes(" ")) {
        let l = words.split(" ").length;
        let splitted = words.split(" ")
        let batch = [];
        for (let i = 0; i < l; i++) {
            let newSplit = splitted[i].match(syllableRegex)
            batch = batch.concat(newSplit)
        }
        return batch;
    } else {
        return words.match(syllableRegex);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const storeComp = typeof(Storage) !== "undefined"

const credits = [
    {"name": "MrXCube", "created": ["1-36"]},
    {"name": "R3DZ3R", "created": [0,37]}

]

credits.forEach(function(x, creditIndex) {

    x.created.forEach(function (x2, numberIndex) {
        if((typeof x2) == "string"){
            let range = x2.split("-")

            let l = Number(range[1])+1

            x.created.splice(numberIndex, 1)

            for(let i=range[0]; i<l; i++) {
                x.created.push(Number(i))
            }

        }

    })

})

const mojinames =
    "Surprised;Blush;Confused;Crying;Dissapoint;Flush;Happy;Laugh;Putoff;Puzzled;Sad;Screaming;Sleep;Sweating;Suspicious;SweatSmile;Think;Troll;Flipped;Wink;Star;Imp;Wiki;Coin;Love;MindBlown;Yes;No;SweatThink;Relief;Nope;Concerned;Skull;Shocked;Cool;LelCube;Zeriously";
let mojicount = mojinames.split(";").length

let historyHistory= []

let crown = false;

function addHistory(emo1, emo2, save) {

    let newHistory = emo1.val()+"_"+emo2.val()

    if (historyHistory.includes(newHistory)) {return}

    historyHistory.push(newHistory)

    document.querySelector('#history').insertAdjacentHTML("afterbegin",
    `
    <div class="historySec">
        <div class="hispart spart hp1">
            <div class="horSpace"></div>
            <img src="./assets/fusions/0_${emo1.val()}.png" alt="" width="80" height="80" class="tappy emote">
            <p>${emo1.text()}</p>
        </div>

        <div class="hisres hispart">
            <img src="./assets/fusions/${emo1.val()}_${emo2.val()}.png" alt="" width="120" height="120" class="tappy emote">
        </div>

        <div class="hispart spart hp2">
            <div class="horSpace"></div>
            <img src="./assets/fusions/0_${emo2.val()}.png" alt="" width="80" height="80" class="tappy emote">
            <p>${emo2.text()}</p>
        </div>
    </div>
    `)
    
    $("#foundCounter").text(`Found: ${historyHistory.length} / ${Math.pow(mojicount, 2)}` )
    if(historyHistory.length == Math.pow(mojicount, 2)){
        $(`#crown`).show();
        crown = true
    }

    if (save) {
        localStorage.setItem(saveKey, historyHistory.join("|"));
    }

}

function update() {

    let currSel = $('#emo1').find(":selected")
    let currSel2 = $('#emo2').find(":selected")

    addHistory(currSel, currSel2, true);

    currSel = currSel.val()
    currSel2 = currSel2.val()

    $(".emote1").attr("src", `assets/fusions/${currSel}_0.png`);

    $(".emote2").attr("src", `assets/fusions/${currSel2}_0.png`);

    let one = $('#emo1').find(":selected");
    let two = $('#emo2').find(":selected");

    let newLink = `assets/fusions/${one.val()}_${two.val()}.png`

    $(".result").attr("src", newLink);

    let newtitle = ""

    if (one.val() == two.val()) {
        newtitle = one.text()
    } else {

        let firstSec = syllabify(one.text())
        if (firstSec.length > 1) {
            firstSec.pop();
            firstSec = firstSec.join("");
        } else {
            firstSec = firstSec[0]
            firstSec = firstSec.substr(0, Math.ceil(firstSec.length / 2));
        }

        let ndSec = syllabify(two.text())
        if (ndSec.length > 1) {
            ndSec = ndSec.pop();
        } else {
            ndSec = ndSec.join("").substr(Math.floor(ndSec.join("").length / 2), Math.floor(ndSec.join("").length));
        }

        newtitle = firstSec + ndSec
        newtitle = capitalizeFirstLetter(newtitle.toLowerCase())

    }



    $("#mixName").text(newtitle)

    $("#down").attr('download', newtitle);
    $("#down").attr('href', newLink);


    let creditnumber = Math.max(Number(one.val()), Number(two.val()))
    let creditname = "idk"

    credits.some(function(x) {
        if (x.created.includes(creditnumber)) {
            creditname = x.name
            return
        }
    })

    $("#creditImg").attr('src', `./assets/credits/${creditname}.png`);
    $("#creditImg").attr('alt', creditname);
    $("#creditImg").attr('title', creditname);

}

function flip() {
    let cache = $('#emo1').find(":selected").val();
    $('#emo1').val($('#emo2').find(":selected").val())
    $('#emo2').val(cache)

    update()
}

function random() {
    $('#emo1').val(Math.floor(Math.random() * (mojicount - 1)) + 1)
    $('#emo2').val(Math.floor(Math.random() * (mojicount - 1)) + 1)

    update()
    
}

function revealSave() {
    $('.save').slideDown("slow")
}


$(document).ready(function () {

    /* $("#credit").text(`${(mojicount - 1) ** 2} emojis fusioned manually by @MrXCube`) */


    let names = mojinames.split(";")
    for (var i = 1; i < mojicount+1; i++) {

        let names = mojinames.split(";")

        $('#emo1').append($('<option>', {
            value: i,
            text: names[i-1]
        }));

        $('#emo2').append($('<option>', {
            value: i,
            text: names[i-1]
        }));

    }


    $(".emote1").attr("src", `assets/fusions/1_0.png`);
    $(".emote2").attr("src", `assets/fusions/1_0.png`);



    if(storeComp){

        if(localStorage.getItem(saveKey) !== null) {
            let newHistoryHistory = localStorage.getItem(saveKey).split("|");
            let l = newHistoryHistory.length
            for(let i = 0; i<l; i++){
                let split = newHistoryHistory[i].split("_")
                let A = parseInt(split[0]) 
                let B = parseInt(split[1]) 
                addHistory($(`#emo1 option[value="${A}"]`), $(`#emo2 option[value="${B}"]`), false)
            }
        }
    }

    $('#emo1').change(function () { update() })

    $('#emo2').change(function () { update() })

    update();

    $(".frame").show();
    $("html").css("background-color","white");

/*     for(let x = 1; x<mojicount+1; x++) {  //Find all
        for(let y = 1; y<mojicount+1; y++) {
            $('#emo1').val(Math.floor(x))
            $('#emo2').val(Math.floor(y))
        
            update()
        }
    } */

})

$(window).on('load', function () {

    let resultRot = 0
    let inv = false
    let saveReveal = 0.0
    let reveal = false


    $(".tappy").click(function () {

        if (!reveal){
            saveReveal = saveReveal + 1

            if (saveReveal > 5){
                revealSave()
            }
    
        }

        let newrot = 2

        if ($(this).data("rot")) {
            newrot = Math.abs($(this).data("rot")) + 2
        }

        if ($(this).data("inv")) {
            newrot = -newrot
        }
        $(this).data("rot", newrot)


        $(this).data("inv", !$(this).data("inv"))
    })

    setInterval(function () {

        if (!reveal){
            saveReveal = Math.max(0, saveReveal - 0.05)
        }

        $(".tappy").each(function (i, obj) {

            if ($(obj).data("rot")) {

                $(obj).css("transform", `rotate(${$(obj).data("rot")}deg)`)

                $(obj).data("rot", $(obj).data("rot") * 0.85)

                if ($(obj).attr('class').includes("result") && crown) {
                    $("#crown").css("transform", `rotate(${$(obj).data("rot")}deg)`)
                } 

            }

        })


    }, 20);

})