
import  React from 'react';
import { Button } from 'antd';


const  Header = ({matchedCards=0, size=18, tries=0, restart, start=true, end=false }) =>{
    return (
        <div className="header">
            <div className="result">
                <h3>
                    {
                        start ? end? "Congratulation ! You found all pairs" :
                            `You found ${matchedCards.length} out of ${size / 2 } pairs with ${tries} tries  `
                            : "Find All The Pairs"
                    }
                </h3>
            </div>

            <div className="restart">
                <Button onClick={()=>restart()} type="primary">Restart</Button>
            </div>
        </div>
    );
};
export default Header
