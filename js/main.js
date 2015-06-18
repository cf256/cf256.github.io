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
      reversedPolynomial = "EDB88320";
    try {
    var reversed = parseInt(reversedPolynomial, 16);
    var crc = crc32_compute_string(reversed, value);
    var hexString = crc.toString(16);
    // Output
    output.innerText = "#"+ hexString.substr(0,6);
    // Convert to RGB

    var rString = hexString.slice(0, -6);
    var gString = hexString.slice(2, -4);
    var bString = hexString.slice(4, -2);
    var aString = hexString.slice(-2);
    r = hexStringToDecimal(rString);
    g = hexStringToDecimal(gString);
    b = hexStringToDecimal(bString);
    a = (hexStringToDecimal(aString) / 255).toFixed(2);
    body.setAttribute('style', 'background-color:rgba('+r+','+g+','+b+','+a);
    output_rgba.innerText = 'rgba('+r+','+g+','+b+','+a+')';
    
  } catch(e) {
    console.log(e);
    body.setAttribute('style', 'background-color:none');
    output.innerText = output_rgba.innerText = "";
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
