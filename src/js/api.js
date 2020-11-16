// url = url.replace(/^http:\/\//i, 'https://');
const API_TOKEN = '301559f95b464ffb9aafa8290baaf6a6';
let base_url = "https://api.football-data.org/v2/competitions/2001/";
let main_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    document.getElementById("preloader").style.display = 'none';
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
  document.getElementById("preloader").style.display = 'none';
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//konversi waktu
function convertDate(dateString) {
  var date = new Date(dateString);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "December"
  ];

  let day = String(date.getDate()).padStart(2, '0');
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();

  let result = day + " " + month + " " + year;

  return result
}

function back() {
  window.history.back();
}

// Blok kode untuk melakukan request data json Matches pada Football-data
function getMatches() {
  if ("caches" in window) {
    caches.match(base_url + "matches?status=SCHEDULED", {
        method: 'GET',
        headers: {
          'X-Auth-Token': API_TOKEN,
        },
      })
      .then(response => {
        if (response) {
          response.json().then(dataMatch => {
            let matchesHTML = "";
            dataMatch.matches.forEach(match => {
              matchesHTML += `
            <div class="card mt mb">
            <div class="card-content">
              <div class="card-title">
                <h5 class="center-align pt mt">${convertDate(new Date(match.utcDate).toLocaleDateString())}</h5>
              </div>
                <table class="container centered highlight responsive-table">
                <caption><h6><strong>Group : </strong></h6> ${match.group}</caption>
                  <thead>
                    <tr>
                      <th>Home</th>
                      <th></th>
                      <th>Away</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${match.homeTeam.name}</td>
                      <td>VS</td>
                      <td>${match.awayTeam.name}</td>
                    </tr>
                  </tbody>           
                </table>
              </div>
            </div>
              `;
            });
            document.getElementById("preloader").style.display = 'none';
            // sisipkan komponen card ke dalam konten ber id match
            document.getElementById('match').innerHTML = matchesHTML;
          });
        }
      });
  }

  fetch(base_url + "matches?status=SCHEDULED", {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    })
    .then(status)
    .then(json)
    .then(dataMatch => {

      let matchesHTML = "";
      dataMatch.matches.forEach(match => {
        matchesHTML += `
            <div class="card mt mb">
            <div class="card-content">
              <div class="card-title">
                <h5 class="center-align pt mt">${convertDate(new Date(match.utcDate).toLocaleDateString())}</h5>
              </div>
                <table class="container centered highlight responsive-table">
                <caption><h6><strong>Group : </strong></h6> ${match.group}</caption>
                  <thead>
                    <tr>
                      <th>Home</th>
                      <th></th>
                      <th>Away</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${match.homeTeam.name}</td>
                      <td>VS</td>
                      <td>${match.awayTeam.name}</td>
                    </tr>
                  </tbody>           
                </table>
              </div>
            </div>
        `;
      });
      document.getElementById("match").innerHTML = matchesHTML;
    })
    .catch(error);
}

