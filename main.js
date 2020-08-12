
let mainDiv = document.getElementById("#main");
let table = document.querySelector('table');

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

let personName = "";
function getPeople(url){
    

    fetch(url)
    .then(function(response){
        // console.log(response.json());
        return response.json();
    })
    .then(function(json){
        // 
        personName = json.name;
        // console.log(personName);
        // declare a new function call here to display rows
    })
    .catch(function(err){
        console.log(err);
    })

    console.log(personName);
    return personName;

}
function displayData(json) {

    let newRow = "";
    for(arr of json){
        // console.log(arr.people);
        if(arr.people.length > 1){
            // console.log("length",arr.people.length);
            
            console.log(getPeople(arr.people[0]));
            //call function rows somewhere here
        }
        newRow = document.createElement('tr');
        let newCol = document.createElement('td');
        let newCol2 = document.createElement('td');
        newCol.innerHTML = arr.title;
        newCol2.innerHTML = arr.people;
        table.appendChild(newRow);
        newRow.appendChild(newCol);
        newRow.appendChild(newCol2);
    }
    
}