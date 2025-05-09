from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)  


model = load_model('healthy_rotten_resnet_model.h5')

@app.route('/predict-image', methods=['POST'])
def predict_image():
    """
    Expects JSON: { "image": "<base64-jpeg-string>" }
    Returns JSON: { "predictions": [[...]] }
    """
    data = request.get_json(force=True)
    # Decode base64 to bytes
    img_bytes = base64.b64decode(data['image'])
    # Convert bytes to NumPy array
    nparr = np.frombuffer(img_bytes, np.uint8)
    # Decode image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # Preprocess: resize and normalize
    img = cv2.resize(img, (224, 224))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)  # Add batch dimension

    # Predict
    preds = model.predict(img).tolist()
    return jsonify({'predictions': preds})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
