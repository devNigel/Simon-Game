var click = 0;
var checkPassed = false;
var simon = {
    step: 0,
    color: [".red", ".green", ".blue", ".yellow"],
    pattern: [],
    playerInput: [],
    showPattern: function () {
        //alert("in show pattern");
        var i = 0;
        var pattern = setInterval(function () {
            lightColor(simon.pattern[i]);
            audio(i);
            i++;
            if (i >= simon.pattern.length) {
                clearInterval(pattern);
            }
        }, 600);
        return this;
    },
    audio: {
        red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    },
    enablePlayerInput: function () {
        $('.red').css("pointer-events", "auto");
        $('.red').css("cursor", "pointer");
        $('.red').addClass('red-hover');
        $('.green').css("pointer-events", "auto");
        $('.green').css("cursor", "pointer");
        $('.green').addClass('green-hover');
        $('.blue').css("pointer-events", "auto");
        $('.blue').css("cursor", "pointer");
        $('.blue').addClass('blue-hover');
        $('.yellow').css("pointer-events", "auto");
        $('.yellow').css("cursor", "pointer");
        $('.yellow').addClass('yellow-hover');

        return this;
    },

    isStrict: false
}

function disablePlayerInput() {
    $('.red').css("pointer-events", "none");
    $('.red').removeClass('red-hover');
    $('.green').css("pointer-events", "none");
    $('.green').removeClass('green-hover');
    $('.blue').css("pointer-events", "none");
    $('.blue').removeClass('blue-hover');
    $('.yellow').css("pointer-events", "none");
    $('.yellow').removeClass('yellow-hover');
}

function checkInputPattern(input, index) {

    console.log("in checkinputpattern");
    /* for(var i=0;i<simon.step;++i)
      {
        
     */
    if (input != simon.pattern[index]) {

        checkPassed = false;
    } else {

        checkPassed = true;

    }
    //}
    if (!checkPassed) {
        $('.game-control').effect("highlight", {
            color: 'red'
        }, 2000);
        if (!simon.isStrict) {
            playPattern();
            clearPlayerInput();
        } else {
            startGame();
        }
    } else if (click >= simon.step) {
        if (simon.step == 20) {
            $('.game-status').text("You Won!");

        } else {
            $('.game-control').effect("highlight", {
                color: 'green'
            }, 2000);
            playRound();
        }

    }

}

$('.sector').click(function () {

    simon.playerInput.push(this.id);

    audio(parseInt(this.id, 10));
    click++;
    checkInputPattern(this.id, click - 1);

});

function startGame() {
    $('.game-status').text("Simon Game")
    simon.step = 0;
    simon.pattern = [];
    // alert("ds");
    playRound();

}

function clearPlayerInput() {
    click = 0;
    simon.playerInput = [];
}

function playRound() {

    clearPlayerInput();
    disablePlayerInput();
    simon.pattern.push(Math.floor(Math.random() * 4));

    simon.step++;

    $('.step-count').html(simon.step);

    playPattern();
}

function playPattern() {
    simon.showPattern().enablePlayerInput();
}

function lightColor(j) {
    $(simon.color[j]).addClass('lighten');

    setTimeout(function () {
        $(simon.color[j]).removeClass('lighten');
    }, 400);
}

function mode() {
    if ($('#strict-mode').is(':checked'))
        simon.isStrict = true;
    else
        simon.isStrict = false;
}

function audio(id) {
    switch (true) {
        case id == 0:
            simon.audio.red.play();

            break;
        case id == 1:
            simon.audio.green.play();

            break;
        case id == 2:
            simon.audio.blue.play();

            break;
        case id == 3:
            simon.audio.yellow.play();

            break;
    };
}