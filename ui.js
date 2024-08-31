class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }

  // Display profile in UI
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card">
    <div class="card-content">
        <div class="row">
          <div class="col s12 m3">
            <div class="card-image">
              <img src="${user.avatar_url}">
            </div>
            <div class="mt-1">
            <a href="${user.html_url}" target="_blank" class="btn btn-large waves-effect waves-light blue">View Profile</a>
            </div>
          </div>
          <div class="col s12 m9 mt-pt6">
            <div class="left">
              <span class="badge light-blue darken-3 white-text hide-on-small-only">Public Repos: ${user.public_repos}</span>
              <span class="badge blue-grey darken-1 white-text hide-on-small-only">Public Gists: ${user.public_gists}</span>
              <span class="badge green darken-1 white-text hide-on-small-only">Followers: ${user.followers}</span>
              <span class="badge cyan darken-1 white-text hide-on-small-only">Following: ${user.following}</span>
            </div>
            <br/><br/>
            <div>
              <ul class="collection">
                <li class="collection-item">Company: ${user.company}</li>
                <li class="collection-item">Website/Blog: ${user.blog}</li>
                <li class="collection-item">Location: ${user.location}</li>
                <li class="collection-item">Member Since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3>Latest Repos</h3>
    <div id="repos"></div>
    `;
  }

  // Show user repos
  showRepos(repos) {
    let output = '';

    repos.forEach(function(repo) {
      output += `
      <div class="card">
      <div class="card-content">
          <div class="row">
            <div class="col s12 m4 l6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col s12 m8 l6">
            <span class="badge light-blue darken-1 white-text hide-on-small-only">Stars: ${repo.stargazers_count}</span>
            <span class="badge blue-grey darken-1 white-text hide-on-small-only">Watchers: ${repo.watchers_count}</span>
            <span class="badge green darken-1 white-text hide-on-small-only">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
      </div>
      `;
    });

    // Output repos
    document.getElementById('repos').innerHTML = output;
  }

  // Show alert message
  showAlert(message, className) {
    // Clear any remaining alerts
    this.clearAlert();
    // Create div
    const div  =  document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container =  document.querySelector('.searchContainer');
    // Get search box
    const search = document.querySelector('.search');
    // Insert alert
    container.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert){
      currentAlert.remove();
    }
  }
  
  // Hide elements with undefined content
  hideUndefinedElements() {
    const badgesElement = document.querySelectorAll('.badge');

    badgesElement.forEach(badEle => {
      (badEle.textContent.indexOf("undefined") > -1) ? badEle.classList.add("hide") : badEle.classList.remove("hide");
    });
   
  }

  // Clear profile
  clearProfile() {
    this.profile.innerHTML = '';
  }
}