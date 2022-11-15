const url="http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
var data;
var playlist=[];

async function getapi(api_url){
    if(JSON.parse(localStorage.getItem('songs')===null)){
        const response = await fetch(url);
        data = await response.json();
        if (response) {
            loader();
        }
        localStorage.setItem('songs',
            JSON.stringify(data));
            console.log("Fetched data");
    }
    else{
    data=JSON.parse(localStorage.getItem('songs'));
    console.log("Local Storage data");
    loader();
    }
    sortTable('tit');
    }

    getapi(url);

    function loader() {
        document.getElementById('loading').style.display = 'none';
    }

    function play(){
      show(data,'play');
    }

    function radarChart(shown, hidden) {
      document.getElementById(shown).style.display='flex';
      document.getElementById(hidden).style.display='none';
      return false;
    }

   

    function page(r,artist,genre,year,duration,bpm,popularity,energy,danceability,liveness,valence,acousticness,speechiness,loudness){
      var minutes = Math.floor(duration / 60);
      var seconds = duration - minutes * 60;
      document.getElementById('info').innerHTML=`${r}, ${artist}, ${genre}, ${year}, ${minutes}:${seconds}<br/><h3>Analysis Data:</h3><br/> <ul style="list-style-type:disc"><li>Bpm: ${bpm}</li><br/>
      <li>Energy: ${energy}</li><br/>
      <li>Dancebility: ${danceability}</li><br/>
      <li>Liveness: ${liveness}</li><br/>
      <li>Valence: ${valence}</li><br/>
      <li>Acousticness: ${acousticness}</li><br/>
      <li>Speechiness: ${speechiness}</li><br/>
      <li>Popularity: ${popularity}</li></ul>`;
      var marksCanvas = document.getElementById("radarChart");

var marksData = {
  labels: ["danceability", "energy", "valence", "speechiness", "loudness", "liveness"],
  datasets: [{
    label: "Radar Chart",
    backgroundColor: "rgba(200,0,0,0.2)",
    data: [danceability,energy, valence,speechiness,loudness,liveness]
  }]
};

var radarChart = new Chart(marksCanvas, {
  type: 'radar',
  data: marksData
});
 }

    function show(data,id) {
        let rec='';
        for (let r of data) {   
          if(id==='play'&& playlist.includes(r.song_id))     
            {rec += `<tr id='songs'>
        <td width="365px"><a id='titleHead' href='#' onclick="radarChart('singleSong','browse'); page('${r.title}','${r.artist.name}','${r.genre.name}','${r.year}','${r.details.duration}','${r.details.bpm}','${r.details.popularity}','${r.analytics.energy}','${r.analytics.danceability}','${r.analytics.liveness}','${r.analytics.valence}','${r.analytics.acousticness}','${r.analytics.speechiness}','${r.details.loudness}');">${r.title.length > 46 ? r.title.substring(0,46) + "..."  :  r.title }</a>&nbsp&nbsp </td>
        <td width="145px" class="arti">${r.artist.name}</td>
        <td width="9%"class='yea'>${r.year }</td> 
        <td width="145px">${r.genre.name }</td>
        <td width="11%" class='popular'>${r.details.popularity }</td>
        <td><button class='select' name="select" onclick="snackbar(${r.song_id})">Add</buton></td>          
    </tr>`;
    console.log(r);
  }
    else if(id!='play'){
      rec += `<tr id='songs'>
        <td width="365px"><a id='titleHead' href='#' onclick="radarChart('singleSong','browse'); page('${r.title}','${r.artist.name}','${r.genre.name}','${r.year}','${r.details.duration}','${r.details.bpm}','${r.details.popularity}','${r.analytics.energy}','${r.analytics.danceability}','${r.analytics.liveness}','${r.analytics.valence}','${r.analytics.acousticness}','${r.analytics.speechiness}','${r.details.loudness}');">${r.title.length > 46 ? r.title.substring(0,46) + "..."  :  r.title }</a>&nbsp&nbsp </td>
        <td width="145px" class="arti">${r.artist.name}</td>
        <td width="9%"class='yea'>${r.year }</td> 
        <td width="145px">${r.genre.name }</td>
        <td width="11%" class='popular'>${r.details.popularity }</td>
        <td><button class='select' name="select" onclick="snackbar(${r.song_id})">Add</buton></td>          
    </tr>`;
    }
        }
        document.getElementById(id).innerHTML = rec;
    }

    document.getElementById("tit").addEventListener("click",()=>{sortTable('tit');});
    document.getElementById("art").addEventListener("click",()=>{sortTable('art');});
    document.getElementById("year").addEventListener("click",()=>{sortTable('year');});
    document.getElementById("gen").addEventListener("click",()=>{sortTable('gen');});
    document.getElementById("popularity").addEventListener("click",()=>{sortTable('popularity');});

    function sortTable(getid) {
      const elements = Array.from(document.getElementsByClassName('thHead'));
        elements.forEach(element => {  element.style.color = 'black';});

        document.getElementById(getid).style.color = '#ff80b3';
        document.getElementById('loading').style.display = 'inline';
        if(getid==='tit')
      {data.sort(function(a, b){
        if(typeof a.title != 'string'){
          a.title=a.title.toString();
        } if(typeof b.title != 'string'){
          b.title=b.title.toString();
        }
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });}
       else if(getid==='art')
      {data.sort(function(a, b){
        if(typeof a.artist.name != 'string'){
          a.artist.name=a.artist.name.toString();
        } if(typeof b.artist.name != 'string'){
          b.artist.name=b.artist.name.toString();
        }
        let x = a.artist.name.toLowerCase();
        let y = b.artist.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });}
      else if(getid==='year')
      {data.sort(function(a, b){
        if(typeof a.year != 'string'){
          a.year=a.year.toString();
        } if(typeof b.year != 'string'){
          b.year=b.year.toString();
        }
        let x = a.year.toLowerCase();
        let y = b.year.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });}
      else if(getid==='gen')
      {data.sort(function(a, b){
        if(typeof a.genre.name != 'string'){
          a.genre.name=a.genre.name.toString();
        } if(typeof b.genre.name != 'string'){
          b.genre.name=b.genre.name.toString();
        }
        let x = a.genre.name.toLowerCase();
        let y = b.genre.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });}
      else if(getid==='popularity')
      {data.sort(function(a, b){
        if(typeof a.details.popularity != 'string'){
          a.details.popularity=a.details.popularity.toString();
        } if(typeof b.details.popularity != 'string'){
          b.details.popularity=b.details.popularity.toString();
        }
        let x = a.details.popularity.toLowerCase();
        let y = b.details.popularity.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });}
      document.getElementById('loading').style.display = 'none';
      show(data, 'ProductSpace');
    }
    

    function snackbar(song_id) {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      playlist+=song_id;  }

    function songFilter(){
      let fil=data.filter(check);
      document.getElementById("ProductSpace").innerHTML = '';
      show(fil,'ProductSpace');
      }

    function check(r) {
      var filter= document.getElementsByName('opt');
    for(i = 0; i < filter.length; i++) {
      let val;
      if(filter[i].checked){
        if(filter[i].value==='title'){
          if(r.title.includes(document.getElementById(filter[i].value).value))
            return r.song_id;}
          else if(filter[i].value==='genre'){
          if(r.genre.name.includes(document.getElementById(filter[i].value).value))
            return r.song_id;}
          else{
          if(r.artist.name.includes(document.getElementById(filter[i].value).value))
            return r.song_id;
      
    }}}
  }

    function removeFilter(){
      sortTable('tit');
    }




  