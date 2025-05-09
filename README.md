# Fruit & Vegetable Health Detection (Healthy vs. Rotten)  
**Detect freshness of fruits/vegetables using ResNet50V2**  

---

## 📌 Project Overview 

This project uses **ResNet50V2** to classify fruits and vegetables as healthy or rotten, now wrapped in a full-stack **React** + **Flask** web application. Designed for automated quality control in agriculture and retail, it offers both batch import predictions and real-time webcam detection—with visual feedback, confidence percentages, and voice alerts when confidence exceeds 70%.
Using : [Kaggle Fruit and Vegetable Diseases Dataset](https://www.kaggle.com/datasets/muhammad0subhan/fruit-and-vegetable-disease-healthy-vs-rotten). It achieves **~93% validation accuracy** after fine-tuning.

---
## 🧩 App Features

### 1. Import & Predict Upload
- **Import Images:** Users can upload one or multiple images (JPEG/PNG) via the React interface.  
- **Batch Prediction:** After selecting images, clicking **Predict** sends them to the Flask API, which returns class labels and confidence scores.  
- **Results Display:** Predictions are displayed alongside thumbnails with percentage scores.

### 2. Live Webcam Detection
- **Real-Time Feed:** Access your device camera directly in the React app.  
- **On-Side Prediction Panel:** Continuously shows the top prediction and confidence percentage next to the video stream.  
- **Audio Alert:** When any detection confidence exceeds **70%**, a voice notification activates and announces:
  ```js
  const utterance = new SpeechSynthesisUtterance(`You are holding a ${prediction}`);
  window.speechSynthesis.speak(utterance);
  
## 🗃️ Dataset  
- **Source**: [Kaggle Fruit and Vegetable Diseases Dataset](https://www.kaggle.com/datasets/muhammad0subhan/fruit-and-vegetable-disease-healthy-vs-rotten)  
- **Classes**: 28 classes (e.g., `Apple__Healthy`, `Jujube__Rotten`)  
- **Image Count**: ~8,500 high-resolution images  
- **Split**:  
  - Training: 75%  
  - Validation: 25%  

---

## 🛠️ Setup & Installation  
```bash
pip install tensorflow pandas numpy matplotlib 
```
# 🍎 Model Architecture

## Transfer Learning with ResNet50V2

**Base Model:** Pretrained on ImageNet (frozen initially)

**Custom Head:**
- Dropout (0.1)
- Dense Layer (128 units, ReLU + L2 Regularization)
- Batch Normalization
- Output Layer (28 units, Softmax)

**Model Architecture**
```bash
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┓
┃ Layer (type)                    ┃ Output Shape           ┃       Param # ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━┩
│ input_layer_1 (InputLayer)      │ (None, 224, 224, 3)    │             0 │
├─────────────────────────────────┼────────────────────────┼───────────────┤
│ resnet50v2 (Functional)         │ (None, 2048)           │    23,564,800 │
├─────────────────────────────────┼────────────────────────┼───────────────┤
│ dropout (Dropout)               │ (None, 2048)           │             0 │
├─────────────────────────────────┼────────────────────────┼───────────────┤
│ dense (Dense)                   │ (None, 128)            │       262,272 │
├─────────────────────────────────┼────────────────────────┼───────────────┤
│ batch_normalization             │ (None, 128)            │           512 │
│ (BatchNormalization)            │                        │               │
├─────────────────────────────────┼────────────────────────┼───────────────┤
│ dropout_1 (Dropout)             │ (None, 128)            │             0 │
├─────────────────────────────────┼────────────────────────┼───────────────┤
│ dense_1 (Dense)                 │ (None, 28)             │         3,612 │
└─────────────────────────────────┴────────────────────────┴───────────────┘
 Total params: 23,831,196 (90.91 MB)
 Trainable params: 266,140 (1.02 MB)
 Non-trainable params: 23,565,056 (89.89 MB)
```
---

# ⚙️ Training Strategy

## Phase 1: Feature Extraction (Frozen ResNet)
```python
optimizer = AdamW(learning_rate=1e-3)
resnet_model.compile(loss='categorical_crossentropy', optimizer=optimizer, metrics=['accuracy'])
history = resnet_model.fit(train_data, validation_data=valid_data, epochs=6)
```

## Phase 2: Fine-Tuning (Unfrozen ResNet)
```python
base_model.trainable = True
optimizer = AdamW(learning_rate=1e-4)  # Lower LR for fine-tuning
resnet_model.compile(loss='categorical_crossentropy', optimizer=optimizer, metrics=['accuracy'])
history = resnet_model.fit(train_data, validation_data=valid_data, epochs=8)
```

# 📊 Results

## Confusion Matrix
![image](https://github.com/user-attachments/assets/c827e931-ea65-4e85-8e17-051837181417)


## Top Error Rates
| Class                | Error Rate | Common Misclassifications |
|----------------------|------------|---------------------------|
| Jujube__Rotten       | 33.33%     | Jujube__Healthy           |
| Apple__Healthy       | 27.91%     | Apple__Rotten             |
| Bellpepper__Rotten   | 25.00%     | Bellpepper__Healthy       |


# 🖼️ Sample Predictions

![image](https://github.com/user-attachments/assets/c1b2a7b4-8e5f-448b-9a05-fcf255e0aaec)



