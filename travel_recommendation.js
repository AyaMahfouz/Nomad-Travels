
function search(){
    const resDiv = document.querySelectorAll("div.searchResults");
    resDiv.forEach(div => div.remove());
    const container = document.getElementById('container');
    const searchKey= document.getElementById("searchField").value.toLowerCase();
    if(searchKey=="beach" || searchKey=="beaches"){
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            data.beaches.forEach(beach => {
                const Res_img = beach.imageUrl;
                const Res_name = beach.name;
                const Res_desc = beach.description;
                addResDiv(Res_img,Res_name,Res_desc);
            })
        })
        .catch(error => console.log("??"));
    }
    else if(searchKey =="temple" || searchKey=="temples"){
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            data.temples.forEach(temple => {
                const Res_img = temple.imageUrl;
                const Res_name = temple.name;
                const Res_desc = temple.description;
                addResDiv(Res_img,Res_name,Res_desc);
            })
        })
        .catch(error => console.log("??"));
    }
    else{
        console.log("here");
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            data.countries.forEach(country => {
                if(country.name.toLowerCase() == searchKey){
                    console.log(country.name);
                    country.cities.forEach(city=>{
                        console.log(city.name);
                        const Res_img = city.imageUrl;
                        const Res_name = city.name;
                        const Res_desc = city.description;
                        addResDiv(Res_img,Res_name,Res_desc);
                    })
                }
            })
        })
        .catch(error => console.log("??"));
    }
}

function addResDiv(img,name,desc){
    const searchRes = document.createElement('div');
        searchRes.setAttribute("class","searchResults");
        searchRes.setAttribute("id","searchResults");

        const imgRes = document.createElement('img');
        imgRes.setAttribute("class","resImg");
        imgRes.src=img;

        const nameRes = document.createElement('h3');
        nameRes.textContent = name;

        const desRes = document.createElement('p');
        desRes.textContent = desc;

        const visitBtnRes = document.createElement('button');
        visitBtnRes.setAttribute("class","visitBtn");
        visitBtnRes.textContent = "Visit";

        container.appendChild(searchRes);
        searchRes.appendChild(imgRes);
        searchRes.appendChild(nameRes);
        searchRes.appendChild(desRes);
        searchRes.appendChild(visitBtnRes);
}

function clearBtn(){
    document.getElementById("searchField").value = "";
    const resDiv = document.querySelectorAll("div.searchResults");
    resDiv.forEach(div => div.remove());
}

document.getElementById("searchBtn").addEventListener('click',search);
document.getElementById("resetBtn").addEventListener('click',clearBtn);
