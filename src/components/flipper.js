var Flipper = React.createClass({
    render: function() {
        return <div className={"flipper-container " + this.props.orientation}>
            <div className={"flipper" + (this.props.flipped ? " flipped" : "")}>
                <Front>the front!</Front>
                <Back>the back!</Back>
            </div>
        </div>;
    }
});
var Front = React.createClass({
    render: function() {
        return <div className="front tile">{this.props.children}</div>;
    }
});

var Back = React.createClass({
    render: function() {
        return <div className="back tile">{this.props.children}</div>;
    }
});
