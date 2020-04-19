
import  React from 'react';
import { Button } from 'antd';
import { Select } from 'antd';

const { Option } = Select;


const  Header = ({matchedCards=0, size=18, tries=0, restart, start=true, end=false, resize, canFlip }) =>{
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
            <div className="left">
                <div className="restart">
                    <Button onClick={()=>restart()} type="primary">Restart</Button>
                </div>
                <div className="resize">
                    <Select disabled={!canFlip} defaultValue={size} value={size} style={{ width: 120 }} onChange={value=>resize(value)}>
                        <Option value={18} >9 Pairs</Option>
                        <Option value={24} >12 Pairs</Option>
                        <Option value={30} >15 Pairs</Option>
                        <Option value={36} >18 Pairs</Option>
                        <Option value={42} >21 Pairs</Option>
                    </Select>
                </div>
            </div>
        </div>
    );
};
export default Header
