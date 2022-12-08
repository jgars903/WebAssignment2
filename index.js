// Chart JS documentation
// https://www.chartjs.org/docs/latest/
// https://www.chartjs.org/docs/latest/charts/radar.html

// URL and some variables to hold the API data
const url = "http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
var data;
var playlist = [];

// Disable the Artist and Genre and grayed it out.
document.getElementById('artist').disabled = true;
document.getElementById('genre').disabled = true;
document.getElementById('f2').style.color = "grey";
document.getElementById('f3').style.color = "grey";

// Disable search fields based on the user selection of the radio buttons
function disable() {
    if (document.getElementById("t").checked === true) {
        document.getElementById('title').disabled = false;
        document.getElementById('artist').disabled = true;
        document.getElementById('genre').disabled = true;
        document.getElementById('f1').style.color = "black";
        document.getElementById('f2').style.color = "grey";
        document.getElementById('f3').style.color = "grey";
    } else if (document.getElementById("ar").checked === true) {
        document.getElementById('artist').disabled = false;
        document.getElementById('title').disabled = true;
        document.getElementById('genre').disabled = true;
        document.getElementById('f2').style.color = "black";
        document.getElementById('f1').style.color = "grey";
        document.getElementById('f3').style.color = "grey";
    } else {
        document.getElementById('genre').disabled = false;
        document.getElementById('title').disabled = true;
        document.getElementById('artist').disabled = true;
        document.getElementById('f3').style.color = "black";
        document.getElementById('f2').style.color = "grey";
        document.getElementById('f1').style.color = "grey";
    }
}

// Call the API to get the song details
async function getapi(api_url) {
    // If there is no data then call the API
    if (JSON.parse(localStorage.getItem('songs') === null)) {
        const response = await fetch(url);
        data = await response.json();
        if (response) {
            loader();
        }
        localStorage.setItem('songs', JSON.stringify(data));
        console.log("Fetched data");
    } else {
        // If there is song data in the local storage then grab it from the local storage
        data = JSON.parse(localStorage.getItem('songs'));
        console.log("Local Storage data");
        loader();
    } sortTable('tit');
}

// Call the getapi function
getapi(url);

// Display the loader
function loader() {
    document.getElementById('loading').style.display = 'none';
}

// Set the radar chart display as non or flex
function radarChart(shown, hidden) {
    document.getElementById(shown).style.display = 'flex';
    document.getElementById(hidden).style.display = 'none';
    return false;
}

// Radar chart specifications
function page(r, artist, genre, year, duration, bpm, popularity, energy, danceability, liveness, valence, acousticness, speechiness, loudness) {
    // Minutes and seconds
    var minutes = Math.floor(duration / 60);
    var seconds = duration - minutes * 60;

    // Set the data for the 'info' tag as below
    document.getElementById('info').innerHTML = `${r}, ${artist}, ${genre}, ${year}, ${minutes}:${seconds}<br/><h3 class="data" id="analysis">Data Analytics:</h3> <div class="data" style="list-style-type:disc">Bpm: ${bpm}<br/>
      Energy: ${energy}<br/>
      Dancebility: ${danceability}<br/>
      Liveness: ${liveness}<br/>
      Valence: ${valence}<br/>
      Acousticness: ${acousticness}<br/>
      Speechiness: ${speechiness}<br/>
      Popularity: ${popularity}</div>`;
    var marksCanvas = document.getElementById("radarChart");

    // Factors and dataset for the radar chart
    var marksData = {
        labels: [
            "danceability",
            "energy",
            "valence",
            "speechiness",
            "loudness",
            "liveness"
        ],
        datasets: [
            {
                label: "Radar Chart",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: [
                    danceability,
                    energy,
                    valence,
                    speechiness,
                    loudness,
                    liveness
                ]
            }
        ]
    };

    // Create the chart
    var radarChart = new Chart(marksCanvas, {
        type: 'radar',
        data: marksData
    });
}


function frequent(arr1) {
    var mf = 1,
        m = 0,
        item;
    for (var i = 0; i < arr1.length; i++) {
        for (var j = i; j < arr1.length; j++) {
            if (arr1[i] == arr1[j]) 
                m++;
            
            if (mf < m) {
                mf = m;
                item = arr1[i];
            }
        }
        m = 0;
    }
    return item;
}

