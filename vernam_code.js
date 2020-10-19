//Переменная для хранения ключа
var key = '';


//Функция для генирации ключа
function generatorKey(size){
    var abc = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    var rs = "";
    while (rs.length != size) {
        rs += abc[Math.floor(Math.random() * abc.length)];
    }
    return rs
}

//Удовлетворение условия: "Если длина гаммы меньше, чем длина сообщения, то она используется повторно."
function getKey(inputText){
    var keyForCoding = key;
    while(keyForCoding.length<inputText.length){
        keyForCoding = keyForCoding + key;
    }
    return keyForCoding;
}



 //Запуск алгоритма шифрования Ci = Pi ⊕ Ki
 function startCoding(inputText){

    var outputText = "";

    //Получение ключа
    var keyForCoding = getKey(inputText);

    //Массив для хранения преобразованных символов
    var arraySymbol = [];

    //Оператор '^' - Побитовое исключающее ИЛИ
    for (i = 0; i < inputText.length; i++) { 

        // Pi – i-ый символ открытого и шифрованного сообщения;
        var Pi = inputText.charCodeAt(i);

        //Кi – i-ый символ гаммы (ключа). 
        var Ki = keyForCoding.charCodeAt(i);

        //Ci - символ полученный в результате "Побитовое исключающее ИЛИ"
        var Ci = Pi ^ Ki;

        //Добавление кода символа в массив
        arraySymbol.push(Ci.toString());

     }

     //Преобразую коды символов в строку 
     arraySymbol.forEach(function(symbolCode) {
       outputText = outputText + symbolCode + " ";
   });

    //Добавляю преобразованный текст на форму
    $('#outputData').val(outputText);
    
}



//Запуск алгоритма дешифрования Pi = Ci ⊕ Ki
function startDecoding(inputText){

    var outputText = "";

    //Массив для хранения кодов символов для дешифрования
    //из входного текста состоящего из кода и пробела я получаю массив, после удаления пробела
    var arraySymbol = inputText.split(" ");

    //Получение ключа
    var keyForCoding = getKey(inputText);

    //Оператор '^' - Побитовое исключающее ИЛИ
    for(i = 0; i < arraySymbol.length; i++){

        //Может попасться пустой символ. Исключаем этот момент
        if(arraySymbol[i]!=""){
            // Ci – i-ый символ открытого и шифрованного сообщения;
             var Ci = Number.parseInt(arraySymbol[i]);

            //Кi – i-ый символ гаммы (ключа). 
            var Ki = keyForCoding.charCodeAt(i);

            //Pi - символ полученный в результате "Побитовое исключающее ИЛИ"
            var Pi = Ci ^ Ki;

            outputText += String.fromCharCode(Pi)
        }

    }

    //Добавляю преобразованный текст на форму
    $('#outputData').val(outputText);
    
}