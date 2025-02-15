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


  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [listening, setlistening] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const listen = () => {
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
  useEffect (() => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(data);
    var voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[10];
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 5;
    utterance.lang = "en - IN";
    synth.speak(utterance);      
    console.log(data);
    return () => {
      synth.cancel();
    };
  },[loading])
  

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index ) 
  };

  
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
    resetTranscript();
    setResultData("");
    setLoading(true);
    setShowResult(true);
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
    data, setdata
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
