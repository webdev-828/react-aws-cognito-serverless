import React from "react";
import { Modal, Button, DatePicker, Input } from "antd";
import moment from 'moment';
import "./index.scss";

class CustomModal extends React.Component {
    state = {
        loading: false,
        visible: false,
        name: '',
        date: ''
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOK = (event) => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
        if (this.props.type === 0) {
            this.props.onClickOK([this.state.name, this.state.date]);    
        } else if (this.props.type === 3) {
            this.props.onClickOK(this.state.date);
        } else {
            this.props.onClickOK(this.state.name);
        }
        
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCalendarChange = (date, dateString) => {
        this.setState({ date: dateString})
    };

    handleChange = (event) => {
        this.setState({ name: event.target.value})
    }

    render() {
        const { visible, loading } = this.state;
        const { type, title, detail, classname } = this.props;
        const dateFormat = "MMM DD, YYYY";
        return (
            <div>
                {type === 0 && (
                    <React.Fragment>
                        <div className="university">
                            <Button onClick={this.showModal}>{title}</Button>
                        </div>
                        <div className={"modal-university"}>
                            <Modal
                                visible={visible}
                                title={title}
                                onOk={this.handleOK}
                                onCancel={this.handleCancel}
                                wrapClassName={classname}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={loading}
                                        onClick={this.handleOK}
                                    >
                                        Add
                                    </Button>
                                ]}
                            >
                                <p className="detail">{detail}</p>
                                <Input placeholder="Document name" onChange={this.handleChange} defaultValue = {this.props.value ? this.props.value : ''}/>
                                <div>
                                    <p className="date">Due Date</p>
                                    <DatePicker
                                        disabledDate={current => {
                                            return current.weekday() > 4;
                                        }}
                                        onChange={this.handleCalendarChange}
                                        format={dateFormat}
                                    />
                                </div>
                            </Modal>
                        </div>
                    </React.Fragment>
                )}
                {type === 1 && (
                    <React.Fragment>
                        <div className="document">
                            <p onClick={this.showModal}>{title}</p>
                        </div>
                        <div>
                            <Modal
                                visible={visible}
                                title={title}
                                onOk={this.handleOK}
                                onCancel={this.handleCancel}
                                wrapClassName={classname}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={loading}
                                        onClick={this.handleOK}
                                    >
                                        Add
                                    </Button>
                                ]}
                            >
                                <p className="detail">{detail}</p>
                                <Input placeholder="Document name" onChange={this.handleChange} defaultValue = {this.props.value ? this.props.value : ''}/>
                                <div>
                                    <p className="upload">Hello</p>
                                </div>
                            </Modal>
                        </div>
                    </React.Fragment>
                )}
                {type === 2 && (
                    <React.Fragment>
                        <div className="document">
                            <p onClick={this.showModal}>{title}</p>
                        </div>
                        <div>
                            <Modal
                                visible={visible}
                                title={title}
                                onOk={this.handleOK}
                                onCancel={this.handleCancel}
                                wrapClassName={classname}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={loading}
                                        onClick={this.handleOK}
                                    >
                                        Save
                                    </Button>
                                ]}
                            >
                                <p className="detail">{detail}</p>
                                <Input placeholder="Document name" onChange={this.handleChange} defaultValue = {this.props.value ? this.props.value : ''}/>
                            </Modal>
                        </div>
                    </React.Fragment>
                )}
                {type === 3 && (
                    <React.Fragment>
                        <div className="document">
                            <p onClick={this.showModal}>{title}</p>
                        </div>
                        <div>
                            <Modal
                                visible={visible}
                                title={title}
                                onOk={this.handleOK}
                                onCancel={this.handleCancel}
                                wrapClassName={classname}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={loading}
                                        onClick={this.handleOK}
                                    >
                                        Save
                                    </Button>
                                ]}
                            >
                                <DatePicker
                                    disabledDate={current => {
                                        return current.weekday() > 4;
                                    }}
                                    defaultValue={moment(this.props.value)}
                                    onChange={this.handleCalendarChange}
                                    format={dateFormat}
                                />
                            </Modal>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    };
};

export default CustomModal;
