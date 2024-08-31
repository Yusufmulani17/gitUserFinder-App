// Init Github
const github = new Github;
// Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

// Storage Controller
const StorageCtrl = (function(){
  // Public methods
  return {
    storeItem: function(item){
      let items;
      // Check if any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        // Push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      items.splice(0, id);
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();

//Debounce function which helps to avoid unnecessary API calls
const debfn = (func,delay) => { 
  let timeout;
  return () => {
    let  apiCallCountDom  =  document.getElementById('show-api-call-count');
    let  apiCallCount  =  apiCallCountDom.innerHTML  ||  0;
    apiCallCount  =  parseInt(apiCallCount) +  1;
    // Updates the number of times makeAPICall method is called
    apiCallCountDom.innerHTML = apiCallCount; 

    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

// Api calling function
const apiCallFn = () => {
  let userText = document.getElementById("searchUser").value;
  if(userText !== ''){
    // Make http call
    github.getUser(userText)
     .then(data => {
       if(data.profile.message === 'Not Found') {
         // Show alert
         ui.showAlert('User not found', 'alert red darken-2 p-1');
       } else {
         // Show profile
         ui.showProfile(data.profile);
         ui.showRepos(data.repos);
         ui.hideUndefinedElements();

         // Storing in local storage
         StorageCtrl.storeItem(data);
         //StorageCtrl.storeItem(data.repos);
       }
     });
   
     // Display Api call count
     document.querySelector('#apiCallCount').classList.remove("hide");
     
     // Show Counts for API Calls
    let  debounceDom  =  document.getElementById('debounce-count');
    let  debounceCount  =  debounceDom.innerHTML  ||  0;
    debounceDom.innerHTML  =  parseInt(debounceCount) +  1;     
   } else {
     // Clear profile
     ui.clearProfile();

     //Reset API calling count and letter typed count to zero
     document.getElementById('show-api-call-count').innerHTML = 0;
     document.getElementById('debounce-count').innerHTML = 0;
   }
}


// Search input event listener
searchUser.addEventListener('keyup', debfn(apiCallFn, 500)); 

document.addEventListener("DOMContentLoaded", () => {
  const storeData = StorageCtrl.getItemsFromStorage();
  
  // Show profile
  if(storeData.length > 0){
    document.querySelector('#searchUser').value = storeData[storeData.length-1].profile.login;
    ui.showProfile(storeData[storeData.length-1].profile);
    ui.showRepos(storeData[storeData.length-1].repos);
    ui.hideUndefinedElements();
    StorageCtrl.deleteItemFromStorage(storeData.length-1);
  }

});