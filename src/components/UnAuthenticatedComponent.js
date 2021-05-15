import React from 'react';
    class UnAuthenticated extends React.Component {
        render() {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <h3>Вы не авторизованы</h3>
                            <hr />
                        </div>
                    </div>
                </div>
            );
        
        }
    }

export default UnAuthenticated;