const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(words) {
    words = words.replace(" ","").toLowerCase();
    return words.match(syllableRegex);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const mojinames =
    "Surprised;Blush;Confused;Crying;Dissapoint;Flush;Happy;Laugh;Putoff;Puzzled;Sad;Shocked;Sleep;Sweating;Sweat Sideye;Sweatsmile;Think;Troll;Upside Down;Wink;Star;Imp;Wiki;Coin;Love;Mind Blown;Yes;No;Sweat Think;Relief;Nope;Scarred";
let mojicount = mojinames.split(";").length+1

    function update() {

        let currSel = $('#emo1').find(":selected").val();
        $(".emote1").attr("src", `assets/fusions/${currSel}_0.png`);

        currSel = $('#emo2').find(":selected").val();
        $(".emote2").attr("src", `assets/fusions/${currSel}_0.png`);

        let one = $('#emo1').find(":selected");
        let two = $('#emo2').find(":selected");

        $(".result").attr("src", `assets/fusions/${one.val()}_${two.val()}.png`);

        let firstSec = syllabify(one.text()) 
        firstSec.length = Math.max(Math.floor(firstSec.length/2), 1)
        firstSec = firstSec.join("") 

        console.log(two.text())
        let ndSec = syllabify(two.text())
        console.log(ndSec)
        ndSec.splice(0, Math.floor(ndSec.length/2))
        console.log(ndSec)
        ndSec = ndSec.join("")
        console.log(ndSec) 

        let newtitle = capitalizeFirstLetter(firstSec + ndSec)


        $("#mixName").text(newtitle)

    }

    function flip() {
        let cache = $('#emo1').find(":selected").val();
        $('#emo1').val($('#emo2').find(":selected").val()).change()
        $('#emo2').val(cache).change()

        update()
    }

    function random() {
        $('#emo1').val(Math.floor(Math.random()*(mojicount-1))+1)
        $('#emo2').val(Math.floor(Math.random()*(mojicount-1))+1)

        console.log()

        update($('#emo1').val())
        update($('#emo2').val())
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

    $('#emo1').change(function() {update()})

    $('#emo2').change(function() {update()})


    $(".emote1").attr("src", `assets/fusions/1_0.png`);
    $(".emote2").attr("src", `assets/fusions/1_0.png`);
    update();

}) 

$(window).on('load', function(){

    let resultRot = 0
    let inv = false

    console.log(resultRot)


    $(".tappy").click(function() {

        let newrot = 2

        if ($(this).data("rot")) {
            newrot = Math.abs($(this).data("rot"))+2
        }

        if ($(this).data("inv")) {
            newrot = -newrot
        }
        $(this).data("rot", newrot)


        $(this).data("inv", !$(this).data("inv"))
    })

    setInterval(function () {

        $(".tappy").each(function(i, obj) {

            if ($(obj).data("rot")) {

                $(obj).css("transform", `rotate(${$(obj).data("rot")}deg)`)
    
                $(obj).data("rot", $(obj).data("rot")*0.85)
    
            }

        } )


    }, 20);

})