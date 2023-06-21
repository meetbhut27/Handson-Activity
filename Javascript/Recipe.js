let recipeList = []

document.addEventListener('DOMContentLoaded', getRecipeList())

// for get all the recipe lists
function getRecipeList() {
    const request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:3000/recipe')
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            const data = JSON.parse(request.responseText);
            recipeList = data;

            const list = document.querySelector('ul');
            recipeList.forEach((recipe) => {
                list.innerHTML += `
                <li class='d-flex justify-content-around align-items-center w-25'>
                    <div class='h6 m-0'>${recipe.id}</div>
                    <div class='h6 m-0 text-primary-emphasis'>${recipe.name}</div>
                    <div class="btn-group" role="group">
                        <button id="viewButton" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#viewRecipeModel" onclick="viewRecipe(${recipe.id})">View</button>
                        <button id="editButton" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#editRecipeModal" onclick="editRecipe(${recipe.id})">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${recipe.id})">Delete</button>
                    </div> 
                </li>
                <hr class="border border-secondary border-1 w-25 my-1">`
            })
        }
    }
    request.send();
}

// for add new recipe
function addRecipe() {
    const recipeName = document.getElementById('name').value
    const recipeType = document.getElementById('type').value
    const recipeDesc = document.getElementById('description').value

    let recipe = {
        id: Date.now(),
        name: recipeName,
        type: recipeType,
        description: recipeDesc
    }

    const request = new XMLHttpRequest()
    request.open("POST", "http://localhost:3000/recipe",);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let response = JSON.parse(request.responseText);
        }
    };

    request.send(JSON.stringify(recipe));
}

// for view recipe
function viewRecipe(id) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/recipe/" + id);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let response = JSON.parse(request.responseText);
                let id = document.querySelector('.viewId')
                let name = document.querySelector('.viewName')
                let type = document.querySelector('.viewType')
                let desc = document.querySelector('.viewDesc')
                id.innerHTML = `${response.id}`
                name.innerHTML = `${response.name}`
                type.innerHTML = `${response.type}`
                desc.innerHTML = `${response.description}`
            } else {
                console.log("GET request failed");
            }
        }
    }
    request.send();
}

// For Edit Recipe
let updateRecipeId = 0;

function editRecipe(id) {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/recipe/" + id);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let response = JSON.parse(request.responseText);
                updateRecipeId = response.id 
                const name = document.querySelector('#editName')
                name.value = response.name
                const type = document.querySelector('#editType')
                type.value = response.type
                const description = document.querySelector('#editDescription')
                description.value = response.description
            } else {
                console.log("GET request failed");
            }
        }
    }
    request.send();
}

function updateRecipe(){
    const recipeName = document.getElementById('editName').value
    const recipeType = document.getElementById('editType').value
    const recipeDesc = document.getElementById('editDescription').value
    let recipe = {
        id: updateRecipeId,
        name: recipeName,
        type: recipeType,
        description: recipeDesc
    }
    let request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/recipe/"+ updateRecipeId);
    request.setRequestHeader("Content-Type", "application/json");
    
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        let response = JSON.parse(request.responseText);
      }
    };  
    request.send(JSON.stringify(recipe));
}

// for delete recipe 
function deleteRecipe(id) {
    let request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:3000/recipe/" + id);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                console.log("DELETE request successful");
            } else {
                console.log("DELETE request failed");
            }
        }
    };

    request.send();
}