import React, { Component, PropTypes }  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cardImages from '../cardImages'
// import Header from '../components/Header'
import CardsList from '../components/CardsList'
import * as MemoryActions from '../redux/memory/actions'


const mapStateToProps = ({memory}) => ({
    memory
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(MemoryActions, dispatch)
});

class App extends Component {

    render() {
        const { memory, actions } = this.props;

        return (
            <div className="container">
               <CardsList cardImages={cardImages} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
