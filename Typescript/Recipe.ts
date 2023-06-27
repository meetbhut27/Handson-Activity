type Recipe = {
    id: number,
    name: string,
    type: string,
    description: string,
}

let recipeList: Recipe[]

document.addEventListener('DOMContentLoaded', () => {
    getRecipeList()
})

// for get all the recipe lists
function getRecipeList(): void {

    fetch('http://localhost:3000/recipe')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            recipeList=data
            const list: HTMLUListElement | null = document.querySelector('ul');
            recipeList.forEach((recipe: Recipe) => {
                if (list) {
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
                }
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// for add new recipe
function addRecipe(): void {

    const recipeName: HTMLInputElement | null = document.querySelector('#name');
    const recipeType: HTMLInputElement | null = document.querySelector('#type');
    const recipeDesc: HTMLInputElement | null = document.querySelector('#description');

    if (recipeName && recipeType && recipeDesc) {
        let recipe: Recipe = {
            id: Date.now(),
            name: recipeName.value,
            type: recipeType.value,
            description: recipeDesc.value
        }

        fetch("http://localhost:3000/recipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

// for view recipe
function viewRecipe(id: number): void {
    fetch("http://localhost:3000/recipe/" + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: Recipe) => {
            console.log(data);
            let id: HTMLSpanElement | null = document.querySelector('.viewId')

            let name: HTMLSpanElement | null = document.querySelector('.viewName')
            let type: HTMLSpanElement | null = document.querySelector('.viewType')
            let desc: HTMLSpanElement | null = document.querySelector('.viewDesc')
            if (id && name && type && desc) {
                id.innerHTML = `${data.id}`
                name.innerHTML = `${data.name}`
                type.innerHTML = `${data.type}`
                desc.innerHTML = `${data.description}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// For Edit Recipe
let updateRecipeId: number = 0;
function editRecipe(id:number): void {

    fetch("http://localhost:3000/recipe/" + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: Recipe) => {
            console.log(data);
            updateRecipeId = data.id
            const name: HTMLInputElement | null = document.querySelector('#editName')
            const type: HTMLInputElement | null = document.querySelector('#editType')
            const description: HTMLInputElement | null = document.querySelector('#editDescription')
            if (name && type && description) {
                name.value = data.name;
                type.value = data.type;
                description.value = data.description;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateRecipe(): void {

    const recipeName: HTMLInputElement | null = document.querySelector('#editName')
    const recipeType: HTMLInputElement | null = document.querySelector('#editType')
    const recipeDesc: HTMLInputElement | null = document.querySelector('#editDescription')

    console.log(recipeName, recipeType, recipeDesc)
    if (recipeName && recipeType && recipeDesc) {

        let recipe = {
            id: updateRecipeId,
            name: recipeName.value,
            type: recipeType.value,
            description: recipeDesc.value
        }

        fetch("http://localhost:3000/recipe/" + updateRecipeId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// for delete recipe 
function deleteRecipe(id: number): void {

    fetch("http://localhost:3000/recipe/" + id, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Successfully deleted data');
        })
        .catch(error => {
            console.error('Error:', error);
        });

}