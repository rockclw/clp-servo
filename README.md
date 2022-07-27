An microbit extension for CLP Steam Project.

Based on pxt-robotbit.

Will also import bitPlayer.

Visit its github project: https://github.com/KittenBot/pxt-robotbit

## Blocks 方塊 ##

### turn 轉動 ###

#### Format: Servo [Servo] turn [direction] by [degree] ####
#### 格式: 陀機 [陀機] 往 [方向] 轉動 [角度] 度 #### 

Turning the selected servo to turn to certain direction by certain degree.
控制所選擇的陀機往特定方向轉動。

Servos can only be turned by a certain range.
陀機有著可以被轉動的上限和下限。

### showAngle 展示角度 ###

#### Format: Servo [Servo] show angle ####
#### 格式： 陀機 [陀機] 展示角度 ####

Show the current angle of selected servo to its lowest position on the LED.
在LED版上顯示所選擇的托機與其最低可轉動的位置之間的角度。

The display will end in 3 seconds. There will be delay when displaying.
該顯示會在三秒後結束。在顯示期間，機器人會有一定延遲。

### getAngle 提取角度 ###

#### Format: angle of Servo [Servo] ####
#### 格式：陀機 [陀機] 的角度 ####

Get the current angle of selected servo to its lowest position.
獲得所選擇的托機與其最低可轉動的位置之間的角度。

Return should be a positve integer.
所獲得的數據應爲一個正整數。

## Datas 數據 ##
### Name of servo 陀機名稱 ###

There are in total three servo.
總共有三個陀機。

1. baseServo: Servo at the bottom. Controlling the up and down of the entire robot arm. 最底下的陀機。它控制著整個機械臂的上下。
2. clawTurnServo: Servo at the middle. Controlling the spinning of claw. 中間的陀機。它控制著整個機械爪的轉動。
3. clawServo: Servo at the top. Controlling the open and close of claw. 最高的陀機。它控制著機械爪的開合。

### Range of different servo 陀機可轉動的範圍 ###

The unit are degree. 0 specify the lowest position of the servo.
所用的單位是角度。 0度為該陀機最低可到達的位置。

baseServo : 0 - 145 \
clawTurnServo : 0 - 180 \
clawServo : 0 - 80 


