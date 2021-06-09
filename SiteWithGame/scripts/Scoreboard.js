let showBestPlayers=function(){
    let key1;
    let key2;
    let key3;

    let table = document.getElementById("myTable");

    let best3 =0;
    let best2 =0;
    let best1 =0;

    Object.keys(localStorage).forEach(function(key){

        deserial = JSON.parse(localStorage.getItem(key));
        console.log(key + " " + deserial.points);

 if(deserial.points>best1){
            best2=best1;
            key2=key1;   
            best1=deserial.points;
            key1=key;

        
        }else{
        
            if(deserial.points>best2){
                best3=best2;
                key3=key2;
                best2=deserial.points;
                key2=key;
            
            }else{
               
                if(deserial.points>best3){
                    best3=deserial.points;
                    key3=key;
                }
            }
        }
    });

    let keys=[key1,key2,key3];

    console.log(keys);

    for(let i =0;i<4;i++){     
        deserial = JSON.parse(localStorage.getItem(keys[2-i]));
        if(deserial===null){
            break;
        }

        let row = table.insertRow(1);
        cell1 = row.insertCell(0) //country
        cell2 = row.insertCell(1) //name
        cell3 = row.insertCell(2) //score
        
        playerName=deserial.username;
        scoredPoints=deserial.points;
        countryCode="https://www.countryflags.io/"+deserial.country+"/flat/64.png";

        ImgCountry=document.createElement("img");

        cell1.appendChild(ImgCountry);
        ImgCountry.src = countryCode;
        cell2.innerHTML = playerName;
        cell3.innerHTML = scoredPoints;
    }
}
showBestPlayers();
