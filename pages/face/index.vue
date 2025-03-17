<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as faceapi from 'face-api.js'

const video = ref(null)
const canvas = ref(null)
const capturedCanvas = ref(null)
const isLive = ref(false)
let intervalId = null
let lastBlinkRatio = null
let lastFacePosition = null
let stableCount = 0

onMounted(async () => {
  await loadModels()
  startVideo()
  intervalId = setInterval(detectFace, 100); // Reduce the interval to 100ms
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
}

function startVideo() {
  navigator.mediaDevices.getUserMedia({
    video: { width: { exact: 1280 }, height: { exact: 720 } }
  }).then((stream) => {
    video.value.srcObject = stream
  });
}

async function detectFace() {
  if (!video.value) return

  const detection = await faceapi.detectSingleFace(video.value, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks();

  if (detection) {
    const blinkRatio = calculateBlinkRatio(detection.landmarks)
    const headMovement = detectHeadMovement(detection.detection.box)

    const isReal = (blinkRatio < 0.20 && lastBlinkRatio !== null && Math.abs(blinkRatio - lastBlinkRatio) > 0.05) || headMovement;

    // Use an additional check for micro-expressions or subtle movements (e.g., mouth)
    const isMouthMovement = detectMouthMovement(detection.landmarks)
    const isLiveDetection = isReal && isMouthMovement;

    if (isLiveDetection) {
      stableCount++
      if (stableCount >= 5) {
        isLive.value = true
        capturePhoto()
        stableCount = 0 // Reset count after capturing
      }
    } else {
      isLive.value = false
      stableCount = 0
    }

    lastBlinkRatio = blinkRatio
    drawBoundingBox(detection)
  } else {
    isLive.value = false
    stableCount = 0
    clearCanvas()
  }
}

function calculateBlinkRatio(landmarks) {
  const leftEye = landmarks.getLeftEye()
  const rightEye = landmarks.getRightEye()

  const leftRatio = (distance(leftEye[1], leftEye[5]) + distance(leftEye[2], leftEye[4])) / (2 * distance(leftEye[0], leftEye[3]))
  const rightRatio = (distance(rightEye[1], rightEye[5]) + distance(rightEye[2], rightEye[4])) / (2 * distance(rightEye[0], rightEye[3]))

  return (leftRatio + rightRatio) / 2
}

function detectHeadMovement(currentBox) {
  if (lastFacePosition) {
    const movement = Math.abs(currentBox.x - lastFacePosition.x) + Math.abs(currentBox.y - lastFacePosition.y)
    lastFacePosition = currentBox
    return movement > 3 // More sensitive to head movement
  }
  lastFacePosition = currentBox
  return false
}

function detectMouthMovement(landmarks) {
  const mouth = landmarks.getMouth()

  // Check for small mouth movement (e.g., opening or closing) which is indicative of a live person
  const mouthMovement = distance(mouth[0], mouth[6]) // Measure distance between key mouth points
  return mouthMovement > 10 // Adjust this threshold based on observation
}

function distance(point1, point2) {
  return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
}

function drawBoundingBox(detection) {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight

  ctx.strokeStyle = isLive.value ? 'green' : 'red'
  ctx.lineWidth = 3

  const { x, y, width, height } = detection.detection.box
  ctx.strokeRect(x, y, width, height)
}

function clearCanvas() {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d')
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

function capturePhoto() {
  if (!video.value || !capturedCanvas.value) return

  const ctx = capturedCanvas.value.getContext('2d')
  capturedCanvas.value.width = video.value.videoWidth
  capturedCanvas.value.height = video.value.videoHeight
  ctx.drawImage(video.value, 0, 0, capturedCanvas.value.width, capturedCanvas.value.height)

  // Convert canvas to base64
  const imageData = capturedCanvas.value.toDataURL('image/png')

  // Send image to Laravel backend
  uploadImage(imageData)
}

async function uploadImage(base64Data) {
  try {
    console.log('Image saved')
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}

</script>

<template>
  <div style="position: relative; display: inline-block;">
    <video ref="video" autoplay playsinline></video>
    <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
    <canvas ref="capturedCanvas" style="display: none;"></canvas>
    <p v-if="isLive" style="color: green;">Real Human Detected ✅ (Photo Taken)</p>
    <p v-else style="color: red;">Possible Spoof (Photo) ❌</p>
  </div>
</template>

<style>
video {
  width: 300px;
  height: auto;
}
canvas {
  width: 300px;
  height: auto;
}
</style>
