import { ValidatorFn, AbstractControl } from '@angular/forms';

export function cardValidValidator(cardType: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const cardNumber = control.value;
        if (cardNumber !== '') {
            const isValid = validCard(cardNumber, cardType);
            return isValid === false ? { cardvalid: true } : null;
        } else {
            return null;
        }

    };
}

/*********Credit card validations**********************/

function validCard(cardNumber: number, cardType: string) {
    let result = false;
    const cardLength = cardNumber.toString().length;

    if (cardLength !== 0) {
        const cardPrefix = Mid(cardNumber.toString(), 0, 2);
        switch (cardType) {
            case 'CC_V': result = checkVisa(cardNumber.toString()); break; // VISA
            case 'CC_I': result = checkIsraCard(cardNumber.toString()); break; // ISRACARD
            case 'CC_E': result = checkAmerican(cardNumber.toString(), cardPrefix); break; // AMERICAN EXPRESS
            case 'CC_D': result = checkDinners(cardNumber.toString()); break; // DINERS CLUB
            case 'CC_M': result = checkIsraCard(cardNumber.toString()); break; // MASTER CARD
            case 'CC_F': result = true; break; // SHOP AND FLY
            case 'CC_L': result = true; break; // LEUMI CARD
            case 'CC_G': result = true; break; // SHUFERSAL CAL
            case 'CC_G': result = true; break; // SHUFERSAL LEUMI
            default: result = illegal(cardNumber.toString()); break;
        }
    }

    return result && illegal(cardNumber.toString());
}

function illegal(cardNumberStr: string) {
    let billegal = true;
    if (cardNumberStr === '4111111111111111' || cardNumberStr === '5111111111111118'
        || cardNumberStr === '4580458045804580') {
        billegal = false;
    }
    return billegal;
}

function checkIsraCard(cardNumberStr: string) {
    let temp: string;
    let tempprefix: string;
    let result = false;
    const cardLength = cardNumberStr.length;
    if (cardLength !== 8 && cardLength !== 9 && cardLength !== 16) { return result; }
    temp = cardNumberStr;
    if (cardLength === 8) { temp = '0' + temp; }
    if (cardLength === 8 || cardLength === 9) {
        tempprefix = Mid(temp, 0, 2);
        if (tempprefix === '00' || tempprefix === '52' ||
            Mid(temp, 1, 1) === '7' || Mid(temp, 0, 1) === '6') { return result; }
    } else {
        if (Mid(cardNumberStr, 0, 1) !== '5') { return result; }
        result = checkdigit(cardNumberStr);
        return result;
    }
    return checkIsraDigit(cardNumberStr);
}

function checkIsraDigit(cardNumberStr: string): boolean {
    let validSum: number;
    let temp = cardNumberStr;
    if (cardNumberStr.length === 8) {
        temp = '0' + temp;
    }
    validSum = parseInt(Mid(temp, 0, 10), 2) * 9 + parseInt(Mid(temp, 1, 1), 10) * 8 +
        parseInt(Mid(temp, 2, 1), 10) * 7 + parseInt(Mid(temp, 3, 1), 10) * 6 +
        parseInt(Mid(temp, 4, 1), 10) * 5 + parseInt(Mid(temp, 5, 1), 10) * 4 +
        parseInt(Mid(temp, 6, 1), 10) * 3 + parseInt(Mid(temp, 7, 1), 10) * 2 +
        parseInt(Mid(temp, 8, 1), 10) * 1;
    return ((validSum % 11) === 0);
}


function Mid(str: string, start: number, len: number): string {
    if (start < 0 || len < 0) { return ''; }
    let iEnd;
    const iLen = str.length;
    if ((start + len) > iLen) {
        iEnd = iLen;
    } else {
        iEnd = start + len;
    }
    return str.substring(start, iEnd);
}



function checkdigit(cardNumberStr: string): boolean {
    let twice: boolean;
    let sum = 0;
    twice = false;
    for (let i = cardNumberStr.length - 1; i >= 0; i--) {
        if (twice === false) {
            sum = sum + parseInt(Mid(cardNumberStr, i, 1), 10);
            twice = true;
        } else {
            let incSum = parseInt(Mid(cardNumberStr, i, 1), 10) * 2;
            if (incSum > 9) {
                incSum = (incSum % 10) + parseInt((incSum / 10).toString(), 10);
            }
            sum = sum + incSum;
            twice = false;
        }

    }
    return ((sum % 10) === 0);
}

function checkVisa(cardNumberStr: string): boolean {
    const result = false;
    const numlength = cardNumberStr.length;
    if (numlength !== 13 && numlength !== 16) { return result; }
    if (numlength === 13) {
        if (Mid(cardNumberStr, 0, 1) !== '4') { return result; }
    }
    if (numlength === 16) {
        if (Mid(cardNumberStr, 0, 1) !== '3' && Mid(cardNumberStr, 0, 1) !== '4') { return result; }
    }
    return checkdigit(cardNumberStr);
}


function checkDinners(cardNumberStr: string): boolean {
    const result = false;
    if (cardNumberStr.length !== 14) { return result; }
    if ((Mid(cardNumberStr, 0, 1) !== '3') && (Mid(cardNumberStr, 0, 1) !== '6')) { return result; }
    return checkdigit(cardNumberStr);
}

function checkAmerican(cardNumberStr: string, prefix: string): boolean {
    const result = false;
    if (cardNumberStr.length !== 15) { return result; }
    if (prefix !== '34' && prefix !== '37') { return result; }
    return checkdigit(cardNumberStr);
}
