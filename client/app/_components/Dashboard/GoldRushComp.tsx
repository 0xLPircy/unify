'use client';
import {
  GoldRushProvider,
  TokenBalancesListView
} from '@covalenthq/goldrush-kit';
import React from 'react';
import '@covalenthq/goldrush-kit/styles.css';

const GoldRushComp = () => {
  return (
    <TokenBalancesListView
      chain_names={[
        'eth-mainnet',
        'matic-mainnet',
        'arbitrum-mainnet',
        'avalanche-mainnet',
        'optimism-mainnet'
      ]} // list of chains
      address="0xE98ed5C31094ff67b5668B2Ee6164D37B0Cdf40e" //sample address
    />
  );
};

export default GoldRushComp;
