import React from "react";

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { items, isOpen, tags } = this.props;
        //Do not show popup
        if (!isOpen) return null;
        return (
            <div className="popup">
                <div className="container">
                    <div className="content">
                        {items &&
                            items.map((item, idx) => {
                                return (
                                    <div className="item" key={idx}>
                                        <div className="user_infor_wrapper">
                                            <img src={item.images[0].url} />
                                            <p>{item.name}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        {!items.length && <div className="warning"></div>}
                    </div>
                </div>
            </div>
        );
    }
}
