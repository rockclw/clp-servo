
//% color="16058F" icon="\uf0ad"
namespace clpRobot{
    
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    
    export enum Servos{
        baseServo  = 0x01,
        clawTurnServo = 0x02,
        clawServo = 0x03
    }
     
    export enum direction{
        anticlockwise = 0,
        clockwise = 1
    }
    
    let ServoAngle:number[] = [0,0,0];
    let ServoMaxAngle:number[] = [145,180,80];
    let initialized = false
    
    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    
    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }
    
    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50);
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }
    
    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        //serial.writeValue("ch", channel)
        //serial.writeValue("on", on)
        //serial.writeValue("off", off)

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }
    
    function GetIndex(servo: Servos): number{
        switch(servo){
            case Servos.baseServo: return 0;
            case Servos.clawTurnServo: return 1;
            default: return 2;
        }
    }
    
    function setDir(dir: direction): number{
        if (dir == direction.clockwise){
            return 1;
        }
            return -1;
    }
    
    function getFinalAngle(servo: Servos, degree: number, dir: direction): number{
        let index = GetIndex(servo);
        let deg = ServoAngle[servo] +  degree * setDir(dir);
        if (deg > ServoMaxAngle[servo]){
            return ServoMaxAngle[servo];
        }
        else if (deg < 0){
            return 0;
        }
        return deg;
    }
    
    
    function servoMove(servo: Servos, degree: number): void{
        if (!initialized) {
            initPCA9685()
        }
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600) // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000
        setPwm(servo + 7, 0, value)
    
    }
    
    //% blockId=servo_turn block="Servo|%servo| turn |%dir by |%degree degree"
    //% degree.min=0 degree.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function turn(servo: Servos, dir: direction, degree: number): void {
        let index = GetIndex(servo);
        ServoAngle[index] = getFinalAngle(servo, degree, dir);
        servoMove(servo, ServoAngle[index]);
    }
    
    //% blockId=servo_showangle block="Servo|%servo| show angle"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function showAngle(servo: Servos): void{
        let index = GetIndex(servo);
        basic.showNumber(ServoAngle[index]);
    }
    
    //% blockId=servo_getangle block="angle of Servo|%servo|"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function getAngle(servo: Servos): number{
        let index = GetIndex(servo);
        return ServoAngle[index];
    }
}
