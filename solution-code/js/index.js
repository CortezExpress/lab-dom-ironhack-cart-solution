// Function to delete products
function deleteItem(e){
  
  // We isolate the product row by pulling the "currentTarget" of the
  // click event and then working backwards to the parent of its parent,
  // div with a class of "itemRow"
  var selectedRow = e.currentTarget.parentNode.parentNode;

  // We then work one level farther back by pulling the parent of the
  // div with a class of "itemRow", section element with id "items-list"
  var itemList = selectedRow.parentNode;

  // We then remove the "selectedRow" div element from the item list
  // using "removeChild"
  itemList.removeChild(selectedRow);
}

function getPriceByProduct(itemNode){

  // Select elements that we would like to work with by tag ("div").
  // Note that this returns an HTML collection
  var itemInfo = itemNode.getElementsByTagName('div');
  
  // Select elements that we would like to work with by tag ("div").
  // Note that this returns an HTML collection, so we will access the
  // span element by index using [0]
  var itemUnityPrice = itemInfo[1].getElementsByTagName('span')[0];

  // We use "innerHTML" to pull the content from the span. We then use 
  // "substr(1)" to pull everything from the string following the "$"
  // character, which will have an index number of 0
  var unityPrice = itemUnityPrice.innerHTML.substr(1);

  // We select the third div from the "itemInfo" HTMLCollection by using
  // [2]. We then select the input containing the information and pull the
  // first item in order to pull the value.
  var itemQuantity = itemInfo[2].getElementsByClassName('quantity')[0].value;

  // Finally, we run both strings through parseInt to pull the integers out
  // that we would like to work with. We multiply both amounts by one another
  // to get the final price for each product.
  return parseInt(unityPrice) * parseInt(itemQuantity);
}

// Function to update the total price of the product in the DOM
// We will pass the price as well as the index of a given product.
function updatePriceByProduct(productPrice, index){

  // We will target the div area that we want to fill with the new price by
  // targeting its class, "item-subtotal". We will use a flexible "index"
  // so that we will be able to update each product based upon its location
  // in the list of items.
  var actualPrice = document.getElementsByClassName('item-subtotal')[index];

  // Finally, we will replace the content (initially "$0") with the new
  // "productPrice" generated in the "getPriceByProduct" function.
  actualPrice.innerHTML = "$" + productPrice;
}

// Function to display total prices for all items based upon their respective
// quantities.
function getTotalPrice() {
  
  // We define "totalPrice" because it will be necessary for us to have an initial
  // amount to sum from.
  var totalPrice = 0;

  // We target all rows of items by using the "item" class. Remember that this
  // will return an HTMLCollection.
  var items = document.getElementsByClassName('item');

  // We iterate over all items in the collection using a "for" loop.
  for(var i = 0; i < items.length ; i++){

    // We run each item through the "getPriceByProduct" on the basis of its
    // index number.
    var priceByProduct = getPriceByProduct(items[i]);
 
    // We then use "updatePriceByProduct" to fill in the total prices for each item.
    updatePriceByProduct(priceByProduct, i);

    // We calculate the "totalPrice" by adding the price of an item during each
    // separate iteration
    totalPrice += priceByProduct;
  }

  // We then update the "total price" span area of the page by targeting the
  // id "total-price." 
  var actualTotalPrice = document.getElementById('total-price');

  // We replace the content within this span tag with the "totalPrice" of all items
  // prepended by a "$" character.
  actualTotalPrice.innerHTML = "$" + totalPrice;
}

