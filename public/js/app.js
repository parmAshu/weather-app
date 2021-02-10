let searchBox=document.getElementById('searchAddress');
let textBox=document.getElementById('textArea');

let search = () => {
    textBox.innerHTML = searchBox.value;

    let path = "weather?address="+searchBox.value;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        textBox.innerHTML = "Loading..."
        if( this.readyState == 4 && this.status==200){
            console.log(this.responseText);
            let resp = JSON.parse(this.responseText);
            if( resp.error ){
                textBox.innerHTML = resp.error; 
            }
            else{
                textBox.innerHTML = "Temperature is " + resp.weather.temperature +"°C and humidity is "+ resp.weather.humidity +'%; it feels like '+ resp.weather.feelslike+'°C. Your location : '+resp.place+'.';
            }
        }
        else if(this.readyState == 4)
        {
            textBox.innerHTML = "Something went wrong, try again !";
        }       
    }

    console.log(path);
    xhttp.open("GET", path, true);
    xhttp.send();
}