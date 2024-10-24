import { type Criteria } from './types';

export const criteriaData: Criteria[] = [
  {
    id: 'bridging',
    name: 'Bridging',
    points: -0.1,
    description: 'Points deducted for bridging functionality',
  },
  {
    id: 'chain_added',
    name: 'For each Chain added',
    points: -0.5,
    description: 'Points deducted per additional chain',
  },
  {
    id: 'protocol_added',
    name: 'For each Protocol added',
    points: -0.5,
    description: 'Points deducted per additional protocol',
  },
  {
    id: 'top_5_chain',
    name: 'Top 05 Chain in TVL',
    points: 2,
    description: 'Points added for being in top 5 chains by TVL',
  },
  {
    id: 'top_10_chain',
    name: 'Top 10 Chain in TVL',
    points: 1,
    description: 'Points added for being in top 10 chains by TVL',
  },
  {
    id: 'top_30_chain',
    name: 'Top 30 Chain in TVL',
    points: 0.35,
    description: 'Points added for being in top 30 chains by TVL',
  },
  {
    id: 'top_5_protocol',
    name: 'Top 05 Protocols in TVL',
    points: 2,
    description: 'Points added for being in top 5 protocols by TVL',
  },
  {
    id: 'top_10_protocol',
    name: 'Top 10 Protocols in TVL',
    points: 1,
    description: 'Points added for being in top 10 protocols by TVL',
  },
  {
    id: 'top_30_protocol',
    name: 'Top 30 Protocols in TVL',
    points: 0.35,
    description: 'Points added for being in top 30 protocols by TVL',
  },
  {
    id: 'leverage',
    name: 'Using Leverage',
    points: -1,
    description: 'Points deducted for using leverage',
  },
  {
    id: 'team_doxxed',
    name: 'Team Doxxed',
    points: 2,
    description: 'Points added for having a doxxed team',
  },
  {
    id: 'team_anon',
    name: 'Team Anon',
    points: -2,
    description: 'Points deducted for having an anonymous team',
  },
  {
    id: 'audited',
    name: 'Audited Project',
    points: 2,
    description: 'Points added for being audited',
  },
  {
    id: 'non_audited',
    name: 'Non Audited Project',
    points: -2,
    description: 'Points deducted for not being audited',
  },
];