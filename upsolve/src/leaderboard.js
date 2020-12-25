import {useState,useEffect} from 'react'; 
import Entry from './entry';

function Leaderboard() {
    const [items,setItems] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/api/users/list').then(res => res.json()).then((result)=>{
            setItems(result);

            window.lt();
        })
    },[]);

    var board = [];

    // console.log(items);
    items.data?.forEach((el,i) => {
        board.push(<Entry id={i} name={el.username} />);
    })

    return board;
}

export default Leaderboard;