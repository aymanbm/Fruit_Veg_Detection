import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './FruitDetectionWebcam.css';
import myImage from "./assets/camera-video.png";

export default function FruitDetectionWebcam() {
  const webcamRef = useRef(null);
  const streamRef = useRef(null);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [predictions, setPredictions] = useState([]);
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

  // Speak helper
  const speak = text => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.speak(u);
  };

  // 1. Warm-up stream on mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        streamRef.current = stream;
      })
      .catch(err => {
        console.error("Warm-up getUserMedia failed:", err);
        setError("Camera access was denied.");
      });
  }, []);

  // Low-resolution constraints to speed up
  const lowResConstraints = {
    width: { ideal: 320 },
    height: { ideal: 240 },
    frameRate: { ideal: 15, max: 15 }
  };

  // Capture+predict loop
  const captureAndPredict = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const base64 = imageSrc.split(',')[1];
    try {
      const res = await fetch('http://localhost:5000/predict-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
      });
      const { predictions: preds } = await res.json();

      const results = preds[0]
        .map((p, i) => ({ label: classLabels[i], confidence: p }))
        .sort((a, b) => b.confidence - a.confidence);

      setPredictions(results.slice(0, 3));

      // Optional speech
      const top = results[0];
      const now = Date.now();
      if (top.confidence > 0.7 && now - lastSpeechRef.current > 5000) {
        const [fruit, quality] = top.label.split('__');
        speak(`You are holding a ${quality.toLowerCase()} ${fruit.toLowerCase()}`);
        lastSpeechRef.current = now;
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError('Prediction failed: ' + err.message);
    }
  };

  // Prediction loop effect
  useEffect(() => {
    let rafId;
    if (isStarted) {
      const loop = async () => {
        await captureAndPredict();
        rafId = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => rafId && cancelAnimationFrame(rafId);
  }, [isStarted]);

  // Stop tracks when stopping
  useEffect(() => {
    if (!isStarted && streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
  }, [isStarted]);

  const handleStart = () => {
    setError(null);
    setHasLoaded(false);
    setPredictions([]);
    setIsStarted(true);
  };
  const handleStop = () => {
    setIsStarted(false);
    setPredictions([]);
  };

  return (
    <div className="fruit">
      <div className="fruit-block">
        {error && <p className="error">{error}</p>}

        <div style={{ position: 'relative', width: 440, height: 330, marginBottom : "1rem" }}>
          {!hasLoaded && isStarted && <div className="spinner">Loading…</div>}

          {isStarted && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={lowResConstraints}
              onUserMedia={() => setHasLoaded(true)}
              onUserMediaError={err => {
                console.error("Webcam init failed:", err);
                setError("Failed to access camera: " + err.message);
                handleStop();
              }}
              style={{
                visibility: hasLoaded ? 'visible' : 'hidden',
                width: '100%',
                height: '100%'
              }}
            />
          )}
        </div>

        <div className="controls">
          <button onClick={handleStart} disabled={isStarted} className="live">
            <img src={myImage} className="h-8" alt="Camera Icon" />
            Start the WebCam
          </button>
          <button onClick={handleStop} disabled={!isStarted}>
            Stop the WebCam
          </button>
        </div>
      </div>

      {/* Only show UL if camera is running and we have preds */}
      {isStarted && predictions.length > 0 && (
        <ul className="predictions">
          {predictions.map((p, i) => {
            const [fruit, quality] = p.label.split('__');
            
            return <li key={i}>
              <p>{quality.toLowerCase()} {fruit.toLowerCase()}: {(p.confidence * 100).toFixed(1)}%</p>
            </li>
          })}
        </ul>
      )}
    </div>
  );
}
