
(function(){const search = document.querySelector('#search');
const profile = document.querySelector('.profile');
const url = 'https://api.github.com/users';
const clientId = 'Iv1.ab7fcc12fc4ec134';
const clientSecret = 'cb11561dd925269110047861dfa1f1909e8a964a';
const count = 7;
const sort = 'created: asc'
    async function getUser(user){

        const profileResponse = await fetch(`${url}/${user}?clientId=${clientId}&clientSecret=${clientSecret}`)


        const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}&clientId=${clientId}&clientSecret=${clientSecret}`)

        const repos =  await reposResponse.json()
        const profile = await profileResponse.json();

        return   {profile, repos} ;
    }

    function showProfile(user){
       
       profile.innerHTML = `<div class="row mt-3">
        <div class="col-md-4">
            <div class="card" style='width: 18rem;'>
                <img src="${user.avatar_url}" alt="" class="card-img-top">
                <ul class="list-group list-group-flush">

                    <li class="list-group-item ">Repositórios:  <span class="bg bg-success ml-3 rounded">${user.public_repos}</span></li>
                    <li class="list-group-item ">Seguidores:  <span class="bg bg-primary rounded">${user.followers
                    }</span></li>
                    <li class="list-group-item ">Seguindo:  <span class="bg bg-info rounded">${user.following}</span></li>

                </ul>
                <div class="card-body rounded">
                    <a href="${user.html_url}" target="_blank" class="btn btn-warning btnblock">Ver Perfil</a>
                </div>

            </div>
        </div>
        <div class="col-md-8">
            <div class="repos"></div>
        </div>
    </div>
        `

    }

    function showRepos(repos){
        let output = '';

        repos.forEach(repo => {
            output += `<div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6"><a href="${repo.html_url}" target="_black">${repo.name}</a></div>
                <div class="cold-md-6">
                    <span class="bg bg-primary rounded ">Starts: ${repo.stargazers_count}</span>
                    <span class="bg bg-success rounded"> Watch: ${repo.watchers_count}</span>
                    <span class="bg bg-warning rounded"> Forks: ${repo.forks_count}</span>
                </div>
            </div>
        </div>`
        });

        document.querySelector('.repos').innerHTML =  output;
    }

    search.addEventListener('keyup', e =>{
        const user = e.target.value;

        if(user.length > 0){

        getUser(user).then(res => {
            showProfile(res.profile)
            showRepos(res.repos) 
        }
        )
        }
    })

})()