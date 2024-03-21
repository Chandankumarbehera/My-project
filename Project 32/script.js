let main =document.getElementById("main");
function recipes(){
    fetch("https://dummyjson.com/recipes")
    .then(res=>res.json())
    .then(allrecipe=>{
        console.log(allrecipe.recipes)
        allrecipe.recipes.map(recipe=>{
            console.log(recipe.name);
            let div=document.createElement("div")
                div.innerHTML=
                `<div class="card">
                <img src="${recipe.image}" height="100" width="200" class="">
                    <div class="text-center card-body small" >${recipe.name}</div>
                        <div  text-center">
                    </div>
                </div>`
                main.appendChild(div)
        });

    })
}
recipes()