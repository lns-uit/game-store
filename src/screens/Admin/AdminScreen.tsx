import { Button, Form, Input, DatePicker, Space, InputNumber } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
import "./styles.css";
import {DiscountType, GenreType} from '../../interfaces/rootInterface';
const { Search } = Input;
const { RangePicker } = DatePicker;

function AdminScreen(){

    const [genre, setGenre] = useState('')
    const [percentDiscount, setPercentDiscount] = useState(0);
    const [listDiscount,setListDiscount] = useState<DiscountType[]>([])
    const [listGenre,setListGenre] = useState<GenreType[]>([])
    const [title, setTitle] = useState('')
    const [dateDiscount, setDateDiscount] = useState<string[]>([]);

    function onChange(value) {
       setPercentDiscount(value);
    }
    const fetchDataDiscount = () => {
        return axios.get("https://localhost:5001/api/discount")
        .then((response) => {setListDiscount(response.data)});
    }
    const fetchDataGenre = () => {
        return axios.get("https://localhost:5001/api/genre")
           .then((response) => {setListGenre(response.data)});
        }
    const postGenre = (genre:any) => {
        axios.post('https://localhost:5001/api/genre/create', {
            nameGenre: genre
        })
        .then(response => {
            fetchDataGenre()
        })
        .catch(error => {
            console.log(error);
        });
    }
    const postDiscount = (percentDiscount:any,title:any,startDate:any,endDate:any) => {
        axios.post('https://localhost:5001/api/discount/create', {
            percentDiscount: percentDiscount,
            title: title,
            startDate: startDate,
            endDate: endDate
        })
        .then(response => {
            fetchDataDiscount()
        })
        .catch(error => {
            console.log(error);
        });
    }
    const updateDiscount = (idDiscount: any ,percentDiscount:any,title:any,startDate:any,endDate:any) =>{
        axios.put('https://localhost:5001/api/discount/update/' + idDiscount, {
            percentDiscount: percentDiscount,
            title: title,
            startDate: startDate,
            endDate: endDate
        })
        .then(response => {
            fetchDataDiscount()
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchDataDiscount()
        fetchDataGenre()
      }, []);
    return(
        <div className="admin-container">
            <div className="genres-container">
                <h2>
                    Genres Manager
                </h2>

                <input  placeholder="name"  type="text" name="fname" onChange={event => setGenre(event.target.value)}/>
                <Button type="primary" onClick={()=>{postGenre(genre)}}>Submit</Button>
                <br/>
                <div className="genres-list-tag">
                    {listGenre.map((item,index)=>(
                        <Button type="primary" onClick={()=>{}}>{item.nameGenre}</Button>
                    ))}
                </div>
                
            </div>
            <br/>
            <div className="discount-container">
                <h2>
                    Discount Manager 
                </h2>
                <br/>
                <input placeholder="id Game" type="text"name="fname" onChange={event => setGenre(event.target.value)}/>
                <input placeholder="Title" type="text"name="fname" onChange={event => setTitle(event.target.value)}/>
                <InputNumber
                    defaultValue={0}
                    min={0}
                    max={100}
                    onChange={onChange}
                />
                <br/>
                <RangePicker onChange = {(value, dateString) => {setDateDiscount(dateString)}} />
                <br/>
                <Button type="primary" onClick={()=>{postDiscount(percentDiscount, title, dateDiscount[0],dateDiscount[1])}}>Submit</Button>
                <br/>
                <div className="discount-list-tag">
                    {listDiscount.map((item,index)=>(
                        <div className = "tag-discount">
                            <Button onClick={()=>{
                                updateDiscount(item.idDiscount,percentDiscount, title, dateDiscount[0],dateDiscount[1])
                            }}>
                                    {item.percentDiscount} &emsp;
                                    {item.title} &emsp;  {item.endDate} &emsp; {item.endDate}
                            </Button>
                            
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminScreen;