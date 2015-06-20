/**
Convert a random string to css color

This implementation uses CRC to hash a string into 4 Bytes
1 Byte per parameter in RGBA

# 2015 by Christian Fredrik Linchausen

Based on randomstringtocsscolor.com by Tim Pietrusky
# timpietrusky.com
**/

var output = document.querySelector('.output'),
output_rgba = document.querySelector('.output.rgba'),
input = document.querySelector('input'),
body = document.body;

// Listen to keyup
input.addEventListener('keyup', function(e) {
    var value = this.value,
    result = "",
    polynomialColorOne = "EDB88320",
    polynomialColorTwo = "31098151";
    try {
        var oneInt = parseInt(polynomialColorOne, 16);
        var crcOne = crc32_compute_string(oneInt, value);
        var hexStringOne = crcOne.toString(16);
// New polynomial
var twoInt = parseInt(polynomialColorTwo, 16);
var crcTwo = crc32_compute_string(twoInt, value);
var hexStringTwo = crcTwo.toString(16);
// Convert to RGBA
var rString = hexStringOne.slice(0, -6);
var gString = hexStringOne.slice(2, -4);
var bString = hexStringOne.slice(4, -2);
var aString = hexStringOne.slice(-2);
r = hexStringToDecimal(rString);
g = hexStringToDecimal(gString);
b = hexStringToDecimal(bString);
a = (hexStringToDecimal(aString) / 255).toFixed(2);

var rString = hexStringTwo.slice(0, -6);
var gString = hexStringTwo.slice(2, -4);
var bString = hexStringTwo.slice(4, -2);
var aString = hexStringTwo.slice(-2);
r2 = hexStringToDecimal(rString);
g2 = hexStringToDecimal(gString);
b2 = hexStringToDecimal(bString);
a2 = (hexStringToDecimal(aString) / 255).toFixed(2);
    // Output
    $(".well.one").text('#'+ hexStringOne.substr(0,6));
    $(".well.two").text('#'+ hexStringTwo.substr(0,6));
    $(".well.three").text('rgba('+r+','+g+','+b+','+a+')');
    $(".well.four").text('rgba('+r2+','+g2+','+b2+','+a2+')');

    $(".well.one").css({
        'background-image': 'linear-gradient(to bottom,' + '#' + hexStringOne.substr(0,6) + ', ' + '#' + hexStringOne.substr(0,6) + ')'
    });
    $(".well.two").css({
        'background-image': 'linear-gradient(to bottom,' + '#' + hexStringTwo.substr(0,6) + ', ' + '#' + hexStringTwo.substr(0,6) + ')'
    });
    $(".well.three").css({
        'background-image': 'linear-gradient(to bottom,' + 'rgba('+r+','+g+','+b+','+a+')' + ', ' + 'rgba('+r+','+g+','+b+','+a+'))'
    });
    $(".well.four").css({
        'background-image': 'linear-gradient(to bottom,' + 'rgba('+r2+','+g2+','+b2+','+a2+')' + ', ' + 'rgba('+r2+','+g2+','+b2+','+a2+'))'
    });
    $('body, html').css({
        'background-image': 'linear-gradient(45deg,' + 'rgba('+r+','+g+','+b+','+a+')' +  ',' + 'rgba('+r2+','+g2+','+b2+','+a2+')' + ')' 
    });
} catch(e) {
    console.log(e);
    $('body, html').css({
        'background-image': 'linear-gradient(45deg,' + '#333333' +  ',' + '#333333)' + ')' 
    });
    $(".well.one").text('#333333');
    $(".well.two").text('#333333');
    $(".well.three").text('rgba(51,51,51,1)');
    $(".well.   four").text('rgba(51,51,51,1)');
}
});

function hexStringToDecimal(hexString) {
    return parseInt(hexString, 16);
}
// CRC Hashing from http://www.simplycalc.com/crc32-source.php
function crc32_generate(polynomial) {
    var table = new Array()
    var i, j, n

    for (i = 0; i < 256; i++) {
        n = i
        for (j = 8; j > 0; j--) {
            if ((n & 1) == 1) {
                n = (n >>> 1) ^ polynomial
            } else {
                n = n >>> 1
            }
        }
        table[i] = n
    }

    return table
}

function crc32_initial() {
    return 0xFFFFFFFF
}

function crc32_final(crc) {
    crc = ~crc
    return crc < 0 ? 0xFFFFFFFF + crc + 1 : crc
}

function crc32_compute_string(polynomial, str) {
    if (str ==="") {
        throw "Empty String";
    };
    var crc = 0
    var table = crc32_generate(polynomial)
    var i

    crc = crc32_initial()

    for (i = 0; i < str.length; i++)
        crc = (crc >>> 8) ^ table[str.charCodeAt(i) ^ (crc & 0x000000FF)]

    crc = crc32_final(crc)
    return crc
} 
