/*
 *
 * Content
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { createSelector } from 'reselect';
import { selectPlugins } from 'containers/App/selectors';

export class Content extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let plugin;

    // Detect plugin according to params
    this.props.plugins.map(p => {
      if (this.props.params.plugin === p.id) {
        plugin = p;
      }
    });

    let content;
    if (!plugin) {
      content = <p>Unknown plugin.</p>
    } else {
      const Elem = plugin.mainComponent;
      content = <Elem plugin={plugin}></Elem>;
    }

    return (
      <div className={styles.content}>
        <div className="alert alert-success" role="alert">
          <strong>Welcome!</strong> You successfully loaded the admin panel.
        </div>
        {content}
      </div>
    );
  }
}

Content.propTypes = {
  plugins: React.PropTypes.object,
  onRegisterPluginClicked: React.PropTypes.func,
};

const mapStateToProps = createSelector(
  selectPlugins(),
  (plugins) => ({ plugins })
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
