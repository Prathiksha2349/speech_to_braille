if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  // Default language setting
  let defaultLang = 'en-US';

  // Check if select_dialect element exists
  let selectDialectElement = document.querySelector("#select_dialect");

  if (selectDialectElement) {
    speechRecognition.lang = selectDialectElement.value;
  } else {
    console.warn("#select_dialect element not found, using default language: " + defaultLang);
    speechRecognition.lang = defaultLang;
  }

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
    console.log("Speech recognition started");
  };

  speechRecognition.onerror = (event) => {
    document.querySelector("#status").style.display = "none";
    console.error("Speech Recognition Error: ", event.error);
  };

  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech recognition ended");
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
    document.querySelector("#braille").innerHTML = convertToBraille(final_transcript);
  };

  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
    console.log("Speech recognition started by user");
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
    console.log("Speech recognition stopped by user");
  };
} else {
  console.error("Speech Recognition Not Available");
}

function convertToBraille(text) {
  const brailleMap = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
    'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
    'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': ' ',
    // Add more mappings if needed
  };

  return text.split('').map(char => brailleMap[char.toLowerCase()] || char).join('');
}




  function saveFeedback() {
    const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const message = document.getElementById('message').value;

  const feedback = {
    name,
    email,
    phoneNumber,
    message,
    submissionDate: new Date().toISOString()
    };

  let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
  feedbackList.push(feedback);
  localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

  alert('Feedback submitted successfully!');
  document.getElementById('feedbackForm').reset();
}
