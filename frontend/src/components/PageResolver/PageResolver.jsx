import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import AdaptationPlans from '../AdaptationPlans/AdaptationPlans';
import AdaptationPlan from '../AdaptationPlan/AdaptationPlan';
import { withHeader } from '../../hocs/withHeader';
import { Roles } from '../../constants/roles';

class PageResolver extends React.Component {
  getUserStartPage = (role) => {
    switch (role) {
      case Roles.Employee: return AdaptationPlan;
      case Roles.HR:
      case Roles.Director: return AdaptationPlans;
      default: return undefined;
    }
  };

  render() {
    const { role, isAuth } = this.props;
    if (!isAuth) return <Redirect to={'/login'} />;
    const Component = this.getUserStartPage(role);
    return withHeader(Component);
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.AuthReducer.isAuth,
  role: mapRoleIdToRole(state.AuthReducer['role_id']),
});

export default connect(mapStateToProps)(PageResolver);