import React from 'react';
import { formattedCurrency } from 'service/formatter';
import PlainNumber from 'component/form/plainNumber';

const Currency = props =>
  <PlainNumber formatter={formattedCurrency} {...props} />;

export default Currency;
