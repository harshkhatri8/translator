import { useState } from "react";
import "./style.css";
import axios from "axios";
import languageList from "./language.json";

function Translate() {
  const [inputFormat, setInputFormat] = useState("en");
  const [outputFormat, setOutputFormat] = useState("hi");
  const [translatedText, setTranslatedText] = useState("Translation");
  const [inputText, setInputText] = useState("");
  
  const handleReverseLanguage = () => {
    const value = inputFormat;
    setInputFormat(outputFormat);
    setOutputFormat(value);
    setInputText("");
    setTranslatedText("Translation");
  };
  console.log({inputFormat})
  console.log({outputFormat})

  const handleTranslate = async () => {
    if (!inputText || !inputFormat || !outputFormat) return;
    document.querySelector(".fa.fa-spinner.fa-spin").style.display = "block";
    document.querySelector(".translate").style.display = "none";

    const encodedParams = new URLSearchParams();
    encodedParams.set("q", inputText);
    encodedParams.set("target", outputFormat);
    encodedParams.set("source", inputFormat);

    const options = {
      method: "POST",
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "1c52cf6312msh7e1d5ab1d1906ebp1aab38jsn792e3a89f476",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };  

    try {
      const response = await axios.request(options);
      const translation =response.data.data.translations[0].translatedText;
      setTranslatedText(translation)
      console.log(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="translate-area">
          <textarea
            className="from-text"
            value={inputText}
            placeholder="Enter Text"
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          <textarea value={translatedText} readOnly className="to-text" placeholder="Translation">
            {translatedText}
          </textarea>
        </div>

        <ul className="controls">
         
          <select
            className="select-btn"
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
          >
            {Object.keys(languageList).map((key, index) => {
              const language = languageList[key];
              return (
                <option key={index} value={key}>
                  {language.name}
                </option>
              );
            })}
          </select>
          <li className="exchange">
            <button
              className="exchange-btn"
              onClick={handleReverseLanguage}
              focusable="false"
            >
              <svg
                className="arrow"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z" />
              </svg>
            </button>
          </li>

          <select
            className="select-btn"
            value={outputFormat}
            onChange={(e) => {
              setOutputFormat(e.target.value);
              setTranslatedText("Translation");
            }}
          >
            {Object.keys(languageList).map((key, index) => {
              const language = languageList[key];
              return (
                <option key={index + 118} value={key}>
                  {language.name}
                </option>
              );
            })}
          </select>

         
        </ul>

        <div className="row3">
          <button className="btn" onClick={handleTranslate}>
            <i className="fa fa-spinner fa-spin"></i>
            <span className="translate">Translate</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Translate;
