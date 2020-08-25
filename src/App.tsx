import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import axios from "axios";
import Table from './Table/Table'

const TEAM_API = 'https://www.balldontlie.io/api/v1/players';

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
  const [searchTerm, setSearchTerm] = React.useState();

  const searchTableColumns = [
    {field:'first_name', title: 'First Name'},
    {field:'last_name', title: 'Last Name'},
    {field:'team_name', title: 'Team'},
  ];

  const handleFetchTeams = React.useCallback(async () => {
    try {
      const results = await axios.get(TEAM_API);

      setPlayers(results.data.data);
    } catch {
      throw new Error();
    }
  }, [setPlayers]);

  React.useEffect(() => {
    handleFetchTeams();
  }, [handleFetchTeams]);

  players.forEach(player => player.team_name = player.team.full_name);

  return (
    <div className="App">
      <h1>NBA Player Dive</h1>

      <Table list={players} columns={searchTableColumns} tableKey='searchTable'></Table>
    </div>
  );
}

type TableProps = {
  list:Players,
  columns:Array<any>,
  tableKey: string
};

export default App;

export type { TableProps, Player, Team };