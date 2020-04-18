import React,{Component} from 'react';
import * as q from './q.json'
import './question.css'
import { returnStatement } from '@babel/types';
class Question extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            questions: q.default[0],
            counter: 1,
            score:0,
            clicked:false,
            correct:false,
            changer: undefined
         }
    }

    nextQuestion(){
        this.setState({
            questions: q.default[this.state.counter],
            counter: this.state.counter+1,
            clicked: false,
            correct: false
        })
         
        // console.log(answer)
    
      
    }
    answer= (answer,id) => {
        // let counter = 1

    let filtered = this.state.questions.incorrect_answers.findIndex((e,index)=> {
        return index ===id
    })
       
      console.log(filtered,id)
      if(filtered){ 
    if(answer==='correct'){
        this.setState({
            score: this.state.score+1,
            clicked: true,
            correct: true,
            changer: filtered
        })
    }
    else{
        this.setState({
            // score: this.state.score+1,
            clicked: true,
            correct: false
        })
    }
}
    else{
        this.setState({
            changer: false
        })
    }
    }
    render() {
        let question = q.default[0].incorrect_answers

        let finalQuestion= this.state.questions.incorrect_answers.map((item,index) => {
            return item
        })
        console.log(finalQuestion[0])
        
        return ( 
            <div>
                <h2>Question no {this.state.counter} of 20 </h2>
                <p>Entertainment Board exams</p>

                <p> {this.state.questions.question}  </p>
                    <ul className='questionsUl' >
                {this.state.counter===20? (
                    <p>Your Score is {this.state.score} </p>
                ):
                    <div>
                   <li onClick={this.answer.bind(this,'wrong',0)} className={this.state.changer!==undefined &&  this.state.clicked===true ? 'correct'  : 'normal'} > {finalQuestion[0]} </li><br/>                   
                   <li onClick={this.answer.bind(this,'wrong',1)} className={this.state.changer!==undefined &&  this.state.clicked===true ? 'correct'  : 'normal'}  > {finalQuestion[1]} </li><br/>                   
                   <li onClick={this.answer.bind(this,'wrong',2)} className={this.state.changer!==undefined &&  this.state.clicked===true ? 'correct'  : 'normal'}  > {finalQuestion[2]} </li><br/>                   
                <li onClick={this.answer.bind(this,'correct',-1)} className={this.state.changer!==undefined &&   this.state.clicked===true ? 'correct'  : 'normal'} > {this.state.questions.correct_answer} </li>}
                   
                    </div>
            }
                 {/* {this.state.counter===20? (
                    void 0
                ): */}
                 {/* <li onClick={this.answer.bind(this,'correct')} className={this.state.clicked===true ? 'active' : 'normal'}> {this.state.questions.correct_answer} </li>} */}
                </ul>
,
                 {this.state.clicked===true ?this.state.correct===true?  (<h4>Correct! </h4>) : (<h4>Sorry</h4>) : void 0 }
                 {this.state.clicked===true ? <button type='button' className='myBtn' onClick={this.nextQuestion.bind(this)} >Next Question </button> : void 0 }
            </div>
         );
    }
}
 
export default Question;