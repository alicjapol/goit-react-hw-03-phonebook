import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    filter: PropTypes.string,
  };
  render() {
    return (
      <div>
        <label>
          Filter
          <input
            onChange={this.props.onChange}
            value={this.props.filter}
            name="filter"
          />
        </label>
      </div>
    );
  }
}
