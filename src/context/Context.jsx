import { createContext, useEffect, useRef, useState } from "react";
import run from "../config/gemini";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [seen, setseen] = useState(true);
  const [voice, setvoice] = useState(false);
  const [data, setdata] = useState("")
  const [speaking, setspeaking] = useState(false);


  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [listening, setlistening] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const listen = () => {
    resetTranscript() 
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setInput(transcript);
    setlistening(true);
    if (listening) {
      SpeechRecognition.stopListening();
      setlistening(false);
      SpeechRecognition.abortListening();
      console.log(transcript);
    }
    
  };
  const speech = () => {
    setspeaking(true);
    const synth = window.speechSynthesis;
    const newdata = stripHTMLTags(data);
    if (speaking) {
      setspeaking(false);
      synth.cancel();
      return; // Exit function to stop speech
    }

    const utterance = new SpeechSynthesisUtterance(newdata);

    // Function to set the voice correctly
    const setVoice = () => {
      let voices = synth.getVoices();
      console.log(voices); // Check available voices in console

      if (voices.length > 0) {
        utterance.voice = voices.find(voice => voice.lang === "en-IN") || voices[19]; // Pick Indian English or fallback
        synth.speak(utterance);
      } else {
        console.warn("No voices available yet, retrying...");
        setTimeout(setVoice, 100); // Retry after a short delay
      }
    };

    // Ensure voices are loaded before setting
    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = setVoice;
    } else {
      setVoice();
    }
    console.log(newdata);

    window.addEventListener("beforeunload", () => synth.cancel());
    return () => {
      synth.cancel();


    };
  };


  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index)
  };

  function stripHTMLTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }


  const Para = (index, nextWord) => {
    setTimeout(() => {
      setdata((prev) => prev + nextWord);
    },)
  };




  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setspeaking(false);
    resetTranscript();
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setlistening(false);
    setdata("")
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("<br />");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
      Para(i, nextWord + " ");

    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    seen,
    setseen,
    voice,
    setvoice,
    listening,
    listen,
    transcript,
    resetTranscript,
    data, setdata, speech,
    speaking
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
