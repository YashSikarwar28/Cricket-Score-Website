import React, { useEffect, useState } from 'react'

const Cricketscore = () => {

    const [data, setdata] = useState([]);
    const [searchmatch, setsearchmatch] = useState("");
    const [search, setsearch] = useState("")

    const getdata = async () => {
        try {
            const response = await fetch(`https://api.cricapi.com/v1/cricScore?apikey=a66bab04-0e13-4714-af22-9e4d948d955b`)
            const data = await response.json()
            setdata(data.data);
        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getdata();
    }, [])

    const handleinput = (e) => {
        console.log(e.target.value);
        setsearchmatch(e.target.value)
    }

    const handlebtn = () => {
        setsearch(searchmatch);
        getdata();
    }

    return (
        <div className='main'>
            <div className="searchbar">
                <input onChange={handleinput} type="text" placeholder='Search Matches' name="" id="" />
                <button onClick={handlebtn}>Search</button>
            </div>
            <div className="heading">
                <p>Live Cricket Score</p>
            </div>
            <div className="container">
                {
                    data ?
                        data.map((currval, index) => {
                            console.log(currval);
                            if (currval.status != "Match not started") {
                                if (currval.series.includes(search)) {
                                    return (
                                        <div className='card'>
                                            <h3>{currval.series}</h3>
                                            <h3>{currval.matchType}</h3>
                                            <div className="img">
                                                <div>
                                                    <img src={currval.t1img} alt="" />
                                                    <p>{currval.t1}</p>
                                                    <p>{currval.t1s}</p>
                                                </div>
                                                <div>
                                                    <img src={currval.t2img} alt="" />
                                                    <p>{currval.t2}</p>
                                                    <p>{currval.t2s}</p>
                                                </div>
                                            </div>
                                            <p className='status'>Status : {currval.status} </p>
                                        </div>
                                    )
                                }
                                if(search==""){
                                    return (
                                        <div className='card'>
                                            <h3>{currval.series}</h3>
                                            <h3>{currval.matchType}</h3>
                                            <div className="img">
                                                <div>
                                                    <img src={currval.t1img} alt="" />
                                                    <p>{currval.t1s}</p>
                                                </div>
                                                <div>
                                                    <img src={currval.t2img} alt="" />
                                                    <p>{currval.t2s}</p>
                                                </div>
                                            </div>
                                            <p className='status'>Status : {currval.status} </p>
                                        </div>
                                    )
                                }
                            }
                        })
                        : <p>Data not Found</p>
                }
            </div>
        </div>
    )
}

export default Cricketscore
