export interface ITeam {
  teamName: string;
  members: Array<string>;
}

export interface ITeamResponse extends ITeam {
  _id: string;
}

