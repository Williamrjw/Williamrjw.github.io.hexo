function calculateBMI() {
    var bmi_graph = document.getElementById('bmi_graph');
    var bmi_value = document.getElementById('bmi_value');
    var height = document.getElementById('height');
    var weight = document.getElementById('weight');
    var bmi = weight.value / Math.pow(height.value / 100, 2);
    if(bmi > 5 && bmi < 45){
        bmi_value.innerHTML = '您的BMI: ' + bmi.toFixed(2);
        bmi_graph.value=bmi;
        if(bmi < 18.5){
            $("#bmi_graph").css({"width":(2*bmi-3.7)+"%","background-color":"orange"});
        }
        else if(bmi >= 18.5 && bmi < 23.9){
            $("#bmi_graph").css({"width":(6.185*bmi-81.126)+"%","background-color":"green"});
        }
        else{
            $("#bmi_graph").css({"width":(1.57*bmi+29.177)+"%","background-color":"red"});
        }
    }
    else{bmi_value.innerHTML = '请正确输入';}
}