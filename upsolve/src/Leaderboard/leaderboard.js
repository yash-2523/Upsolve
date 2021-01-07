import {useState,useEffect} from 'react'; 
import Entry from './entry';
import Skeleton from '@material-ui/lab/Skeleton';
import Paginate from 'react-paginate';
import {LeaderboardList} from '../Api/problem.api';

function Leaderboard(props) {

    

    
    const [items,setItems] = useState([]);
    const [skip,setskip] = useState(1);
    const [limit,setlimit] = useState(2);
    const [count,setcount] = useState(0);
    const [loading,setloading] = useState(true);
    const filter = props.filter;
    useEffect(()=>{
        setskip(1);
    },[filter])
    useEffect(()=>{
        setloading(true);
        LeaderboardList(skip,limit,filter).then((result)=>{
            setloading(false);
            setItems(result.data);
            setcount(result.count);
        })  
    },[skip,limit,filter]);


    
    var board = [];
    
    if(loading){
        board.push(<Skeleton variant="rect" width="100%" height={40}></Skeleton>);
        board.push(<Skeleton variant="rect" width="100%" height={40}></Skeleton>);
        board.push(<Skeleton variant="rect" width="100%" height={40}></Skeleton>);
        board.push(<Skeleton variant="rect" width="100%" height={40}></Skeleton>);
        board.push(<Skeleton variant="rect" width="100%" height={40}></Skeleton>);
        return board;
    }

    if(!items || items.length == 0){
        board.push(<h1 style={{color: "Orange"}}>!! No User found !!</h1>);
        return board;
    }
    // console.log(items);
    items.forEach((el,i) => {
        board.push(<Entry offset={(skip-1)*limit} id={i} name={el.username} streak={el.streak} />);
    })
    board.push(
            
            <Paginate containerClassName="paginate" pageCount={Math.ceil(count/limit)} pageRangeDisplayed={5} marginPagesDisplayed={3} initialPage={skip - 1} previousLabel="<<" nextLabel=">>" activeClassName="active-page" onPageChange={(e)=>{setskip((e.selected) + 1)}}></Paginate>

            
        )
    return board;
}

export default Leaderboard;