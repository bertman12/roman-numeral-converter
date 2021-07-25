/* 
EDDY ESTRADA

1 = I
5 = V
10 = X
50 = L
100 = C
500 = D
1000 = M

FOR EVERY NUMBER BEFORE A MULTIPLE OF 5, YOU MUST USE SUBTRACTION WITH THE SYMBOLS

USE AN ARRAY TO SPIT OUT THE CORRECT ROMAN NUMERAL INTO YOUR FINAL CONVERTED ARRAY
EX: 5 CONVERTS IN V, V IS PUSHED INTO THE OUTPUT ARRAY
THE LARGEST STRING PUSHED INTO THE OUTPUT ARRAY WILL BE A LENGTH OF 4
IX = 9
VIII = 8
VII = 7 
VI = 6
V = 5

DIVIDE BY 1000, THEN 500, 100, 50, 10, 5, 1
THEN PUSH THOSE COMPUTED VALUES INTO A NUMBER ARRAY
THEN PUT ARRAY IN ALGORITHM WHICH RETURNS A ROMAN NUMERAL BASED OFF THE POSITION 
OF THE NUMBER IN THE ARRAY.

ARRAY WOULD LOOK SOMETHING LIKE THIS [ONES, FIVES, TENS, FIFTIES, HUNDREDS, FIVE-HUNDREDS, THOUSANDS]

THE ALGORITHM WOULD START FROM THE BEGINNING OF THE ARRAY AND WORK TO THE END WHILE SPITTING OUT ROMAN NUMERALS
    THE ALGORITHM WOULD USE A COMBINATION OF DIVIDING AND MODULUS
    TAKE THE INPUT NUMBER AND TRY DIVIDING BY THE LARGEST NUMBER '1000'
    AFTER DIVIDING, PUT THE REMAINDER INTO A VARIABLE TO WORK WITH BY USING THE MODULUS OPERATOR
    THEN MOVE ON TO THE NEXT SMALLEST NUMBER, RINSE AND REPEAT

    FOR NUMBERS WHOSE DIVISION RESULT IN 4 OR 9 WE WILL PUSH A ROMAN NUMERAL INTO THE POSITION BEFORE IT SO IT WILL BE SUBTRACTED FROM THE LARGER ROMAN NUMERAL
    BASED ON OUR RULE OF SUBTRACTING ROMAN NUMERALS ON POWERS OF 5

    WE'LL GET THE ROMAN NUMERAL THAT IS THE LARGEST IN ITS NUMBER RANGE (EX:THE NUMBER 400 HAS 500 AS ITS LARGEST NUMBER IN ITS ROMAN NUMERAL RANGE FROM 100 TO 500)
    TAKE THE GREATEST ROMANL NUMERAL IN THE APPROPRIATE BRACKET AND THEN TAKE THE LOWEST ROMAN NUMERAL IN ITS RANGE BRACKET AND PLACE THE LOWEST BEFORE THE GREATEST

    FOR NUMBERS WHO ARENT A MULTIPLE OF 5 AND ARENT 4 OR 9, WE WILL BRANCH OFF INTO ANOTHER ALGORITH THAT WILL ADD THE LOWER NUMERAL FROM ITS NUMBER BRACKET AN APPROPRIATE 
    AMOUNT OF TIMES. THESE WILL BE PUSHED INTO THE CHAR ARRAY

    THE COMPUTER WILL DETERMINE THE NUMBER BRACKET RANGES OF THE INPUT AND THE REMAINDER USING IF STATEMENTS

    TO KNOW WHAT ROMAN NUMERAL TO USE WHEN YOU FINISH YOUR CALCULATION, WE WILL USE ITS POSITION IN THE NUMBER ARRAY
    WE WILL HAVE AN ALGORITHM THAT LOOKS AT THE POSITION AND THEN LOOKS AT THE VALUE TO DETERMINE WHAT ROMAN NUMERAL TO USE
    THE POSITION OF THESE SUBARRAYS WILL HAVE THE CORRECT ROMAN NUMERALS AVAILABLE BASED OFF THE POSITION OF THE VALUE IN OUR COMPUTED INPUT NUMBER ARRAY
    EX WE HAVE A NUMBER 5 IN THE FIRST POSITION OF OUR COMPUTED ARRAY, THEREFORE WE WILL ONLY CHECK THE FIRST ROMAN NUEMRAL SUB ARRAY AND THEN CHOOSE THE CORRECT ROMAN NUMERAL
    
    */


