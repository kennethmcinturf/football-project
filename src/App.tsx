import React from 'react';
import axios from "axios";
import findIndex from 'lodash/findIndex';
import Table from './Table/Table';
import SearchForm from './SearchForm/SearchForm';

const TEAM_API = 'https://www.balldontlie.io/api/v1/players?search=';
const API_PAGE = '&page='

type Team = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  divison: string;
  full_name : string;
  name : string;
};

type Player = {
  id : number;
  first_name : string;
  last_name : string;
  position : string;
  height_feet : number;
  height_inches : number;
  weight : number;
  team : Team;
  team_name : string;
  isChosen : boolean;
};

type Players = Array<Player>;

type PlayersState = {
  data: {
    list: Players;
    total_pages: number;
    page: number;
  };
  isLoading: boolean;
  isError: boolean;
  isSearched: boolean;
};

interface PlayersFetchInitAction {
  type: "PLAYERS_FETCH_INIT";
}

interface PlayersFetchSuccessAction {
  type: "PLAYERS_FETCH_SUCCESS";
  payload: {
    list: Players;
    total_pages: number;
    page: number;
  };
}

interface PlayersFetchFailureAction {
  type: "PLAYERS_FETCH_FAILURE";
}

type PlayersAction =| PlayersFetchInitAction | PlayersFetchSuccessAction | PlayersFetchFailureAction;

const playersReducer = (state: PlayersState, action: PlayersAction) => {
  switch (action.type) {
    case "PLAYERS_FETCH_INIT" :
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSearched: true
      };
    case "PLAYERS_FETCH_SUCCESS" :
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSearched: true,
        data: {
          list: action.payload.page === 1 ?  action.payload.list : state.data.list.concat(action.payload.list),
          total_pages: action.payload.total_pages,
          page: action.payload.page
        }
      };
    case "PLAYERS_FETCH_FAILURE" :
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSearched: true
      };
  }
};

function App() {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [chosenPlayers, setChosenPlayers] = React.useState<Players>([]);
  const [players, dispatchPlayers] = React.useReducer(playersReducer, 
    {data: {
      list: [],
      total_pages: 0,
      page: 1
    }, isLoading: false, isError: false, isSearched: false}
  );

  const searchTableColumns = [
    {field:'first_name', title: 'First Name'},
    {field:'last_name', title: 'Last Name'},
    {field:'team_name', title: 'Team'},
  ];

  const buildUrl = () => {
    var url = `${TEAM_API}${searchTerm}${API_PAGE}${players.data.page}`;

    return url;
  }

  const setUpPlayers = (data : Players) => {
    data.forEach(player => {
      player.team_name = player.team.full_name;

      let index = findIndex(chosenPlayers, {id:player.id});
      if (index > -1) {
        player.isChosen = true;
      }
    });
  }

  const handleFetchTeams = React.useCallback(async () => {
    dispatchPlayers({ type: "PLAYERS_FETCH_INIT" });

    try {
      const results = await axios.get(buildUrl());

      setUpPlayers(results.data.data);

      dispatchPlayers({
        type: "PLAYERS_FETCH_SUCCESS", 
        payload: {
          list: results.data.data,
          total_pages: results.data.meta.total_pages,
          page: players.data.page
        }, 
      });
    } catch {
      dispatchPlayers({ type: "PLAYERS_FETCH_FAILURE" });
    }
  }, [players, buildUrl]);

  const handleSearchInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
  },[setSearchTerm]);

  const onSearchSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    players.data.page = 1;
    handleFetchTeams();
    event.preventDefault();
  }

  const loadMoreResults = () => {
    players.data.page += 1;
    handleFetchTeams();
  }

  function handleAddButton(player : Player) {
    player.isChosen = !player.isChosen;

    if (player.isChosen == true) {
      setChosenPlayers(chosenPlayers.concat(player));
    } else {
      var index = findIndex(chosenPlayers, player);
      setChosenPlayers(chosenPlayers.splice(index, 1));
    }
  }

  return (
    <div className="App">
      <h1>NBA Player Dive</h1>

      <SearchForm
        id="tableSearch"
        value={searchTerm}
        onInputChange={handleSearchInput}
        onFormSubmit={onSearchSubmit}
        button="primary"
        placeholder="First or Last name"
      ></SearchForm>
      <Table 
        list={players.data.list} 
        columns={searchTableColumns} 
        tableKey='searchTable'
        buttonAction={handleAddButton}
        total_pages={players.data.total_pages}
        page={players.data.page}
        loadHandler={loadMoreResults}>
          {!players.isSearched ? 'Search Table to Begin Search' : 'No results found...'}
      </Table>
    </div>
  );
}

type TableProps = {
  list:Players,
  columns:Array<any>,
  tableKey: string,
  children: React.ReactNode,
  buttonAction?: Function,
  page?: number,
  total_pages?: number,
  loadHandler?: Function
};

type SearchFormProps = {
  id:string,
  value:string,
  onInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void,
  onFormSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void,
  button:string,
  placeholder?:string
};

export default App;

export type { TableProps, SearchFormProps, Player, Players };