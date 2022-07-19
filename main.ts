namespace clpRobotArmServo{
    export enum Servos{
        baseServo  = 0,
        clawTurnServo = 1,
        clawServo = 2
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
    
    let ServoAngle:number[] = [0,0,0];
    let ServoMaxAngle:number[] = [145,180,80];
    
    function setDir(dir: direction): number{
        if (dir == direction.clockwise){
            return 1;
        }
            return -1;
    }
    
    function getFinalAngle(servo: Servos, degree: number, dir: direction): number{
    
        let deg = ServoAngle[servo] +  degree * setDir(dir);
        if (deg > ServoMaxAngle[servo]){
            return ServoMaxAngle[servo];
        }
        else if (deg < 0){
            return 0;
        }
        return deg;
    }
    
    //% blockId=servo_turn block="Servo|%servo| turn |%dir by |%degree degree"
    //% degree.min=0 degree.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function turn(servo: Servos, dir: direction, degree: number): void {
        ServoAngle[servo] = getFinalAngle(servo, degree, dir);
        robotbit.Servo(toServo(servo), ServoAngle[servo]);
    }
    
    //% blockId=servo_showangle block="Servo|%servo| show angle"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function showAngle(servo: Servos): void{
        basic.showNumber(ServoAngle[servo]);
    }
    
    //% blockId=servo_getangle block="angle of Servo|%servo|"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function getAngle(servo: Servos): number{
        return ServoAngle[servo];
    }
}