function computeInput(number) {
    
    let remainder = null;
    const localArray = [];

    if(number <= 4000){ //4000 is chosen for the freecodecamp.org test cases but can be scaled up if necessary
        localArray.unshift(Math.floor(number/1000));//values are 1 - 4. This range can change based on your conditional
        remainder = number % 1000; //remainder is never greater than 1000
        localArray.unshift(Math.floor(remainder/100)); //values are 1 - 10
        remainder = number % 100; //remainder is never greater than 100
        localArray.unshift(Math.floor(remainder/10)); //values are 1 - 9
        remainder = number % 10; //remainder is never greater than 10
        localArray.unshift(Math.floor(remainder)); //values are 1 - 9
    }
    return localArray;
}

function createRomanNumerals (numberArray) {
    const localArray = [];
    const ROMAN_NUMERALS = [
        ['I', 'V'],    //1 - 9
        ['X', 'L'],    //10 - 99
        ['C', 'D'],    //100 - 999
        ['M', 'v'],    //1000 - 9999
        ['x']          //10000
    ];

    //make decisions for which roman numeral to use
    //we are going to interact with the roman numerals array with respect to the current index of our number array
    //we will use i for tracking our index and matching respectively with the roman numeral array

    for(let i = 0; i < numberArray.length; i++){
        if(i != 3){
            switch(numberArray[i]){
                case 0: //temporarily used to insert empty spaces to show 0 index value
                    //localArray.unshift('_');
                break;
                case 4: //uses a combination of characters from current sub array
                    localArray.unshift(ROMAN_NUMERALS[i][1]);
                    localArray.unshift(ROMAN_NUMERALS[i][0]);
                break;
                case 5: //uses single character of sub array
                    localArray.unshift(ROMAN_NUMERALS[i][1]); //this will add the largest roman numeral in the apprpriate bracket
                break;
                case 9: //uses a combination of characters from current sub array and borrows a character from the next sub array
                    localArray.unshift(ROMAN_NUMERALS[i + 1][0]);
                    localArray.unshift(ROMAN_NUMERALS[i][0]);
                break;
                case 10: //borrows a character from the next sub array
                    localArray.unshift(ROMAN_NUMERALS[i + 1][0]);
                break;
                //default will handle a number range whose algorithm is indifferent
                //needs to handle case ragnges 1, 2, 3 AND 6, 7, 8
                //each range requires 3 loops
                default:
                    //values 1, 2, 3
                    if(numberArray[i] < 4){
                        for(let x = 0; x < numberArray[i]; x++){
                            localArray.unshift(ROMAN_NUMERALS[i][0]);
                        }
                    }
                    //values 6, 7, 8
                    else{ 
                        for(let x = 0; x < numberArray[i] - 5; x++){
                            localArray.unshift(ROMAN_NUMERALS[i][0]);
                        }
                        localArray.unshift(ROMAN_NUMERALS[i][1]);
                    }
            }//end switch statement
        }//end if statement
        else if(i = 3){
            for(let x = 0; x < numberArray[i]; x++){
                localArray.unshift(ROMAN_NUMERALS[i][0]);
            }
        }
    }
    return localArray;
}

function convertNumber (){
    let inputNumber = inputField.value;
    let computedInputNumber = computeInput(inputNumber);
    let computedRomanNumerals = createRomanNumerals(computedInputNumber);
    let convertedNumber = computedRomanNumerals.join('');
    
    outputTextArea.innerHTML = convertedNumber;
}
