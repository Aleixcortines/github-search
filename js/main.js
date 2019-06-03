
//Event listener using arrow function
document.getElementById("btnfetch").addEventListener("click", evt => fetchCall(evt));
    
//call through fetch to API of Github
const fetchCall = () => {

    let userName = document.getElementById("inputBox").value;
    const urlUsers = `https://api.github.com/users/${userName}`;
    
    fetch(urlUsers)
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            //In case of a user not found
            if (jsonData.message) {

                //remove all the attributes
                cleanUserInfo();
                cleanRepositories();
                //display the error attributes
                document.getElementById("repositoriesTitle").style.borderBottom = "none";
                document.getElementById("error").classList.add("erroruser");
                document.getElementById("error").innerHTML = "The user does not exist";

                //if not, go to the functions to display the data user
            } else {
               
                document.getElementById("error").innerHTML = "";
                document.getElementById("error").classList.remove("erroruser");
        
                //call a function to show the data from the user
                showUserInfo(jsonData);
                //call a other fetch to get the repository data from the user
                showUserRepo(userName);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

//function to show the basic user data (picture profile, name, fullname and bio)
const showUserInfo = (jsonData) => {

    document.getElementById("gene-info").style.display = "block";
    const { avatar_url, login, name, bio } = jsonData
    document.getElementById("picAvatar").src = avatar_url;
    document.getElementById("username").innerHTML = `@${login}`;
    document.getElementById("fullname").innerHTML = name;
    document.getElementById("bio").innerHTML = bio;
}
//function to call the repository info from the user
const showUserRepo = (userName) => {

    const urlRepository = `https://api.github.com/users/${userName}/repos`;

    fetch(urlRepository)
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            //In case of doesn't exist repositories
            if (jsonData == 0) {
                cleanRepositories();
                //display the error attributes
                document.getElementById("repositoriesTitle").style.borderBottom = "none";
                document.getElementById("error").classList.add("erroruser");
                document.getElementById("error").innerHTML = "The user does not have repositories";
                //If not, call the function to show the repository info
            } else {

                showRepoInfo(jsonData);
            }

        })
        .catch(error => {
            console.log(error);
        });

}
//this function is to show the info about the user repository (name,stars and forks)
const showRepoInfo = (jsonData) => {

    let reposArray = jsonData;

    cleanRepositories();

    document.getElementById("repositoriesTitle").innerHTML = "Repositories";

    for (let i = 0; i < reposArray.length; i++) {

        const { name, stargazers_count, forks_count } = reposArray[i];
        document.getElementById("reponame").innerHTML += `<p>${name}</p>`;
        document.getElementById("starimg").innerHTML += "<img src='./img/gitstar.png'>"
        document.getElementById("starsnumber").innerHTML += `<p>${stargazers_count}</p>`;
        document.getElementById("forkimg").innerHTML += "<img src='./img/gitbranch.png'>"
        document.getElementById("forksnumber").innerHTML += `<p>${forks_count}</p>`;

    }

}
//function to clean the user information
const cleanUserInfo = () => {

    
    document.getElementById("fullname").innerHTML = '';
    document.getElementById("username").innerHTML = '';
    document.getElementById("bio").innerHTML = '';
    document.getElementById("picAvatar").removeAttribute("src");

}
//function to clean the user repositories 
const cleanRepositories = () => {

    document.getElementById("repositoriesTitle").innerHTML = '';
    document.getElementById("reponame").innerHTML = '';
    document.getElementById("starimg").innerHTML = '';
    document.getElementById("starsnumber").innerHTML = '';
    document.getElementById("forkimg").innerHTML = '';
    document.getElementById("forksnumber").innerHTML = '';

}


