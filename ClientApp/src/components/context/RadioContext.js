import React, { Component } from 'react';

const RadioContext = React.createContext();

//export const RadioConsumer = RadioContext.Consumer;

class RadioProvider extends Component {

    render() {
        const { children } = this.props
        const {  } = this.state
        const {  } = this

        return(
            <RadioContext.Provider 
                value={
                    {
                        
                    }
                }
                >
                {children}
            </RadioContext.Provider>
        );
    }
}

export default RadioContext;
export { RadioProvider };