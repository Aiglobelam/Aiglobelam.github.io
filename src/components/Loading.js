import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
};

class Loading extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
    }

    static defaultProps = {
        text: 'Loading',
    }
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         text: props.text
    //     };
    // }

     // made possible due to '@babel/plugin-proposal-class-properties'
     // notice we do not get passed props but we can use this.props.text
    state = {
        text: this.props.text,
    }

    componentDidMount() {
        const { text, speed = 1000 } = this.props;
        const stopper = text + '...';

        this.intervalId = setInterval(() => {
            // Return to orignal text when loading text ends with three dots ...
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

// Can be moved inside component due to '@babel/plugin-proposal-class-properties'
// Loading.propTypes = {
//     text: PropTypes.string.isRequired,
// }
// Loading.defaultProps = {
//     text: 'Loading',
// }

// module.exports = Loading;
export default Loading;