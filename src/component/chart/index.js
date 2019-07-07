// @flow

import Chartjs from 'chart.js';
import debounce from 'debounce';
import { type TooltipItem, type TooltipItems } from 'model/chart';
import { identity } from 'ramda';
import * as React from 'react';
import { toModel } from 'service/chart';

export type Tooltips = {
  title: TooltipItems => string,
  label: TooltipItem => string,
};

export type Plot = { x: number[], y: number[][] };

export type Formatter = { x?: number => number | string, y?: number => number };

export type ChartText = {
  title: string,
  tooltips: Tooltips,
  legend: string[],
};

export type Props = {|
  type: 'bar' | 'line',
  plot: Plot,
  formatter: Formatter,
  text: ChartText,
|};

export default class Base extends React.Component<Props> {
  constructor() {
    super();
    this.update = debounce(() => {
      const { plot, text } = this.props;
      const data = this.deriveData(plot, text);

      this.chart.data.datasets.forEach((dataset, i) => {
        dataset.data = data.datasets[i].data;
      });
      this.chart.data.labels = data.labels;
      this.chart.update();
    }, 350);
  }

  update: () => void;

  chart: Chartjs;

  chartEl: ?HTMLCanvasElement;

  componentDidMount() {
    const $chart = this.chartEl;
    const { type, plot, text } = this.props;
    const overridden = this.override(this.props);
    const data = this.deriveData(plot, text);

    this.chart = new Chartjs($chart, {
      type,
      data,
      options: overridden,
    });
  }

  componentDidUpdate() {
    this.update();
  }

  deriveData(plot: Plot, text: ChartText) {
    const xval = plot.x.map(item => item.toString());
    const yval = plot.y;

    return toModel(xval, yval, text.legend);
  }

  override({ text, formatter }: Props) {
    return {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: text.title,
      },
      deferred: {
        enabled: true,
      },
      tooltips: {
        callbacks: text.tooltips,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: formatter.y,
            },
          },
        ],
        xAxes: [
          {
            ticks: { callback: formatter.x || identity },
          },
        ],
      },
    };
  }

  render() {
    return <canvas style={{ height: '100%' }} ref={e => (this.chartEl = e)} />;
  }
}