// All necessary code to create a new product as we wish.

    function createQuantityInput(){

      // First, we define what element we would like to create.
      var inputNode = document.createElement('input');

      // Then, we associate the needed class "quantity" with that element
      inputNode.className = "quantity";

      // We set an initial value of "0" for quantity, meaning that none of
      // those products are initially in the cart
      inputNode.value = 0;

      // We return the fully-generated element to be used in "createNewItemRow"
      return inputNode;
    }

    function createDeleteButton(){
      
      // First, we define what element we would like to create.
      var div = document.createElement('div');

      // Then, we associate the needed class "quantity" with that element
      div.className = "item-delete col-xs-3";

      // Next, we create the delete button to be included in this element
      var buttonNode = document.createElement('button');

      // We assign a class, inner content, and an "onclick" behavior to the item,
      // referring back to the "deleteItem" function that we defined earlier
      buttonNode.className = "btn btn-delete";

      // We fill the button with content
      buttonNode.innerHTML = "Delete";

      // We assign the "onclick" behavior to the function that we defined earlier,
      // "deleteItem"
      buttonNode.onclick = deleteItem;

      // Finally, we connect the delete button to its container.
      div.appendChild(buttonNode);

      // We return the fully-generated HTML element to be used in "createNewItemRow"
      return div;
    }

    function createQuantityNode(){

      // First, we define what element we would like to create.
      var element = document.createElement('div');

      // Then, we associate the necessary class.
      element.className = "item-qty col-xs-3";

      // Next, we generate the label for the quantity input 
      var label = document.createElement('label');

      // We then place content describing this input inside
      label.innerHTML = "QTY";

      // We then use the "createQuantityInput" function defined earlier
      // to generate the input portion of the div element. Notice how
      // we're abstracting specific tasks into other functions.
      var input = createQuantityInput();

      // We then attach the generated label and input to the parent element
      element.appendChild(label);
      element.appendChild(input);

      // We return the fully-generated HTML element to be used in "createNewItemRow"
      return element;
    }

    // Function to create the individual property divs for each item
    function createItemNode(dataType, itemData){
      
      // "itemData" can be the name of the item or it's price,
      // which is defaulted to "$0.00" if not supplied.
      itemData = itemData || "$0.00";

      // We then create a div element in which to store the product
      // node
      var element = document.createElement('div');

      // For each item node, we will create a span element to contain
      // the respective information about that node
      var span = document.createElement('span');

      // Here, we use "createTextNode" to generate content that will be
      // unique to each item.
      var textNode = document.createTextNode(itemData);
      
      // We then add the generated content within the span for each generated
      // item
      span.appendChild(textNode);

      // We then append the generated span element to the parent div element
      element.appendChild(span);

      // We then dynamically generate the class for each item node based
      // upon its data type.
      element.className = "item-" + dataType + " col-xs-2";

      // We return the fully-generated product node to be used in "createNewItemRow"
      return element;
    }

    // The function to generate a full item row
    function createNewItemRow(itemName, itemUnitPrice){
      
      // We create the parent div that will contain all the product nodes
      // and assign the class "item row" to it
      var itemRow = document.createElement('div');
      itemRow.className = "item row";

      // Here, we use all of the functions that we have defined earlier,
      // each of which handles one subtask for generating a parent product 
      // node. Notice that this makes the function far easier to read since
      // we're abstracting sub-tasks to other functions.
      var nameNode = createItemNode("name", itemName);
      var unitPriceNode = createItemNode("price", itemUnitPrice);
      var quantityNode = createQuantityNode();
      var productPrice = createItemNode("subtotal");
      var button = createDeleteButton();

      // Finally, we append all the generated product nodes to the itemRow
      itemRow.appendChild(nameNode);
      itemRow.appendChild(unitPriceNode);
      itemRow.appendChild(quantityNode);
      itemRow.appendChild(productPrice);
      itemRow.appendChild(button);

      // We return the fully-generated item row
      return itemRow;
    }

    // The function to place a newly created product row in its appropriate
    // place.
    function createNewItem(){

      // We select the section containing all items generated using the class
      // "items-list"
      var itemsList = document.getElementById('items-list');

      // Here, we generate an HTMLCollection that consists of all item rows.
      // We then pull the length of the list.
      var itemRowsLength = itemsList.getElementsByClassName('item').length;

      // We dynamically determine the last item row by subtracting one from the
      // total length of items, yielding us the last item row.
      var lastItemRow = itemsList.getElementsByClassName('item')[itemRowsLength-1];

      // We pull the value from the 'new-item-name' input.
      var itemName = document.getElementById('new-item-name').value;

      // We pull the value from the 'new-item-unit-price' input.
      var itemUnitPrice = document.getElementById('new-item-unit-price').value;

      // We use "createNewItemRow" to generate a full product row based on
      // the name and price specified
      var itemRow = createNewItemRow(itemName, itemUnitPrice);

      // Finally, we append the fully generated item row to the last place
      // in the vertical list of items.
      itemsList.insertBefore(itemRow, lastItemRow);
    }

//

// Code initially included to associate buttons with their respective DOM functions
window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteItem;
  }
};
