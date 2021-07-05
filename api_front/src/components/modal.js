import React from 'react';

class Popup extends React.Component {
    render(){
        return (
            <div>
                {this.props.isPopUp && <div className="popUp">
                    <p
                        className="closePopUp"
                        onClick={(e)=>{
                            this.props.onClickClose();
                        }}
                    >
                        X
                    </p>
                    <h4>Félicitation</h4>
                    <p>{this.props.msg}</p>
                    
                    <button
                         onClick={(e)=>{
                            this.props.onClickClose();
                        }}
                    >Retour aux achats</button>
                </div>}
            </div>
        )
    }
}

export default Popup