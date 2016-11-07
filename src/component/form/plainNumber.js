import React from 'lib/react';
import R from 'lib/ramda';
import componentHandler from 'lib/mdl';

export default class PlainNumber extends React.Component {

  componentDidMount() {
    const node = this.refs.plainNumber;

    componentHandler.upgradeElement(node);

    this.validate();
  }

  handleChange({ target }) {
    this.props.onChange(this.props.name, target.value);
  }

  componentDidUpdate() {
    const plainNumber = this.refs.plainNumber;

    this.validate();
    //plainNumber.classList.add('is-focused');
  }

  isValid(rangeInfo, value) {
    const val = parseFloat(value);

    return val && val <= rangeInfo.max && val >= rangeInfo.min;
  }

  validate() {
    const plainNumber = this.refs.plainNumber;
    const { rangeInfo, value } = this.props;
    const isValid = this.isValid(rangeInfo, value);

    plainNumber.classList.add('is-dirty');
    plainNumber.classList.toggle('is-invalid', !isValid);
  }

  render() {
    const { name, text, rangeInfo, value = '', formatter, inputProps } = this.props;
    const additional = R.is(Function, text.additional) ? text.additional(value) : text.additional;
    const isValid = this.isValid(rangeInfo, value);

    return (
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-textfield__masked" ref="plainNumber">
        <input className="mdl-textfield__input"
          ref="input"
          onChange={this.handleChange.bind(this)}
          required
          type="tel"
          value={value || ''}
          step="1"
          {...inputProps}
        />
        <label className="mdl-textfield__mask">
          {isValid ? formatter(value) : ''}
        </label>
        <label className="mdl-textfield__label" htmlFor={name}>
          {text.placeholder}
        </label>
        <label className="mdl-textfield__additional" htmlFor={name}>
          {isValid ? additional : text.error}
        </label>
      </div>
    );
  }
}
