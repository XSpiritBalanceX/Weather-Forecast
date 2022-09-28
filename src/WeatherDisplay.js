import React from 'react';
import './WeatherDisplay.css';
import Preloader from './Preloader';
import Card from './Card';

const api = {
    key: 'a477c5acf4d6b2df361ebb72c9b47ea6',
    base: 'http://api.openweathermap.org/data/2.5/'
  }

class WeatherDisplay extends React.PureComponent{

    state={
        city:'',
        weather:{},
        isLoad:"",
        currentCity:'',
        currentCountry:''
    }

    search=async()=>{
        this.setState({isLoad:false})
        const response=await fetch(`${api.base}/forecast?q=${this.state.city}&lang=ru&units=metric&APPID=${api.key}`);
        if(!response.ok){
            console.log("fetch error " + response.status);
            alert('УПС...Что-то пошло не так, попытайтесь еще раз');
        }
        else{
            const data=await response.json();
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"));
            this.setState({city:'', weather:dailyData,isLoad:true, 
              currentCity:data.city.name, currentCountry: data.city.country});
        }        
    };

    setCity=(EO)=>{
       this.setState({city:EO.target.value});
    };

    
    render(){
        
        const listCard=this.state.isLoad===true?this.state.weather.map((el, index)=>{
           return <Card key={index}
               day={el}/>
        }):null;

        return(<div className='contanerForWeather'>
            <h3>Введите Ваш город</h3>
        <input type={'text'} value={this.state.city} onChange={this.setCity}/>
        <input type={'button'} defaultValue='Search' onClick={this.search}/>
        {this.state.isLoad===true?<React.Fragment>
            <p>{this.state.currentCity}, {this.state.currentCountry} </p> 
            <div className='cardWea'>{ listCard}</div>
        </React.Fragment> :this.state.isLoad===false?<Preloader />:null}        
      </div>)
    }    
};

export default WeatherDisplay;