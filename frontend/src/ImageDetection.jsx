import { useState } from 'react';
import { Helmet } from 'react-helmet';

const classLabels = [
  'Apple__Healthy','Apple__Rotten','Banana__Healthy','Banana__Rotten',
  'Bellpepper__Healthy','Bellpepper__Rotten','Carrot__Healthy','Carrot__Rotten',
  'Cucumber__Healthy','Cucumber__Rotten','Grape__Healthy','Grape__Rotten',
  'Guava__Healthy','Guava__Rotten','Jujube__Healthy','Jujube__Rotten',
  'Mango__Healthy','Mango__Rotten','Orange__Healthy','Orange__Rotten',
  'Pomegranate__Healthy','Pomegranate__Rotten','Potato__Healthy','Potato__Rotten',
  'Strawberry__Healthy','Strawberry__Rotten','Tomato__Healthy','Tomato__Rotten'
];

function ImageDetection() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Data = reader.result.split(',')[1];
            setSelectedImage(URL.createObjectURL(file));
            analyzeImage(base64Data);
        };
        reader.readAsDataURL(file);
    };

    const analyzeImage = async (base64Data) => {
        setLoading(true);
        setError(null);
        setPrediction(null);
        
        try {
            const res = await fetch('http://localhost:5000/predict-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Data })
            });
            
            const { predictions: apiPredictions } = await res.json();
            const results = apiPredictions[0]
                .map((p, i) => ({ label: classLabels[i], confidence: p }))
                .sort((a, b) => b.confidence - a.confidence);

            if(results[0].confidence > 0.1) { // Seuil minimal de confiance
                setPrediction(results[0]);
            }

        } catch (err) {
            console.error(err);
            setError('Prediction failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const getQualityStatus = (label) => {
        const [, status] = label.split('__');
        return {
            text: status,
            color: status === 'Healthy' ? 'text-emerald-400' : 'text-red-400'
        };
    };
    
    return (
        <div className=" flex flex-col items-center">
            <Helmet>
                <title>Image Detection</title>
                <meta name="description" content="This is my cool page description." />
                <link rel="stylesheet" href="/ImageDetection.css"/>
            </Helmet>
            <div className="w-full flex gap-8">
                {/* Upload Section - Left Side */}
                <div className="flex-1 bg-white/5 rounded-xl p-6 backdrop-blur-sm border-2 border-emerald-600">
                    <label className="flex flex-col items-center justify-center h-64 cursor-pointer border-2 border-dashed border-emerald-400 rounded-lg hover:bg-white/5 transition-colors">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="text-center space-y-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-lg text-emerald-400 font-semibold">
                                {selectedImage ? 'Image Selected' : 'Click to Upload'}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Supported formats: JPEG, PNG, WEBP
                            </p>
                        </div>
                    </label>

                    {/* Preview */}
                    {selectedImage && (
                        <div className="mt-6 flex justify-center">
                            <img 
                                src={selectedImage} 
                                alt="Upload preview" 
                                className="max-h-64 w-auto rounded-lg border-2 border-emerald-600"
                            />
                        </div>
                    )}
                </div>

                {/* Results Section - Right Side */}
                <div className="flex-1" style={prediction && {display: "block"}||{display: "none"}} >
                    {loading && (
                        <div className="h-full flex items-center justify-center text-emerald-400 text-xl">
                            Analyzing Image...
                        </div>
                    )}

                    {prediction && !loading && (
                        <div className="h-full bg-white/5 rounded-xl p-6 backdrop-blur-sm border-2 border-emerald-600">
                            <h2 className="text-2xl font-bold text-emerald-500 mb-4">Analysis Result</h2>
                            
                            <div className="space-y-6 text-gray-300">
                                <div className="p-4 border border-emerald-600 rounded-lg">
                                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Item</h3>
                                    <p className="text-xl">{prediction.label.split('__')[0]}</p>
                                </div>

                                <div className="p-4 border border-emerald-600 rounded-lg">
                                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Status</h3>
                                    <p className={`text-xl ${getQualityStatus(prediction.label).color}`}>
                                        {getQualityStatus(prediction.label).text}
                                    </p>
                                </div>

                                <div className="p-4 border border-emerald-600 rounded-lg">
                                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Confidence</h3>
                                    <div className="w-full bg-gray-700 rounded-full h-4">
                                        <div 
                                            className="bg-emerald-500 h-4 rounded-full" 
                                            style={{ width: `${(prediction.confidence * 100).toFixed(1)}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-right mt-2">
                                        {(prediction.confidence * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-400 text-xl mt-4">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageDetection;