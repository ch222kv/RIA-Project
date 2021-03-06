var React = require('react'),
    ptypes = React.PropTypes,
    ReactRedux = require('react-redux'),
    actions = require('../actions');

var quiz = React.createClass({
    propTypes: {
        doStuff: ptypes.func.isRequired,
        quiz: ptypes.func.isRequired,
        change: ptypes.func.isRequired
    },
    getInitialState: function () {
        return {on: false, playMusic: false, answer: ''};
    },
    toggleOnOff: function (e) {

        this.setState({on: !this.state.on});

    },
    onOptionChanged: function (e) {
        this.setState({answer: e.currentTarget.value});
    },
    onMuteSound: function () {
        //document.getElementById("soundtrack").volume=0.1;
        this.setState({playMusic: !this.state.playMusic});
        console.log(this.state.playMusic);
        document.getElementById("soundtrack").muted = this.state.playMusic;
        //this.setState({mute: !this.state.on});
    },

    render: function () {
        var muteText = this.state.playMusic ? "Mute" : "Play";
        var instructionClass = this.state.on ? "on" : "";
        instructionClass += " button";
        //<div className={className} onClick={this.toggleOnOff}>{text}</div>
        var options = this.props.currentQuestion.options;
        var radios = options.map(function (option, index) {
            return (<span><input type="radio" checked={this.state.answer === "A" + (index + 1)}
                                 onChange={this.onOptionChanged} name="q1" id={"A" + (index + 1)}
                                 value={"A" + (index + 1)}/> {option}</span>)
        }.bind(this));
        return (

            <div id="content">


                <audio autoPlay={this.state.playMusic} id="soundtrack">
                    <source src="Sound/theme.mp3" type="audio/mpeg"/>
                </audio>
                <button id="muteSoundButton" onClick={this.onMuteSound}>{muteText}</button>
                <h2>Quiz</h2>
                <div id="instructions" className={instructionClass} onClick={this.toggleOnOff}>
                    <p>
                        If you pick the correct answer you will get 10 points and if you pick the wrong answer you will
                        lose 10 points.
                        For each correct answer your multiplier will increase which means more points from each
                        question.
                        The multiplier will be reset if you pick an incorrect answer.
                    </p>
                </div>

                <div id="message">
                    <p>{this.props.questionValue}</p>
                </div>

                <div id="multiplierandpoints">
                    <p id="points">Points: {this.props.points}</p>
                    <p id="multiplier">Multiplier x{this.props.multiplier}</p>
                </div>


                <div id="options">
                    <p>{this.props.currentQuestion.question}</p>
                    <p>
                        {radios}
                        <button id="buttonStart" onClick={this.props.doStuff}>Start</button>
                        <button id="buttonNext" onClick={this.props.quiz.bind(null, this.state.answer)}>Next question
                        </button>
                    </p>
                </div>
            </div>
        );

    }
});
//React.render(document.getElementById("switch"));

var mapStateToProps = function (state) {
    return state.quiz;
};

var mapDispatchToProps = function (dispatch) {
    return {
        quiz: function (answer) {
            dispatch(actions.quiz(answer));
        },
        change: function () {
            dispatch(actions.change());
        },
        doStuff: function () {
            dispatch(actions.doStuff());
        }
    }
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(quiz);
