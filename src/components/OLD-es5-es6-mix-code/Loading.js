var React = require('react');
var PropTypes = require('prop-types');

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }        
};

class Loading extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    componentDidMount() {
        var stopper = this.props.text + '...';
        this.intervalId = setInterval(() => {
            // Return to orignal text when loading text ends with three dots ...
            if (this.state.text === stopper) {
                this.setState(() => {
                    return {
                        text: this.props.text,
                    }
                });
            } 
            // Add 1 dot to loading text
            else {
                this.setState((previousState) => {
                    return {
                        text: previousState.text + '.'
                    }
                });
            }
        }, 300);
    }

    componentWillUnmount() {
        console.log('unmount Loading, clear interval');
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <p style={styles.content}>
                { this.state.text }
            </p>
        );
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
}
Loading.defaultProps = {
    text: 'Loading',
}

module.exports = Loading;