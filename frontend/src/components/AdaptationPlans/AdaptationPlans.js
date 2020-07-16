import React from 'react';
import {connect} from 'react-redux'
import AdaptationPlansForm from './AdaptationPlansForm';

class AdaptationPlans extends React.Component
{
    render()
    {
        return <AdaptationPlansForm/>
    }
}

const mapStateToProps=(state)=>({
    
});

//export default connect(mapStateToProps)(ContentContainer);