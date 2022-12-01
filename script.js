import { products } from "./products.js";

var productCategoriesDiv = document.querySelector('.product-categories');
var inputRange = document.querySelector('input[name=priceRange]');
var rangePrice = document.querySelector('.range-price');
var productsContent = document.querySelector('.products-list__content');

// Price Range Section
inputRange.addEventListener('change',function(event){
    var rangevalue = this.value;
    rangePrice.innerHTML = rangevalue;
    var filterProducts = products.filter(function(eachProduct){
        return eachProduct.price <= rangevalue;
    });
    loadProducts(filterProducts);
});
window.addEventListener('load', () => {
    rangePrice.innerHTML = inputRange.value;
}, false);

// Category Section
function popupCategories(data){
    var uniqueCat = [];
    data.map (function(eachCat){
        if(!uniqueCat.includes(eachCat.cat)){
            uniqueCat.push(eachCat.cat); 
        }
    });
    var eachCatEle ='<div class="product-categories__each" data-cat="all">All</div>';
    uniqueCat.forEach(function(eachUniCat){
        eachCatEle += `<div class="product-categories__each" data-cat="${eachUniCat}">${eachUniCat}</div>`;
    });
    productCategoriesDiv.innerHTML = eachCatEle;
}
popupCategories(products);

var allCatFilter = document.querySelectorAll('.product-categories__each');
allCatFilter.forEach(function(eachCatFilter){
    var categoryValue = "";
    eachCatFilter.addEventListener('click',function(e){
        categoryValue = this.dataset.cat;
        var filterProducts = products.filter(function(eachProduct){
            return eachProduct.cat == categoryValue;
        });
        categoryValue == "all" ? loadProducts(products) : loadProducts(filterProducts);
    });
});

// Search Section
var searchInput = document.querySelector('input[name=search]');
searchInput.addEventListener('keyup',function(){
    var searchTerm = this.value.toLowerCase();
    var filterProducts = products.filter(function(eachProduct){
        return eachProduct.name.toLowerCase().indexOf(searchTerm)>-1;
    });
    searchTerm == "" ? loadProducts(products) : loadProducts(filterProducts);
});

// Products Section
function setProduct(eachProduct){
    var eachProductContent = `
    <div class="products-list__each" data-cat="${eachProduct.cat}">
        <div class="products-list__each__inner">
            <div class="products-list__each__image">
                <img src="${eachProduct.img}" alt="${eachProduct.name}" width="200">
            </div>
            <div class="products-list__each__tiitle">
                ${eachProduct.name}
            </div>
            <div class="products-list__each__price">
                <span>$</span>${eachProduct.price} 
            </div>
        </div>
    </div>
    `;
    return eachProductContent;
}

function loadProducts(productsList){
    productsContent.innerHTML = "";
    var eachProductHTML = "";
    productsList.forEach(function(eachProd){
        eachProductHTML += setProduct(eachProd);
    });
    productsContent.innerHTML = eachProductHTML;
}
loadProducts(products);
