import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import axios from "axios";
import Table from './Table/Table';
import SearchForm from './SearchForm/SearchForm';

const TEAM_API = 'https://www.balldontlie.io/api/v1/players?search=';

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
  'id': number;
  'first_name': string;
  'last_name': string;
  'position': string;
  'height_feet': number;
  'height_inches' : number;
  'weight' : number;
  'team' : Team;
  'team_name' : string;
};

type Players = Array<Player>;

function App() {
  const [players, setPlayers] = React.useState<Players>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const searchTableColumns = [
    {field:'first_name', title: 'First Name'},
    {field:'last_name', title: 'Last Name'},
    {field:'team_name', title: 'Team'},
  ];

  const handleFetchTeams = React.useCallback(async () => {
    try {
      const results = await axios.get(`${TEAM_API}${searchTerm}`);
      setPlayers(results.data.data);
    } catch {
      throw new Error();
    }
  }, [searchTerm,setPlayers]);

  const handleSearchInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm]
  );

  players.forEach(player => player.team_name = player.team.full_name);

  const onSearchSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    handleFetchTeams();
    event.preventDefault();
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
        list={players} 
        columns={searchTableColumns} 
        tableKey='searchTable'>{searchTerm.trim() == "" ? 'Search Table to Begin Search' : 'No results found...'}</Table>
    </div>
  );
}

type TableProps = {
  list:Players,
  columns:Array<any>,
  tableKey: string,
  children: React.ReactNode
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

export type { TableProps, SearchFormProps, Player };