// Blok kode untuk melakukan request data json Teams pada Football-data
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "teams", {
        method: 'GET',
        headers: {
          'X-Auth-Token': API_TOKEN,
        },
      })
      .then(response => {
        if (response) {
          response.json().then(data => {
            let teamsHTML = "";
            data.teams.forEach(team => {
              let url = team.crestUrl;
              teamsHTML += `
                      <div class="col s12">
                        <div class="card">
                        <a href="./clubs.html?id=${team.id}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${url}" alt="Team Logo ${team.shortName}">
                          </div>
                        </a>
                          <div class="card-content">
                            <h6>${team.name}</h6>
                            <p>Adress : ${team.address}</p>
                            <p>Phone : ${team.phone}</p>
                          </div>
                        </div>
                      </div>
              `;
            });
            document.getElementById("preloader").style.display = 'none';
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("teams").innerHTML = teamsHTML;
          });
        }
      });
  }

  fetch(base_url + "teams", {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    })
    .then(status)
    .then(json)
    .then(data => {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = "";
      data.teams.forEach(team => {
        let url = team.crestUrl;
        teamsHTML += `
                      <div class="col s12">
                        <div class="card">
                        <a href="./clubs.html?id=${team.id}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${url}" alt="Team Logo ${team.shortName}">
                          </div>
                        </a>
                          <div class="card-content">
                            <h6>${team.name}</h6>
                            <p>Adress : ${team.address}</p>
                            <p>Phone : ${team.phone}</p>
                          </div>
                        </div>
                      </div>
              `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

// Blok kode untuk melihat detail team
function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(main_url + "teams/" + idParam, {
          method: 'GET',
          // mode: 'no-cors',
          headers: {
            'X-Auth-Token': API_TOKEN,
          },
        })
        .then(response => {
          if (response) {
            response.json().then(data => {
              let elmPlayers = '';
              data.squad.forEach(player => {
                elmPlayers += `
              <tr>
              <div class="col s12">
                <div class="card" >
                    <td class="center-align">${player.name}</td>
                    <td class="center-align">${player.position}</td>
                    <td class="center-align">${player.nationality}</td>
                </div>
              </div>
              </tr>
            `;
              })
              var teamHTML = `
                      <div class="col s12">
                        <div class="card">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img width="300px" height="300px" src="${data.crestUrl}" alt="Team Logo ${data.shortName}">
                          </div>
                          <div class="card-content">
                            <h6>${data.name}</h6>
                            <p>Adress : ${data.address}</p>
                            <p>Phone : ${data.phone}</p>
                            <p>Website : ${data.website}</p>
                            <p>Email : ${data.email}</p>
                            <p>Found : ${data.founded}</p>
                            <p>CLub colors : ${data.clubColors}</p>
                          </div>
                        </div>
                      </div>
          
          <div class="col s12">
            <div class="card" >
              <div class="card-content">
                <span class="card-title">Player</span>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center-align">Name</th>
                            <th class="center-align">Position</th>
                            <th class="center-align">Nationality</th>
                        </tr>
                    </thead>
                    <tbody id="body-content">` + elmPlayers + `</tbody>
                </table>
              </div>
            </div>
          </div>
          `;
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById('preloader').style.display = 'none';
              document.getElementById("body-content").innerHTML = teamHTML;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
            });
          }
        });
    }


    fetch(main_url + "teams/" + idParam, {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          'X-Auth-Token': API_TOKEN,
        },
      })
      .then(status)
      .then(json)
      .then(data => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        //Menyusun komponen card artikel secara dinamis
        let elmPlayers = '';
        data.squad.forEach(player => {
          elmPlayers += `
              <tr>
              <div class="col s12">
                <div class="card" >
                    <td class="center-align">${player.name}</td>
                    <td class="center-align">${player.position}</td>
                    <td class="center-align">${player.nationality}</td>
                </div>
              </div>
              </tr>
            `;
        })
        let teamHTML = `
                      <div class="col s12">
                        <div class="card">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img width="300px" height="300px" src="${data.crestUrl}" alt="Team Logo ${data.shortName}">
                          </div>
                          <div class="card-content">
                            <h6>${data.name}</h6>
                            <p>Adress : ${data.address}</p>
                            <p>Phone : ${data.phone}</p>
                            <p>Website : ${data.website}</p>
                            <p>Email : ${data.email}</p>
                            <p>Found : ${data.founded}</p>
                            <p>CLub colors : ${data.clubColors}</p>
                          </div>
                        </div>
                      </div>

          <div class="col s12">
            <div class="card" >
              <div class="card-content">
                <span class="card-title">Player</span>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center-align">Name</th>
                            <th class="center-align">Position</th>
                            <th class="center-align">Nationality</th>
                        </tr>
                    </thead>
                    <tbody id="body-content">` + elmPlayers + `</tbody>
                </table>
              </div>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  });
}

// Blok kode untuk menyimpan team
function getSavedTeams() {
  getAll().then(dbteams => {
    console.log(dbteams);
    //Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    dbteams.forEach(data => {
      teamsHTML += `
                      <div class="col s12">
                        <div class="card">
                        <a href="./clubs.html?id=${data.id}&saved=true">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img width="300px" height="300px" src="${data.crestUrl}" alt="Team Logo ${data.shortName}">
                          </div>
                        </a>
                          <div class="card-content">
                            <h6>${data.name}</h6>
                            <p>Adress : ${data.address}</p>
                            <p>Phone : ${data.phone}</p>
                          </div>
                        </div>
                      </div>
                `;
    });
    document.getElementById("preloader").style.display = 'none';
    //Sisipkan komponen card ke dalam elemen dengan id# body - content
    document.getElementById("body-content").innerHTML = teamsHTML;
      if (dbteams.length === 0){
        document.getElementById("body-content").innerHTML = "<p>Team has not saved yet.</p>";
      }
  });
}

// Blok kode untuk melihat detail team yang telah disimpan
function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (dbteam) {
    let elmPlayers = '';
    dbteam.squad.forEach(player => {
      elmPlayers += `
              <tr>
              <div class="col s12">
                <div class="card" >
                    <td class="center-align">${player.name}</td>
                    <td class="center-align">${player.position}</td>
                    <td class="center-align">${player.nationality}</td>
                </div>
              </div>
              </tr>
            `;
    })
    var teamHTML = `
                        <div class="col s12">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img width="300px" height="300px"  src="${dbteam.crestUrl}" alt="Team Logo ${dbteam.shortName}">
                            </div>
                            <div class="card-content">
                              <h6>${dbteam.name}</h6>
                              <p>Adress : ${dbteam.address}</p>
                              <p>Phone : ${dbteam.phone}</p>
                              <p>Website : ${dbteam.website}</p>
                              <p>Email : ${dbteam.email}</p>
                              <p>Found : ${dbteam.founded}</p>
                              <p>CLub colors : ${dbteam.clubColors}</p>
                            </div>
                          </div>
                        </div>

          <div class="col s12">
            <div class="card" >
              <div class="card-content">
                <span class="card-title">Player</span>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center-align">Name</th>
                            <th class="center-align">Position</th>
                            <th class="center-align">Nationality</th>
                        </tr>
                    </thead>
                    <tbody id="body-content">` + elmPlayers + `</tbody>
                </table>
              </div>
            </div>
          </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById('preloader').style.display = 'none';
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

// Blok kode untuk melakukan request data json Standings pada Football-data
function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "standings?standingType=TOTAL", {
        method: 'GET',
        headers: {
          'X-Auth-Token': API_TOKEN,
        },
      })
      .then(response => {
        if (response) {
          response.json().then(data => {
            let standingsHTML = "";
            data.standings.forEach(standings => {
            let elmStandings = "";
            standings.table.forEach(dataStandings => {
              let url = dataStandings.team.crestUrl;
              elmStandings += `
                <tr>
                <div class="card" >
                    <td class="center-align">${dataStandings.position}</td>
                    <td class="center-align"><img src="${url.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge ${dataStandings.team.shortName}"/></td>
                    <td class="center-align">${dataStandings.team.name}</td>
                    <td class="center-align">${dataStandings.playedGames}</td>
                    <td class="center-align">${dataStandings.won}</td>
                    <td class="center-align">${dataStandings.draw}</td>
                    <td class="center-align">${dataStandings.lost}</td>
                    <td class="center-align">${dataStandings.points}</td>
                    <td class="center-align">${dataStandings.goalsFor}</td>
                    <td class="center-align">${dataStandings.goalsAgainst}</td>
                    <td class="center-align">${dataStandings.goalDifference}</td>
                </div>
                </tr>
                `;
              })
              standingsHTML += `
              <div class="card" >
                <div class="card-content">
                span class="card-title">${standings.group}</span>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center-align">Rank</th>
                            <th></th>
                            <th class="center-align">Clubs</th>
                            <th class="center-align">M</th>
                            <th class="center-align">W</th>
                            <th class="center-align">D</th>
                            <th class="center-align">L</th>
                            <th class="center-align">Point</th>
                            <th class="center-align">GM</th>
                            <th class="center-align">GA</th>
                            <th class="center-align">+/-</th>
                        </tr>
                    </thead>
                    <tbody id="standings">` + elmStandings + `</tbody>
                </table>
                </div>
                </div>
              `;
            });
            document.getElementById("preloader").style.display = 'none';
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("standings").innerHTML = standingsHTML;
          });
        }
      });
  }

  fetch(base_url + "standings?standingType=TOTAL", {
      method: 'GET',
      headers: {
        'X-Auth-Token': API_TOKEN,
      },
    })
    .then(status)
    .then(json)
    .then(data => {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let standingsHTML = "";
      data.standings.forEach(standings => {
      let elmStandings = "";
      standings.table.forEach(dataStandings => {
        let url = dataStandings.team.crestUrl;
        elmStandings += `
              <tr>
                <div class="card">
                <td class="center-align">${dataStandings.position}</td>
                    <td class="center-align"><img src="${url.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge ${dataStandings.team.shortName}"/></td>
                    <td class="center-align">${dataStandings.team.name}</td>
                    <td class="center-align">${dataStandings.playedGames}</td>
                    <td class="center-align">${dataStandings.won}</td>
                    <td class="center-align">${dataStandings.draw}</td>
                    <td class="center-align">${dataStandings.lost}</td>
                    <td class="center-align">${dataStandings.points}</td>
                    <td class="center-align">${dataStandings.goalsFor}</td>
                    <td class="center-align">${dataStandings.goalsAgainst}</td>
                    <td class="center-align">${dataStandings.goalDifference}</td>
                    </div>
                </tr>
                `;
      })

        standingsHTML += `
              <div class="card" >
                <div class="card-content">
                <span class="card-title">${standings.group}</span>               
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th class="center-align">Rank</th>
                            <th></th>
                            <th class="center-align">Clubs</th>
                            <th class="center-align">M</th>
                            <th class="center-align">W</th>
                            <th class="center-align">D</th>
                            <th class="center-align">L</th>
                            <th class="center-align">Point</th>
                            <th class="center-align">GM</th>
                            <th class="center-align">GA</th>
                            <th class="center-align">+/-</th>
                        </tr>
                    </thead>
                    <tbody id="standings">` + elmStandings + `</tbody>
                </table>
                </div>
                </div>
              `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
    })
    .catch(error);
}