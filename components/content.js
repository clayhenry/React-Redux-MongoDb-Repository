import React, { Component } from 'react';
import {connect, Provider} from 'react-redux';
import {setIndustries} from '../../dal/repository'

class Content extends Component {

        render(){
            return (

            <React.Fragment>
                    <div className="content">

                        <ul>
                            {this.props.industries.map((e, i)=>
                                <li key={i}>{e}</li>
                        )}
                        </ul>

                    </div>
              
             </React.Fragment>

            );
        }

}

const mapStateToProps = (state)=>{
    return {
        industries : state.industries
    }
}


const mapDispatchToProps = (dispatch)=>{

  //initial setup of the industries;
  setIndustries(dispatch);


  //other events (example)
    return {  
        handleInputChange : (event) =>{
            dispatch({
                type: "SEARCH_INPUT_CHANGE",
                val : event.target.value
            }) 
        },
        handleSubmit : (event, query)=>{

        }  
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Content);