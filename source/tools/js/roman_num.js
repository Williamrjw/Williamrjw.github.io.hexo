var value=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
var roman=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
function int2roman(num,flag=0){
    var str="";
    var bigger="";
    if(num>3999) {
        bigger=int2roman(Math.floor(num/1000),flag+1);
        num=num%1000;
    }
    for(var i=0;i<13;i++){
        while(num>=value[i]){
            num-=value[i];
            str+=roman[i];
        }
    }
    str=bigger+str;
    if(flag){
        str="("+str+")"
    }
    return str;
}
var dic={}
for(var i=0;i<13;i++){
    dic[roman[i]]=value[i];
}
dic[""]=0;
function roman2int(str){
    var num=0;
    var flag=0;
    for (var i=0;i<str.length-1;i++){
        if('('==str[i]){
            flag++;
            continue;
        }
        if(')'==str[i]){
            flag--;
            continue;
        }
        if(')'==str[i+1]){
            num+=dic[str[i]]*Math.pow(1000,flag);
            continue;
        }
        if(dic[str[i]]<dic[str[i+1]]){
            num-=dic[str[i]]*Math.pow(1000,flag);
        }
        else num+=dic[str[i]]*Math.pow(1000,flag);
    }
    if(')'!=str[i]){
        num+=dic[str[i]]
    }
    return num;
}
