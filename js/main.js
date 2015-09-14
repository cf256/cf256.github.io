/**
Convert a random string to 2 different colors and make gradient

This implementation uses CRC to hash a string into 4 Bytes
1 Byte per parameter in RGBA

# 2015 by Christian Fredrik Linchausen

Based on randomstringtocsscolor.com by Tim Pietrusky
# timpietrusky.com
**/
/**
    TO DO
    Make the gradient angle of the user agent. E.g. width/height
    Make everything in JQuery syntax
    Uncomment Imports from HTML
    Make choice for selecting which kind of gradient? Conic, etc
**/

var input = document.querySelector('input');

// Listen to keyup
input.addEventListener('keyup', function(e) {
var value = this.value,
    polynomialColorOne = "EDB88320",
    polynomialColorTwo = "31098151";
    try {
        var colorOneInt = parseInt(polynomialColorOne, 16);
        var crcColorOne = crc32_compute_string(colorOneInt, value);
        var colorTwoInt = parseInt(polynomialColorTwo, 16);
        var crcColorTwo = crc32_compute_string(colorTwoInt, value);
        var colorOne = stringToRGBA(crcColorOne.toString(16));
        var colorTwo = stringToRGBA(crcColorTwo.toString(16));
        console.log(colorOne);
        console.log(colorTwo);
        // Output
        $(".well.one").text(rgbaToHex(colorOne));
        $(".well.two").text(rgbaToHex(colorTwo));

        $(".well.three").text('rgba('+colorOne.r+','+colorOne.g+','+colorOne.b+','+colorOne.a+')');
        $(".well.four").text('rgba('+colorTwo.r+','+colorTwo.g+','+colorTwo.b+','+colorTwo.a+')');

        $(".well.one").css({
            'background-image': 'linear-gradient(to bottom,' + rgbaToHex(colorOne) + ', ' + rgbaToHex(colorOne) + ')'
        });
        $(".well.two").css({
            'background-image': 'linear-gradient(to bottom,' + rgbaToHex(colorTwo) + ', ' + rgbaToHex(colorTwo) + ')'
        });
        $(".well.three").css({
            'background-image': 'linear-gradient(to bottom,' + 'rgba('+colorOne.r+','+colorOne.g+','+colorOne.b+','+colorOne.a+')'
             + ', ' + 'rgba('+colorOne.r+','+colorOne.g+','+colorOne.b+','+colorOne.a+')'
        });
        $(".well.four").css({
            'background-image': 'linear-gradient(to bottom,' + 'rgba('+colorTwo.r+','+colorTwo.g+','+colorTwo.b+','+colorTwo.a+')'
             + ', ' + 'rgba('+colorTwo.r+','+colorTwo.g+','+colorTwo.b+','+colorTwo.a+')'
        });
        $(".md-col-12.gradient").css({
            'background-image': 'linear-gradient(45deg,' + 'rgba('+colorOne.r+','+colorOne.g+','+colorOne.b+','+colorOne.a+')' 
                +  ',' + 'rgba('+colorTwo.r+','+colorTwo.g+','+colorTwo.b+','+colorTwo.a+')' + ')'
        });
        $('body, html').css({
            'background-image': 'linear-gradient(45deg,' + 'rgba('+colorOne.r+','+colorOne.g+','+colorOne.b+','+colorOne.a+')' 
                +  ',' + 'rgba('+colorTwo.r+','+colorTwo.g+','+colorTwo.b+','+colorTwo.a+')' + ')'
        });
    } catch(e) {
        console.log(e);
        $('body, html').css({
            'background-image': 'linear-gradient(45deg,' + '#333333' +  ',' + '#333333)' + ')' 
        });
        $(".well.one").text('#333333');
        $(".well.two").text('#333333');
        $(".well.three").text('rgba(51,51,51,1)');
        $(".well.four").text('rgba(51,51,51,1)');
        }
    });

function hexStringToDecimal(hexString) {
    return parseInt(hexString, 16);
}
function stringToRGBA(hexString) {
    var RGBA = {
        'r': hexStringToDecimal(hexString.slice(0, -6)),
        'g': hexStringToDecimal(hexString.slice(2, -4)),
        'b': hexStringToDecimal(hexString.slice(4, -2)),
        'a': (hexStringToDecimal(hexString.slice(-2)) / 255).toFixed(2)
    };
    return RGBA;
}
function rgbaToHex(RGBA) {
    return ('#' + d2h(RGBA.r) + d2h(RGBA.g) + d2h(RGBA.b));
}
function d2h(d) { 
    return (+d).toString(16).toUpperCase(); 
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
