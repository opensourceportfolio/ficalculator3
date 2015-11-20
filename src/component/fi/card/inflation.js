import React from 'lib/react';
import i18n from 'service/i18n';
import meta from 'service/meta';
import Formatter from 'service/formatter';
import { FICard } from 'component/fi/card/index';
import { BarChart } from 'component/chart/bar';
import { Percent } from 'component/form/percent';

export class Inflation extends React.Component {

  render() {
    let status = this.props.status;

    return (
      <FICard
        chart={{
          type: BarChart,
          fn: FICard.chartFn('inflation', status),
          formatter: Formatter.percent,
          text: i18n.inflation.chart,
        }}
        input={{ type: Percent, onChange: this.props.onChange }}
        rangeInfo={meta.inflation}
        name="inflation"
        text={i18n.inflation}
        status={status} />
    );
  }
}