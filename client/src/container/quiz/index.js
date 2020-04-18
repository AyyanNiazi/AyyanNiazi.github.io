import React,{Component} from 'react';
// import './quiz.css'
import Question from './question'

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className='mainFile' >
                    {/* <h1>Question 16 of 20 </h1> */}
                    {/* <p>Entertainment Board Exam</p> */}

                    <Question/>

                    <div>
                        Answers final
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Quiz;