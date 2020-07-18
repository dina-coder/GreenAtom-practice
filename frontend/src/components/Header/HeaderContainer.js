import React from 'react';
import { connect } from 'react-redux';
import { SetLogOut } from '../../redux/reducers/AuthReducer';
import Header from './Header';
import { mapRoleToRoleRU } from '../../utils/mapRoleToRoleRU';
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';

class HeaderContainer extends React.Component {
    render() {
        const translatedRole = mapRoleToRoleRU(mapRoleIdToRole(this.props.roleId));
        return (
            <Header
                name={this.props.name}
                role={translatedRole}
                setLogOut={this.props.SetLogOut}
            />
        );

    }
}

const mapStateToProps = (state) => ({
    name: state.AuthReducer.name,
    roleId: state.AuthReducer['role_id'],
});

export default connect(mapStateToProps, { SetLogOut })(HeaderContainer);

