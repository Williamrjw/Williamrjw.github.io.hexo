const base_table="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var int2char=(a)=>{return String.fromCharCode(a);}
var charInAsc=(a)=>{return a.charCodeAt();}
var charInBase=(a)=>{return (base_table.indexOf(a) % 64);}
function chineseHandle(s){
    s=encodeURI(s);
    s=s.replace(/(\%)([0-9A-Fa-f]{2})/g, "\\x$2");
    if(s.indexOf("%")<0)
        return s;
    else
        return "";
}
function asc2base(asc){
    let base="";
    let i=0;
    for(;i<(asc.length/3-1);i++){
        let tmp1=charInAsc(asc[3*i])>>2;
        let tmp2=((charInAsc(asc[3*i]) & 0x03)<<4) | (charInAsc(asc[3*i+1])>>4);
        let tmp3=((charInAsc(asc[3*i+1]) & 0x0F)<<2) | (charInAsc(asc[3*i+2])>>6);
        let tmp4=charInAsc(asc[3*i+2])&0x3F;
        base+=base_table[tmp1];
        base+=base_table[tmp2];
        base+=base_table[tmp3];
        base+=base_table[tmp4];
    }
        let tmp1=charInAsc(asc[3*i])>>2;
        let tmp2=((charInAsc(asc[3*i]) & 0x03)<<4) | ((3*i+1)>(asc.length-1)?0:(charInAsc(asc[3*i+1])>>4));
        let tmp3=((3*i+1)>(asc.length-1))?64:(((charInAsc(asc[3*i+1]) & 0x0F)<<2) | ((3*i+2)>(asc.length-1)?0:(charInAsc(asc[3*i+2])>>6)));
        let tmp4=((3*i+2)>(asc.length-1))?64:(charInAsc(asc[3*i+2]) & 0x3F);
        base+=base_table[tmp1];
        base+=base_table[tmp2];
        base+=base_table[tmp3];
        base+=base_table[tmp4];
    return base;
}
function base2asc(base){
    let asc="";
    let i=0;
    for(;i<(base.length/4);i++){
        let tmp1=((charInBase(base[4*i]) <<2) & 0xFC) | ((charInBase(base[4*i+1])>>4) & 0x03);
        let tmp2=((charInBase(base[4*i+1])<<4) & 0xF0) | ((charInBase(base[4*i+2])>>2) & 0x0F);
        let tmp3=((charInBase(base[4*i+2])<<6) & 0xC0) | ((charInBase(base[4*i+3])) & 0x3F);
        asc+=int2char(tmp1);
        asc+=int2char(tmp2);
        asc+=int2char(tmp3);
    }
    return asc;
}
function utf16to8(str) {
    var res, c;
    res = "";
    for(let i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            res += str.charAt(i);
        } else if (c > 0x07FF) {
            res += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            res += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            res += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            res += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            res += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return res;
}

function utf8to16(str) {
    var c;
    var char2, char3;
    var res = "";
    let i = 0;
    while(i < str.length) {
    c = str.charCodeAt(i++);
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        res += str.charAt(i-1);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        res += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        res += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return res;
}
function myEncode(){
    var str=document.getElementById("src").value;
    document.getElementById('dest').value = asc2base(utf16to8(str));
}
function myDecode(){
    var str=document.getElementById("src").value;
    document.getElementById("dest").value=utf8to16(base2asc(str));
}