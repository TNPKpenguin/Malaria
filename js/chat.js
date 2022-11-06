// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "สบายดีไหมคะ มีอาการยังไงบ้างคะ"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();
    console.log(userText)

    if (userText == "") {
        userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => { 
        getHardResponse(userText);
       // console.log(userText+"3")
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}
////////////////////////////////////////////////////////////////////////////////
function heartButton() {
    //buttonSendText("Heart clicked!")
    run();
    const statusElement = document.querySelector('.status')
    if(!isPausing){
      statusElement.innerHTML = "พูดเลย...";
      //console.log(isPausing);
      recognition.start();
      isPausing = true;
      console.log("if");
    }
    else{
      statusElement.innerHTML = "กดเพื่อพูด";
      //console.log(isPausing);
      recognition.stop();
      isPausing = false;
      console.log("else");
    }
    //buttonSendText("Heart clicked!")
}
function onResult(event){
    const textElement = document.querySelector('.text')
    const { transcript } = event.results[0][0];
    textElement.innerHTML += transcript+" ";
    buttonSendText(transcript)
  }

  function onEnd(){
    const statusElement = document.querySelector('.status')
    if(isPausing){
      statusElement.innerHTML = "พูดเลย...";
      console.log("onEnd");
      recognition.start();
    }
  }
function run(){
    recognition.lang = 'th-TH';
    recognition.addEventListener('result', onResult);
    recognition.addEventListener('end', onEnd);
    buttonElement.addEventListener('click', onClick)
  }
///////////////////////////////////////////////////////////////////////////
// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});