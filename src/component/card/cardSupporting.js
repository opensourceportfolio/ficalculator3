import React from 'lib/react';

export default class CardSupporting extends React.Component {

  render() {
    return (
      <div className="mdl-card__supporting-text">
        {this.props.text}
      </div>
    );
  }
}
