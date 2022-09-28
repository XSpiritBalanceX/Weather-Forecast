import React from "react";
import PropTypes from 'prop-types';
import rain from './images/raining.gif';
import sun from './images/sunny.gif';
import cloud from './images/cloudy.gif';
import snow from './images/snowing.gif';
import './Card.css';

class Card extends React.PureComponent{

    static propTypes={

    }

    getCurrentData=(dt)=>{
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];        
        let day = days[dt.getDay()];
        let date = dt.getDate();
        let month = months[dt.getMonth()];
        let year = dt.getFullYear();

        return `${day} ${date} ${month} ${year} г.`
    };

    checkPict=(pict)=>{
        if(pict==='Rain'){
            return rain;
        }else if(pict==='Clouds'){
            return cloud;
        }else if(pict==='Clear'){
            return sun;
        }else if(pict==='Snow'){
            return snow;
        }
    };


    render(){

        const ms = this.props.day.dt * 1000;
        const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});
        console.log(this.props.day.dt_txt)
        return (<div className="oneCard">
            <p>{weekdayName}</p>
            <div>
           <h1>{Math.round(this.props.day.main.temp)} °C</h1>
           <h4>{this.props.day.weather[0].description}</h4>
            <img src={this.checkPict(this.props.day.weather[0].main)} title='Type of weather' className='imgWeat'/>
           <p>По ощущениям: {Math.round(this.props.day.main.feels_like)} °C</p>
           <p>Влажность: {this.props.day.main.humidity} %</p>           
        </div>
        </div> )
    }
};

export default Card;