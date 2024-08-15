const chatbox = document.querySelector(".chatbox");
const chatform = document.querySelector(".chatform");
const messageContainer = document.querySelector(".message-container");
const inputCon = document.querySelector(".inputContainers");
const textInput = document.querySelector(".textInput");
const contain = document.querySelector(".container")
const AImessage = document.querySelector(".responseMessage")
const apiKey = "APIKEYHERE";
const url = "https://api.edenai.run/v2/text/generation";
inputPrompt = "";

inputCon.addEventListener("submit", async event => {
    event.preventDefault();
    inputPrompt = textInput.value;

    console.log(inputPrompt);

    if(inputPrompt){
        try{
            displayUserMessage(inputPrompt);
            const responses = getResponse(inputPrompt)
              .then(responses => {
                displayAIResponse(responses);
              })
              .catch(error => {
                console.error('Error:', error);
              });
        }
        catch(error){
            console.error(error);
        }

    }else{
    }
})

function displayUserMessage(inputMessage){
  const messageDisplay = document.createElement('div');
  messageDisplay.className = 'user-message';
  messageDisplay.textContent = inputMessage;

  messageContainer.appendChild(messageDisplay);

  messageContainer.scrollTop = chatbox.scrollHeight;
  textInput.value = '';
}

function displayAIResponse(outputMessage){
  const messageAI = document.createElement('div');
  messageAI.className = 'response-message';
  messageAI.textContent = outputMessage

  messageContainer.appendChild(messageAI);

  messageContainer.scrollTop = chatbox.scrollHeight;
}

async function getResponse(input){
  
  const optionsWithDynamicText = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer APIKEYHERE",
    },
    body: JSON.stringify({
      providers: "openai",
      text: JSON.stringify(input),
      temperature: 0.2,
      max_tokens: 250,
    }),
  };

  try{
    const response = await fetch(url, optionsWithDynamicText);
    if(!response.ok){
      throw new Error("Could not return response");
    }
    const data = await response.json();
    console.log(data.openai.generated_text);
    return data.openai.generated_text;
  }catch(error){
    console.error("Error fetching data:", error);
    throw error;
  }
}