import Paper from '@material-ui/core/Paper';
import { changeValue } from 'action/fi';
import Currency from 'component/form/currency';
import { FormInputs, State } from 'model/state';
import React from 'react';
import { connect } from 'react-redux';
import { getInputs } from 'reducer/fi';
import { compound, monthsToNow, years } from 'service/calculator';
import { i18n } from 'service/i18n';
import { meta } from 'service/meta';

import { ThunkDispatch } from '../../../model/redux';

interface StateProps {
  inputs: FormInputs;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => ({
  inputs: getInputs(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch): DispatchProps => ({
  onChange: (payload: Partial<FormInputs>) => dispatch(changeValue(payload)),
});

const Renter = ({ inputs, onChange }: Props) => {
  const text = i18n.house;

  const yrs = years(inputs) + monthsToNow(inputs.purchaseDate) / 12;
  const futurecost = compound(inputs.rental, inputs.inflation, yrs);
  const rental = {
    name: 'rental',
    onChange: (_, value) => onChange({ rental: value }),
    text: {
      placeholder: text.rental.placeholder,
      additional: text.rental.additional(futurecost),
      error: i18n.error.between(meta.house.rental.min, meta.house.rental.max),
    },
    value: inputs.rental,
    rangeInfo: meta.house.rental,
  };

  return (
    <Paper className="page__input">
      <Currency {...rental} />
    </Paper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Renter);