import React from 'react';
import {connect} from 'react-redux'
import AdoptationPlansForm from './AdoptationPlansForm';

class AdoptationPlansContainer extends React.Component
{
    render()
    {
        return <AdoptationPlansForm/>
    }
}

const mapStateToProps=(state)=>({
    
});

export default connect(mapStateToProps)(ContentContainer);