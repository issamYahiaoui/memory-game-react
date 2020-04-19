import React, { Component }  from 'react'
import { connect } from 'react-redux'
import CardsList from '../components/CardsListNew'
import MemoryActions from '../redux/memory/actions'
import Header from "../components/Header";


const mapStateToProps = ({memory}) => ({
    memory
});

const mapDispatchToProps = (dispatch) => {
    return {
        initialize: () => dispatch({type : MemoryActions.INITIALIZE}),
        restart: () => dispatch({type : MemoryActions.RESTART}),
        flipCard: () => dispatch({type : MemoryActions.FLIP_CARD}),
        resize: () => dispatch({type : MemoryActions.RESIZE}),
    }
}


class App extends Component {


    componentDidMount() {
        this.props.initialize()
    }


    render() {
        const {  memory : {cards, size, round, matchedCards, startGame, endGame }, restart, flipCard, resize } = this.props;
        console.log('props' , this.props)
        return (
            <div>
               <Header
                   size={size}
                   round={round}
                   matchedCards={matchedCards}
                   restart={restart}
                   resize={resize}
                   start={startGame}
                   end={endGame}
               />
               <CardsList
                   cards={cards}
                   flip={flipCard}
               />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
