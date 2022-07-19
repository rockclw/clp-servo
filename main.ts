/*
Riven
modified from robotbit
load dependency
"clpServo": "file:../pxt-clpServo"
*/

//% color="#31C7D5" weight=10 icon="\uf1d0"
namespace clpRobotArmServo{
    export enum Servos{
        baseServo,
        clawTurnServo,
        clawServo
    }

    function toServo(servo: Servos): robotbit.Servos{
        switch (servo){
            case Servos.baseServo: return robotbit.Servos.S1;
            case Servos.clawTurnServo: return robotbit.Servos.S2;
            default: return robotbit.Servos.S3;
        }
    }
    
    export enum direction{
        anticlockwise = 0,
        clockwise = 1
    }
    
    function toIndex(servo: Servos): number{
        switch(servo){
        
            case Servos.baseServo: return 0;
            case Servos.clawTurnServo: return 1;
            case Servos.clawServo: return 2;
            default: return 3;
        }
    }
    
    let ServoAngle:number[] = [0,0,0];
    let ServoMaxAngle:number[] = [145,180,80];
    
    function setDir(dir: direction): number{
        if (dir == direction.clockwise){
            return 1;
        }
            return -1;
    }
    
    function getFinalAngle(servo: Servos, degree: number, dir: direction): number{
    
        let deg = ServoAngle[toIndex(servo)] +  degree * setDir(dir);
        if (deg > ServoMaxAngle[servo]){
            return ServoMaxAngle[servo];
        }
        else if (deg < 0){
            return 0;
        }
        return deg;
    }
    
    //% blockId=servo_turn block="Servo|%servo| turn %dir by %degree degree"
    //% degree.min=0 degree.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function turn(servo: Servos, degree: number, dir: direction): void {
        ServoAngle[ServoAngle[toIndex(servo)]] = getFinalAngle(servo, degree, dir);
        robotbit.Servo(toServo(servo), ServoAngle[servo]);
    }
    
    //% blockId=servo_showangle block="Servo|%servo| show angle"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function showAngle(servo: Servos): void{
        basic.showNumber(ServoAngle[toIndex(servo)]);
    }
    
    //% blockId=servo_getangle block="angle of Servo|%servo|"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function getAngle(servo: Servos): number{
        return ServoAngle[toIndex(servo)];
    }
}
