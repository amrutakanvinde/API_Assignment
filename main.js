
let mainDiv = document.getElementById("#main");
let table = document.querySelector('table');
let divModal = document.querySelector(".modal-body");
let divModalTitle = document.getElementById("exampleModalLabel");

fetch('https://ghibliapi.herokuapp.com/films')
.then(function(response){
    // console.log(response);
    return response.json();
})
.then(function(json){
    // console.log(json);
    displayData(json);
})
.catch(function(err){
    console.log(err);
})


function getPeopleById(url, id){
    if(url !== ""){
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){

            // console.log(json);

            let lnk = document.createElement('a');
            let col = document.getElementById('col' + id);

            lnk.innerHTML = json.name + ', ';
            // lnk.setAttribute("href", json.url)
            lnk.setAttribute('class', 'lnkColor');
            lnk.setAttribute('data-toggle', 'modal');
            lnk.setAttribute('data-target', '#exampleModal');
            lnk.setAttribute('id',json.id);
            lnk.addEventListener('click', callme);
            
            col.appendChild(lnk);
            
        })
        .catch(function(err){
            console.log(err);
        })
    } 
}
let globalPeopleId = "";

function callme(e){
    // console.log(this.id);

    globalPeopleId = this.id;
    fetch('https://ghibliapi.herokuapp.com/people')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        for(let i = 0; i < json.length; i++){
            
            if(globalPeopleId === json[i].id){
                // console.log("FIRED", json[i].name);
                
                divModalTitle.innerHTML = json[i].name;
                divModal.innerHTML = 'Gender: ' + json[i].gender + "<br/> Age: " + json[i].age + "<br/> Eye Color: " + json[i].eye_color + "<br/> Hair Color: " + json[i].hair_color ;
            }
        }
    })
    .catch(function(err){
        console.log(err);
    })
}

function displayData(json) {

    for(arr of json){
    
        let colTitle = document.createElement('td');
        let newRow = document.createElement('tr');
        let colDescription = document.createElement('td');
        let colPeople = document.createElement('td');
        let colDirector = document.createElement('td');
        
        colPeople.setAttribute("id", "col" + arr.id);
        colPeople.setAttribute('class', 'darkCol');
        colTitle.innerHTML = arr.title;
        colDescription.innerHTML = arr.description;
        colDirector.innerHTML = arr.director;
        colDirector.setAttribute("class", 'darkCol');


        table.appendChild(newRow);
        newRow.appendChild(colTitle);
        newRow.appendChild(colDescription);
        newRow.appendChild(colDirector);

        if(arr.people !== undefined && arr.people.length > 1){
            arr.people.forEach(element => {
                getPeopleById(element,arr.id);
            });
        }
        newRow.appendChild(colPeople);
    }
    
}

