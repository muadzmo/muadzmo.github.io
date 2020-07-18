const base_url = "https://api.football-data.org/v2/";
const header = {
  headers: {
    "X-Auth-Token": "b40c7816650a44638b508fc392f5dac6",
  },
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
const getClasement = () => {
  console.log('28');
  if ("caches" in window) {
    console.log('30');
    caches.match(base_url + "competitions/2021/standings", header).then((response) => {
      if (response) {
        response.json()
          .then((data) => {
            loadClasement(data.standings[0].table);
        });
      }
    });
  }
    console.log(45)
    fetch(base_url + "competitions/2021/standings", header)
    .then(status)
    .then(json)
    .then((data) => {
    loadClasement(data.standings[0].table);
    })
    .catch(error);

  }

const getTeamById = () => {
  console.log('teamid56');
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam, header).then((response)=> {
        if (response) {
          response.json().then((data) => {
            // .... kode lain disembunyikan agar lebih ringkas
            loadTeam(data);    
            resolve(data);        
          });
        }
      });
    }
    fetch(base_url + "teams/" + idParam, header)
      .then(status)
      .then(json)
      .then(function(data) {
        // ... kode lain disembunyikan agar lebih ringkas 
        loadTeam(data);
        resolve(data);
      });
  });
}

const getFavTeam = () => {
  console.log(getAll());
  getAll().
    then((data) => {
    if (data.length == 0) {
      console.log("no fav");
      let articlesHTML = `
        <div>
          <p>Your Favorite teams are empty</h4>
        </div>
      `;
      document.getElementById("favTeam").innerHTML = articlesHTML;
    } else {
      //loadSavedTeams(data);
      console.log('98')
      let articlesHTML = "";
      data.forEach((element) => {
        articlesHTML += `
        <div class="col s12 m6 l4">
          <div class="card">
            <div class="card-image">
              <a href="./team.html?id=${element.id}" id="see-detail" class="deep-purple-text darken-5">
                <img height="200" class="emblem" src="${element.crestUrl}" />
              </a>
            </div>
            <div class="description card-content">
              <h5 class="team-title">${element.name}</h5>
              <div class="sub">
                <h6>${element.founded}</h6>
              </div>
              <div class="sub team-venue">
                <h6>${element.venue}</h6>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("favTeam").innerHTML = articlesHTML;
    }
  getAll().catch(()=>{
      console.log('waduh')
    })
  });
}

const loadClasement = (data) => {
  let articlesHTML = "";
  console.log(data)
  data.forEach((teams) => {
    articlesHTML += `
      <tr>
        <td>${teams.position} <img src="${teams.team.crestUrl}" alt="" style="width:auto; height:20px;"> <a href="./team.html?id=${teams.team.id}">${teams.team.name}</a> </td>
        <td>${teams.playedGames}</td>
        <td>${teams.won}</td>
        <td>${teams.draw}</td>
        <td>${teams.lost}</td>
        <td>${teams.goalsFor}</td>
        <td>${teams.goalsAgainst}</td>
        <td>${teams.goalDifference}</td>
        <td>${teams.points}</td>
      </tr>
        `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("articles").innerHTML = articlesHTML;
}

const loadTeam = (data) => {
  var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${data.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${data.name}</span>
        <p>${data.name} is a professional football club adress in ${data.address}, ${data.area.name}, that competes in the ${data.activeCompetitions[0].name}.</p><br>
        <p>${data.shortName} was founded in ${data.founded}, and the club has played at ${data.venue}</p>

      </div>
    </div>
  `;
  
  document.getElementById("body-content").innerHTML = articleHTML;
  // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
}
