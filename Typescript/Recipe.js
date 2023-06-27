var recipeList;
document.addEventListener('DOMContentLoaded', function () {
    getRecipeList();
});
// for get all the recipe lists
function getRecipeList() {
    fetch('http://localhost:3000/recipe')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        recipeList = data;
        var list = document.querySelector('ul');
        recipeList.forEach(function (recipe) {
            if (list) {
                list.innerHTML += "\n                    <li class='d-flex justify-content-around align-items-center w-25'>\n                        <div class='h6 m-0'>".concat(recipe.id, "</div>\n                        <div class='h6 m-0 text-primary-emphasis'>").concat(recipe.name, "</div>\n                        <div class=\"btn-group\" role=\"group\">\n                            <button id=\"viewButton\" class=\"btn btn-primary btn-sm\" data-bs-toggle=\"modal\" data-bs-target=\"#viewRecipeModel\" onclick=\"viewRecipe(").concat(recipe.id, ")\">View</button>\n                            <button id=\"editButton\" class=\"btn btn-secondary btn-sm\" data-bs-toggle=\"modal\" data-bs-target=\"#editRecipeModal\" onclick=\"editRecipe(").concat(recipe.id, ")\">Update</button>\n                            <button class=\"btn btn-danger btn-sm\" onclick=\"deleteRecipe(").concat(recipe.id, ")\">Delete</button>\n                        </div> \n                    </li>\n                    <hr class=\"border border-secondary border-1 w-25 my-1\">");
            }
        });
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
// for add new recipe
function addRecipe() {
    var recipeName = document.querySelector('#name');
    var recipeType = document.querySelector('#type');
    var recipeDesc = document.querySelector('#description');
    if (recipeName && recipeType && recipeDesc) {
        var recipe = {
            id: Date.now(),
            name: recipeName.value,
            type: recipeType.value,
            description: recipeDesc.value
        };
        fetch("http://localhost:3000/recipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(function (responseData) {
            console.log(responseData);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    }
}
// for view recipe
function viewRecipe(id) {
    fetch("http://localhost:3000/recipe/" + id)
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        var id = document.querySelector('.viewId');
        var name = document.querySelector('.viewName');
        var type = document.querySelector('.viewType');
        var desc = document.querySelector('.viewDesc');
        if (id && name && type && desc) {
            id.innerHTML = "".concat(data.id);
            name.innerHTML = "".concat(data.name);
            type.innerHTML = "".concat(data.type);
            desc.innerHTML = "".concat(data.description);
        }
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
// For Edit Recipe
var updateRecipeId = 0;
function editRecipe(id) {
    fetch("http://localhost:3000/recipe/" + id)
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        updateRecipeId = data.id;
        var name = document.querySelector('#editName');
        var type = document.querySelector('#editType');
        var description = document.querySelector('#editDescription');
        if (name && type && description) {
            name.value = data.name;
            type.value = data.type;
            description.value = data.description;
        }
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
function updateRecipe() {
    var recipeName = document.querySelector('#editName');
    var recipeType = document.querySelector('#editType');
    var recipeDesc = document.querySelector('#editDescription');
    console.log(recipeName, recipeType, recipeDesc);
    if (recipeName && recipeType && recipeDesc) {
        var recipe = {
            id: updateRecipeId,
            name: recipeName.value,
            type: recipeType.value,
            description: recipeDesc.value
        };
        fetch("http://localhost:3000/recipe/" + updateRecipeId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(function (responseData) {
            console.log(responseData);
        })
            .catch(function (error) {
            console.error('Error:', error);
        });
    }
}
// for delete recipe 
function deleteRecipe(id) {
    fetch("http://localhost:3000/recipe/" + id, {
        method: 'DELETE',
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Successfully deleted data');
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
