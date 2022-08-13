const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

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

const mojinames =
    "Surprised;Blush;Confused;Crying;Dissapoint;Flush;Happy;Laugh;Putoff;Puzzled;Sad;Screaming;Sleep;Sweating;Suspicious;Sweatsmile;Think;Troll;Flipped;Wink;Star;Imp;Wiki;Coin;Love;Mind Blown;Yes;No;Sweat Think;Relief;Nope;Concerned;Skull;Shocked;Cool;Lelcube";
let mojicount = mojinames.split(";").length + 1

function update() {

    let currSel = $('#emo1').find(":selected").val();
    $(".emote1").attr("src", `assets/fusions/${currSel}_0.png`);

    currSel = $('#emo2').find(":selected").val();
    $(".emote2").attr("src", `assets/fusions/${currSel}_0.png`);

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

}

function flip() {
    let cache = $('#emo1').find(":selected").val();
    $('#emo1').val($('#emo2').find(":selected").val()).change()
    $('#emo2').val(cache).change()

    update()
}

function random() {
    $('#emo1').val(Math.floor(Math.random() * (mojicount - 1)) + 1)
    $('#emo2').val(Math.floor(Math.random() * (mojicount - 1)) + 1)

    update($('#emo1').val())
    update($('#emo2').val())
}

function revealSave() {
    $('.save').slideDown("slow")
}


$(document).ready(function () {

    $("#credit").text(`${(mojicount - 1) ** 2} emojis fusioned manually by @MrXCube`)

    let names = mojinames.split(";")
    for (var i = 1; i < mojicount; i++) {

        let names = mojinames.split(";")

        $('#emo1').append($('<option>', {
            value: i,
            text: names[i - 1]
        }));

        $('#emo2').append($('<option>', {
            value: i,
            text: names[i - 1]
        }));

    }

    $('#emo1').change(function () { update() })

    $('#emo2').change(function () { update() })


    $(".emote1").attr("src", `assets/fusions/1_0.png`);
    $(".emote2").attr("src", `assets/fusions/1_0.png`);
    update();

})

$(window).on('load', function () {

    let resultRot = 0
    let inv = false
    let saveReveal = 0.0
    let reveal = false

    console.log(resultRot)


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

            }

        })


    }, 20);

})