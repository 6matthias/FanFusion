
    function update() {

        let one = $('#emo1').find(":selected").val();
        let two = $('#emo2').find(":selected").val();

        $(".result").attr("src", `assets/fusions/${one}_${two}.png`);

    }

    function flip() {
        let cache = $('#emo1').find(":selected").val();
        $('#emo1').find(":selected").val($('#emo2').find(":selected").val()).change()
        $('#emo2').find(":selected").val(cache).change()
    
        update()
    }


$(document).ready(function () {
    

    let mojicount = 32
    const mojinames =
        "Surprised;Blush;Confused;Crying;Dissapoint;Flush;Happy;Laugh;Putoff;Puzzled;Sad;Shocked;Sleep;Sweating;Sweat Sideye;Sweatsmile <3;Think;Troll;Upside Down;Wink;Star;Imp;Earth/Wiki;Coin;Heart/Love;Mind Blown;Yes;No;Sweat Think;Relief;Nope";

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

    $('#emo1').change(function () {

        let currSel = $('#emo1').find(":selected").val();
        $(".emote1").attr("src", `assets/fusions/${currSel}_0.png`);
        update()

    })

    $('#emo2').change(function () {

        let currSel = $('#emo2').find(":selected").val();
        $(".emote2").attr("src", `assets/fusions/${currSel}_0.png`);
        update()

    })

    $(".emote1").attr("src", `assets/fusions/1_0.png`);
    $(".emote2").attr("src", `assets/fusions/1_0.png`);
    update();

}) 