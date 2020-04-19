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
        flipCard: (card) => dispatch({type : MemoryActions.FLIP_CARD, payload: {card}}),
        resize: (size) => dispatch({type : MemoryActions.RESIZE, payload :{size}}),
    }
}


class App extends Component {


    componentDidMount() {
        this.props.initialize()
    }


    render() {
        const {  memory : {cards, size, tries, matchedCards, startGame, endGame, canFlip }, restart, flipCard, resize } = this.props;
        console.log('props' , this.props)
        return (
            <div>
               <Header
                   canFlip={canFlip}
                   size={size}
                   tries={tries}
                   matchedCards={matchedCards}
                   restart={restart}
                   resize={resize}
                   start={startGame}
                   end={endGame}
               />
               <CardsList
                   cards={cards}
                   flip={flipCard}
                   size={size}
               />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
