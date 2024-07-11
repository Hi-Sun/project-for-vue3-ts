<template>
  <div class="game">
    <canvas ref="canvasRef" id="breakout-canvas" width="500" height="500"></canvas>
    <div class="btn-box">
      <el-button color="#529b2e" :disabled="['processing', 'pausing'].includes(status)" :icon="Sunrise"
        @click="handleStartGame">{{ status === 'end' ? 'Restart' : 'Start' }} game</el-button>
      <el-button color="#c45656" :disabled="['default', 'end'].includes(status)" :icon="MostlyCloudy"
        @click="handlePauseOrContinueGame">{{ status === 'pausing' ? 'continue' : 'Pause' }} game</el-button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, toValue } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Sunrise,
  MostlyCloudy,
} from '@element-plus/icons-vue'
const paddleHeight = 10
const paddleWidth = 75
const BallRadius = 10

const canvasRef = ref<HTMLCanvasElement>()
const intervalRef = ref<Number>()
const status = ref<'default' | 'processing' | 'pausing' | 'end'>('default')

// 球的坐标
const ballPosition = reactive<{ x: number; y: number }>({ x: 0, y: 0 })
// 球每次移动的距离
const step = reactive<{ dx: number; dy: number }>({ dx: 2, dy: -2 })

// 手柄的坐标 x 
const paddleX = ref<number>(0)
const rightPress = ref<boolean>(false)
const leftPress = ref<boolean>(false)

const init = () => {
  const { width, height } = toValue(canvasRef)
  paddleX.value = (width - paddleWidth) / 2
  ballPosition.x = width / 2
  ballPosition.y = height - 30
  draw()
}

// 绘制球
const drawBall = () => {
  const { x, y } = toValue(ballPosition)
  const { width, height } = toValue(canvasRef)
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  // 清除上一个阶段的球，clearRect：指定矩形区域，让清除部分完全透明
  ctx.clearRect(0, 0, width, height)
  ctx.beginPath()
  ctx.arc(x, y, BallRadius, 0, Math.PI * 2, true)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

// 绘制手柄
const drawPaddle = () => {
  const { width, height } = toValue(canvasRef)
  if (toValue(rightPress)) {
    paddleX.value = Math.min(toValue(paddleX) + 7, width - paddleWidth)
  } else if (toValue(leftPress)) {
    paddleX.value = Math.max(toValue(paddleX) - 7, 0)
  }
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  ctx.rect(paddleX.value, height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

const draw = () => {
  drawBall()
  drawPaddle()

  const { width, height } = toValue(canvasRef)
  const { x, y } = toValue(ballPosition)
  const { dx, dy } = toValue(step)
  // 判断球的 x 坐标 位置是否到达画布边缘，如果是，则调整step
  if (x + dx > width - BallRadius || x + dx < BallRadius) {
    step.dx = -step.dx
  }
  // 判断球的 y 坐标 位置是否到达画布边缘，如果是，则调整step
  if (y + dy < BallRadius) {
    step.dy = -step.dy
  } else if (y + dy > height - BallRadius) {
    // 球在手柄上，则也继续游戏
    if(x > toValue(paddleX) && x < toValue(paddleX) + paddleWidth){
      step.dy = -step.dy
    } else {
      // 球在手柄外面，游戏结束
      handleGameOver()
      return
    }
  }
  ballPosition.x += step.dx
  ballPosition.y += step.dy
}

const handleStartGame = () => {
  if (toValue(status) === 'end') {
    init()
    step.dx = 2
    step.dy = -2
    status.value = 'default'
    return
  }
  ElMessage.success('游戏开始！')
  status.value = 'processing'
  intervalRef.value = setInterval(() => draw(), 10)
}

const handlePauseOrContinueGame = () => {
  const msg = status.value === 'pausing' ? '继续' : '暂停'
  ElMessage.info(`游戏${msg}！`)
  if (status.value === 'pausing') {
    status.value = 'processing'
    intervalRef.value = setInterval(() => draw(), 10)
  } else {
    status.value = 'pausing'
    clearInterval(Number(intervalRef.value))
  }
}

const handleGameOver = () => {
  ElMessage.error('游戏结束！')
  status.value = 'end'
  clearInterval(Number(intervalRef.value))
}

const keyDownHandler = (e: KeyboardEvent) => {
  if (['Right', 'ArrowRight'].includes(e.key)) {
    rightPress.value = true
  } else if (['Left', 'ArrowLeft'].includes(e.key)) {
    leftPress.value = true
  }
}

const keyUpHandler = (e: KeyboardEvent) => {
  if (['Right', 'ArrowRight'].includes(e.key)) {
    rightPress.value = false
  } else if (['Left', 'ArrowLeft'].includes(e.key)) {
    leftPress.value = false
  }
}

onMounted(() => {
  init()
  window.addEventListener('keydown', keyDownHandler, false)
  window.addEventListener('keyup', keyUpHandler, false)
})

onUnmounted(() => {
  clearInterval(Number(intervalRef.value))
  window.removeEventListener('keydown', keyDownHandler, false)
  window.removeEventListener('keyup', keyUpHandler, false)
})
</script>

<style lang="scss" scoped>
.game {
  min-height: 675px;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url(@/assets/ground.png);
  @extend %bg;
}

canvas {
  box-shadow: -15px 15px 15px rgba(236, 245, 255, 1);
  background: linear-gradient(230deg,
      #337ecc 0%,
      #d9ecff 100%);
  display: block;
  border-radius: 10px;
}

.btn-box {
  width: 300px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
}
</style>