// Display the radar chart with all the information
function show(data, id) {
    let rec = '',
        avg = 0,
        yea_n = [],
        art_n = [],
        gen_n = [],
        art_n1,
        gen_n1,
        max_year;
    for (let r of data) {
        if (id === 'play' && playlist.includes(r.song_id)) {
            rec += `<tr id='songs'>
        <td width="365px"><a id='titleHead' href='#' onclick="radarChart('singleSong','browse'); page('${
                r.title
            }','${
                r.artist.name
            }','${
                r.genre.name
            }','${
                r.year
            }','${
                r.details.duration
            }','${
                r.details.bpm
            }','${
                r.details.popularity
            }','${
                r.analytics.energy
            }','${
                r.analytics.danceability
            }','${
                r.analytics.liveness
            }','${
                r.analytics.valence
            }','${
                r.analytics.acousticness
            }','${
                r.analytics.speechiness
            }','${
                r.details.loudness
            }');">${
                r.title.length > 46 ? r.title.substring(0, 46) + "..." : r.title
            }</a>&nbsp&nbsp </td>
        <td width="145px" class="arti">${
                r.artist.name
            }</td>
        <td width="9%"class='yea'>${
                r.year
            }</td> 
        <td width="145px">${
                r.genre.name
            }</td>
        <td width="11%" class='popular'>${
                r.details.popularity
            }</td>
        <td><button class='select' name="select" onclick="remove(${
                r.song_id
            })">Remove</buton></td>          
    </tr>`;
            avg += r.details.popularity;
            art_n.push(r.artist.name);
            gen_n.push(r.genre.name);
            yea_n.push(r.year);
        } else if (id != 'play') {
            rec += `<tr id='songs'>
        <td width="365px"><a id='titleHead' href='#' onclick="radarChart('singleSong','browse'); page('${
                r.title
            }','${
                r.artist.name
            }','${
                r.genre.name
            }','${
                r.year
            }','${
                r.details.duration
            }','${
                r.details.bpm
            }','${
                r.details.popularity
            }','${
                r.analytics.energy
            }','${
                r.analytics.danceability
            }','${
                r.analytics.liveness
            }','${
                r.analytics.valence
            }','${
                r.analytics.acousticness
            }','${
                r.analytics.speechiness
            }','${
                r.details.loudness
            }');">${
                r.title.length > 46 ? r.title.substring(0, 46) + "..." : r.title
            }</a>&nbsp&nbsp </td>
        <td width="145px" class="arti">${
                r.artist.name
            }</td>
        <td width="9%"class='yea'>${
                r.year
            }</td> 
        <td width="145px">${
                r.genre.name
            }</td>
        <td width="11%" class='popular'>${
                r.details.popularity
            }</td>
        <td><button class='select' name="select" onclick="snackbar(${
                r.song_id
            })">Add</buton></td>          
    </tr>`;
        }
    }

    document.getElementById(id).innerHTML = rec;
    avg = Math.round(avg / playlist.length) ? Math.round(avg / playlist.length) : '-';
    max_year = yea_n.length === 0 ? '-' : Math.max(... yea_n);
    art_n1 = frequent(art_n) ? frequent(art_n) : 'No Popular Artist';
    gen_n1 = frequent(gen_n) ? frequent(gen_n) : 'No Popular Genre';
    document.getElementById("playlistInfo").innerHTML = `<h2 id="search">Playlist Info</h2><br/>
                                                      <div id="infoPlay">
                                                      Number of Songs: ${
        playlist.length
    }<br/><br/>
                                                      Most Popular Artist: ${art_n1}<br/><br/>
                                                      Latest Year: ${max_year}<br/><br/>
                                                      Most Popular Genre: ${gen_n1}<br/><br/>
                                                      Average Popularity: ${avg}<br/>
                                                      </div>`
}

