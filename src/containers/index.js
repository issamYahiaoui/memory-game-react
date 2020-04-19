import React, { Component }  from 'react'
import { connect } from 'react-redux'
import CardsList from '../components/CardsListNew'
import MemoryActions from '../redux/memory/actions'


const mapStateToProps = ({memory}) => ({
    memory
});

const mapDispatchToProps = (dispatch) => {
    return {
        initialize: () => dispatch({type : MemoryActions.INITIALIZE}),
    }
}


class App extends Component {


    componentDidMount() {
        this.props.initialize()
    }


    render() {
        const {  memory : {cards} } = this.props;
        console.log('props' , this.props)
        return (
            <div className="container">
               <CardsList cards={cards}  />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
