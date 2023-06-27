const form = document.getElementById('github-form');
const input = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');
// created variables to help manipulate DOM 


//   below I added eventListener to the form for the submit event
form.addEventListener('submit', function(event) {
  event.preventDefault(); 
// Prevents the default form submission

  const username = input.value;

  // Clear previous search results
  userList.innerHTML = '';
  reposList.innerHTML = '';

  // Perform the GitHub API request to fetch user's information
  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Did not find the username');
      }
    })
    .then(data => {
      // Create a link to the user's GitHub account
      const link = document.createElement('a');
      link.href = data.html_url;
      link.target = '_blank';
      link.textContent = `Username: ${data.login}`;
      userList.appendChild(link);
    })
    .catch(error => {
      // Display error message
      const li = document.createElement('li');
      li.textContent = error.message;
      userList.appendChild(li);
    });
});