// Adding the event handlers for the column headings i-e title, artist, year, genre and popularity
document.getElementById("tit").addEventListener("click", () => {
    sortTable('tit');
});
document.getElementById("art").addEventListener("click", () => {
    sortTable('art');
});
document.getElementById("year").addEventListener("click", () => {
    sortTable('year');
});
document.getElementById("gen").addEventListener("click", () => {
    sortTable('gen');
});
document.getElementById("popularity").addEventListener("click", () => {
    sortTable('popularity');
});

// It sorts the song details
function sortTable(getid) {
    const elements = Array.from(document.getElementsByClassName('thHead'));
    elements.forEach(element => {
        element.style.color = 'black';
    });

    document.getElementById(getid).style.color = '#8B0000';
    document.getElementById('loading').style.display = 'inline';
    // SOrts based on title
    if (getid === 'tit') {
        data.sort(function (a, b) {
            if (typeof a.title != 'string') {
                a.title = a.title.toString();
            }
            if (typeof b.title != 'string') {
                b.title = b.title.toString();
            }
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
    } else if (getid === 'art') { // Sort based on the artist
        data.sort(function (a, b) {
            if (typeof a.artist.name != 'string') {
                a.artist.name = a.artist.name.toString();
            }
            if (typeof b.artist.name != 'string') {
                b.artist.name = b.artist.name.toString();
            }
            let x = a.artist.name.toLowerCase();
            let y = b.artist.name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
    } else if (getid === 'year') { // Sort based on the year
        data.sort(function (a, b) {
            if (typeof a.year != 'string') {
                a.year = a.year.toString();
            }
            if (typeof b.year != 'string') {
                b.year = b.year.toString();
            }
            let x = a.year.toLowerCase();
            let y = b.year.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
    } else if (getid === 'gen') { // Sort based on the genre
        data.sort(function (a, b) {
            if (typeof a.genre.name != 'string') {
                a.genre.name = a.genre.name.toString();
            }
            if (typeof b.genre.name != 'string') {
                b.genre.name = b.genre.name.toString();
            }
            let x = a.genre.name.toLowerCase();
            let y = b.genre.name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
    } else if (getid === 'popularity') { // Sort based on the popularity
        data.sort(function (a, b) {
            if (typeof a.details.popularity != 'string') {
                a.details.popularity = a.details.popularity.toString();
            }
            if (typeof b.details.popularity != 'string') {
                b.details.popularity = b.details.popularity.toString();
            }
            let x = a.details.popularity.toLowerCase();
            let y = b.details.popularity.toLowerCase();
            if (x > y) {
                return -1;
            }
            if (x < y) {
                return 1;
            }
            return 0;
        });
    }
    document.getElementById('loading').style.display = 'none';
    show(data, 'ProductSpace');
}

// It shows an alert of info window saying the song has been added to the playlist
function snackbar(song_id) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
    playlist.push(song_id);
}

// It shows the credits section i-e Owner of the code nd GitHub link
function snackbar_org() {
    var x = document.getElementById("credits");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 5000);
}

// It filters based on the type of radio button selected
function songFilter() {
    let fil = data.filter(check);
    document.getElementById("ProductSpace").innerHTML = '';
    show(fil, 'ProductSpace');
}

// It checks which radio button is clicks out of title, genre and year
function check(r) {
    var filter = document.getElementsByName('opt');
    for (i = 0; i < filter.length; i ++) {
        let val;
        if (filter[i].checked) {
            if (filter[i].value === 'title') {
                if (r.title.includes(document.getElementById(filter[i].value).value)) 
                    return r.song_id;
                
            } else if (filter[i].value === 'genre') {
                if (r.genre.name.includes(document.getElementById(filter[i].value).value)) 
                    return r.song_id;
                
            } else {
                if (r.artist.name.includes(document.getElementById(filter[i].value).value)) 
                    return r.song_id;
            }
        }
    }
}

// Remove the song from playlist
function remove(id) {
    for (let i = 0; i < playlist.length; i++) {
        if (playlist[i] == id) 
            playlist.splice(i, 1);
    }
    show(data, 'play');
}

// Clear all the songs from playlist 
function clear1() {
    playlist = [];
    show(data, 'play');
}

// Remove all the filters
function removeFilter() {
    sortTable('tit');
    document.getElementById('title').value = '';
    document.getElementById('artist').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('t').checked = true;
}
