import React from 'react';
import { connect } from 'react-redux'
import AdaptationPlansForm from './AdaptationPlansForm';

class AdaptationPlans extends React.Component {
    render() {
        return (
            <AdaptationPlansForm
                profile={this.props.profile}
                name={this.props.name}
                onPlanClick={()=>console.log("Подробнее")}
            />
        );

    }
}

const mapStateToProps=(state)=>({
    profile: state.AuthReducer.profile,
    name: state.AuthReducer.name
});

export default connect(mapStateToProps)(AdaptationPlans);