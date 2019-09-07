import React, { Component } from 'react'
import {lessons} from './LessonData'

const sql = require('sql.js');

class MyQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_lesson: null,
            levelText: '',
            currTblVals: {},
            expectedColumns:[],
            expectedValues: [],
            sqlValue: '',
            current_table_string: '',
            error: '',
            correct_answer: '',
            correct_results: {},
            correct_output: '',
            out_msg: '',
            num_lessons: null
        };
        this.updSqlVal = this.updSqlVal.bind(this);
        this.db = new sql.Database(); 
    }

    componentDidMount() {
        this.lessonSetup()
    } 

    clear = () => {

        for (const table in this.state.currTblVals) {
            const dropQuery = "DROP TABLE IF EXISTS " + table;
            this.db.exec(dropQuery);
        }
        this.setState({ currTblVals:{}, sqlValue:"", out_msg:''})
    };

    // Return an HTML table as a string, given SQL.js results
    table_from_results = (res) => {
    var table_string = '<table>';
    if (res) {
      table_string += '<tr>';
      for (var index in res[0].columns) {
        table_string += '<th>' + res[0].columns[index] + '</th>';
      }
      table_string += '</tr>';
      for (var row_index in res[0].values) {
        table_string += '<tr>';
        for (var col_index in res[0].values[row_index]) {
          table_string += '<td>' + res[0].values[row_index][col_index] + '</td>';
        }
        table_string += '</tr>';
      }
    }
    table_string += '</table>';
    return table_string;
  };

    lessonSetup = () => {
        
        this.clear()

        var currTblVals = this.state;

        const current_lesson = Number(this.props.lesson);
        const num_lessons = Object.keys(lessons).length;
        
        this.db.exec(lessons[current_lesson].dbSetup);
        var correct_answer = lessons[current_lesson].answer;
        const correct_results = this.db.exec(correct_answer);
        const correct_output = this.table_from_results(correct_results);

        document.getElementById("correct-display").style.display="none";

        var current_table_string = '';
        var tblnms = lessons[current_lesson].table_names;

        currTblVals = tblnms.split(",");
        for (var index in currTblVals) {
          const results = this.db.exec("SELECT * FROM " + currTblVals[index] + ";");
          current_table_string += '<div class="table-name">' + currTblVals[index] + '</div>' + this.table_from_results(results);
        }
        this.setState({current_table_string, currTblVals, correct_answer, correct_results, correct_output, current_lesson, num_lessons})
        
    };

    updSqlVal(e) {
       this.setState({
         sqlValue: e.target.value      
      });
    }


    submitSql = async (e) => {
      e.preventDefault();
      const {sqlValue, correct_results} = this.state;

      try {
        var results = this.db.exec(sqlValue);

        if (results.length === 0) {
          this.show_is_correct(false, '<h4>Hmmm, that didn\'t return any results.</h4>  Try it again.');
        } else {
          var is_correct = this.grade_results(results, correct_results);
          if (is_correct) {
            this.show_is_correct(true, null);            
            } 
          else {
            this.show_is_correct(false, '<h4>Something doesn\'t look right there.</h4>  Try that one again.');
          }
        }
      } catch (err) {
        this.show_is_correct(false, '<h4>It\'s good but it\'s not right.</h4>  Have another go.');
      }
      return false;

    }

    normalize = (x) => {
      return x.toUpperCase().replace(/\s/g, "")
    };

    grade_results = (res, corr) => {
      if (!res) {
        return false;
      }
      // Check to make sure the results are equal, but normalize case and remove whitespace from column names.
      return JSON.stringify(res[0].columns.map(this.normalize)) === JSON.stringify(corr[0].columns.map(this.normalize)) &&
        JSON.stringify(res[0].values) === JSON.stringify(corr[0].values);
    };

    show_is_correct = (is_correct, custom_error_message) => {
      const {current_lesson, num_lessons } = this.state;
      var out_msg = this.state;
      
      if (is_correct) {
        out_msg = '<h4>Well done! That\'s the right answer!</h4>';
        document.getElementById("quiz-form").style.display="none";
        document.getElementById("correct-display").style.display="block";

        if (current_lesson < num_lessons) {
          out_msg += '<a href="/' + lessons[current_lesson+1]['short_name'] + '" tabindex="3">Try the next Lesson</a>';
        } else {
          out_msg += 'You have reached the end of the line.  Go put SQL Master on your CV!';
        }
      } else if (custom_error_message) {
        out_msg = custom_error_message;
      } else {
        out_msg = '<h4>Hmmm.</h4> It\'s good but it\'s not right.  Have another go.';
      }
      this.setState({out_msg});
    };

    render(){
        const {current_table_string, out_msg, correct_output, correct_answer} = this.state;
        return (
            <div>
            
            <h2 className="quiz__header">Quiz Time.</h2>

            <h3>The Question.</h3>
            <p dangerouslySetInnerHTML={{__html: lessons[this.props.lesson]['prompt']}} />

            <h3>The Data.</h3>
            <p dangerouslySetInnerHTML={{__html: current_table_string}} />
            <p dangerouslySetInnerHTML={{__html: out_msg}} />

            <form id="quiz-form">
            <h3>The Editor.</h3>
            <p>
            <textarea id='sql-input' rows='8' cols='30' onChange={ this.updSqlVal }></textarea>
            <br />
            <button id="sql-link" onClick={(e) => {this.submitSql(e)}}>Run SQL</button>
            </p>
            </form>

            <div id="correct-display">
              <h3>The Answers.</h3>
              <h4>Correct SQL: </h4>
              <code dangerouslySetInnerHTML={{__html: correct_answer}} />

              <h4>Correct Output:</h4>
              <p dangerouslySetInnerHTML={{__html: correct_output}} />
            </div>

            </div>
        );
    }
}

export default MyQuiz;