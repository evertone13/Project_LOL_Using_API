import React, {useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText,setSearchText]=useState("");
  const [playerData,setPlayerData]=useState({});
  const API_KEY = "RGAPI-a9c74271-1185-4474-8e43-2f2bbed41b54";
  
  function searchForPlayer(event){
    //Set up the correct API call
    var APICallString = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key="+API_KEY;
    //Handle the API call
    axios.get(APICallString).then(function(response){
      //success
      setPlayerData(response.data);
    }).catch(function(error){
      //Error
      console.log(error)
    });
  }

  console.log(playerData);

  return (
    <div className="App">
      <div className="container">
        <h5>League of Legends Player Searcher</h5>
        <input type="text" onChange={e=>setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}>Search for player</button>
      </div>
      {JSON.stringify(playerData) != '{}' ?
      <>
        <p>{playerData.name}</p>
        <img width="100" src={"https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
        <p>Summoner level {playerData.summonerLevel}</p>
      </>
      :
      <><p>No player data</p></>
    }
    </div>
  );
}

export default App;
