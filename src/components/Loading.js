import React from 'react';
import PropTypes from 'prop-types';

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
        const { text, speed = 1000 } = this.props;
        const stopper = text + '...';

        this.intervalId = setInterval(() => {
            // Return to orignal text when loading text ends with three dots ...
            console.log(`'is text: "${text}" === stopper: "${stopper}"`, text === stopper );
            this.state.text === stopper 
                ? this.setState(() => ({ text: this.props.text }))
                : this.setState(previousState => ({ text: previousState.text + '.' }));
        }, speed);
    }

    componentWillUnmount() {
        console.log('unmount Loading, clear interval');
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
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

// module.exports = Loading;
export default Loading;