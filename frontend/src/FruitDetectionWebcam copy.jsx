import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import './FruitDetectionWebcam.css';
import myImage from "./assets/camera-video.png"; 

function FruitDetectionWebcam() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [isWebcamRunning, setIsWebcamRunning] = useState(false);
  const [error, setError] = useState(null);
  const lastSpeechRef = useRef(0);
  const classLabels = [
    'Apple__Healthy','Apple__Rotten','Banana__Healthy','Banana__Rotten',
    'Bellpepper__Healthy','Bellpepper__Rotten','Carrot__Healthy','Carrot__Rotten',
    'Cucumber__Healthy','Cucumber__Rotten','Grape__Healthy','Grape__Rotten',
    'Guava__Healthy','Guava__Rotten','Jujube__Healthy','Jujube__Rotten',
    'Mango__Healthy','Mango__Rotten','Orange__Healthy','Orange__Rotten',
    'Pomegranate__Healthy','Pomegranate__Rotten','Potato__Healthy','Potato__Rotten',
    'Strawberry__Healthy','Strawberry__Rotten','Tomato__Healthy','Tomato__Rotten'
  ];

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    window.speechSynthesis.speak(utter);
  };

  const captureAndPredict = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot({ width: 224, height: 224, format: 'jpeg' });
    if (!imageSrc) return;
    const base64Data = imageSrc.split(',')[1];

    try {
      const res = await fetch('http://localhost:5000/predict-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data })
      });
      const { predictions: preds } = await res.json();

      const results = preds[0]
        .map((p, i) => ({ label: classLabels[i], confidence: p }))
        .sort((a, b) => b.confidence - a.confidence);
      setPredictions(results.slice(0, 3));

      const top = results[0];
      const now = Date.now();
      if (top.confidence > 0.7 && now - lastSpeechRef.current > 5000) {
        const [fruit, quality] = top.label.split('__');
        speak(`You are holding a ${quality.toLowerCase()} ${fruit.toLowerCase()}`);
        lastSpeechRef.current = now;
      }
    } catch (err) {
      console.error(err);
      setError('Prediction failed: ' + err.message);
    }
  }, []);

  // Start / Stop capture loop
  useEffect(() => {
    let rafId;
    if (isWebcamRunning) {
      const tick = async () => {
        await captureAndPredict();
        rafId = requestAnimationFrame(tick);
      };
      tick();
    }
    return () => cancelAnimationFrame(rafId);
  }, [isWebcamRunning, captureAndPredict]);


  return (
    <div className="fruit">
      <div className="fruit-block">
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 840, height: 440, facingMode: 'environment' }}
          style={{ display: isWebcamRunning ? 'block' : 'none' }}
        />

        <canvas
          ref={canvasRef}
          width={224}
          height={100}
          style={{ display: isWebcamRunning ? 'block' : 'none' }}
        />

        <div>
          <button
            className="live"
            onClick={() => setIsWebcamRunning(true)}
            disabled={isWebcamRunning}
          >
            <img src={myImage} className="h-8" alt="Camera Icon" />
            Démarrer la Caméra
          </button>

          <button
            onClick={() => setIsWebcamRunning(false)}
            disabled={!isWebcamRunning}
          >
            Arrêter la Caméra
          </button>
        </div>
      </div>

      {predictions.length > 0 && (
        <ul>
          {predictions.map((p, i) => (
            <li key={i}>
              <p>{p.label}: {(p.confidence * 100).toFixed(1)}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FruitDetectionWebcam;