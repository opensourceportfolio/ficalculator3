import React from 'react';

import DateComponent from '../../../component/form/date';
import { FormInputs } from '../../../model/state';
import { i18n } from '../../../service/i18n';

interface StateProps {
  purchaseDate: string;
}

interface DispatchProps {
  onChange: (payload: Partial<FormInputs>) => void;
}

type Props = StateProps & DispatchProps;

export default function Term(props: Props) {
  const { onChange, purchaseDate } = props;

  const onChangeHandler = (_, value: string) =>
    onChange({ purchaseDate: value });
  const text = {
    placeholder: i18n.house.purchaseDate.placeholder,
  };
  const now = new Date();

  return (
    <DateComponent
      onChange={onChangeHandler}
      name={'purchaseDate'}
      value={purchaseDate}
      max={`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
      text={text}
    />
  );
}
