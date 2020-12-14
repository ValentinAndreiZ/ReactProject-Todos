import React from 'react';
import Rodal from 'rodal';
import moment from 'moment';
import DayPicker from 'react-day-picker';
// import { render } from 'sass';

// CSS TO BE EDITED FOR THIS COMPONENT IN rodal.css file. PATH: node_modules -> rodal -> docs -> lib -> rodal.css

const mobile = window.matchMedia('(max-width: 768px)')
console.log(mobile)

class DetailsModal extends React.Component {

    state = {
        selectedDay: undefined,
        currentYearAndMonth: new Date(new Date().getFullYear(), new Date().getMonth()),
        //The Month prop on Daypicker gets the data from state.currentYearAndMonth. Whenever the Navbar is navigated, the currentYearAndMonth is reset. 
        // This is done in order to reset the current day after the user closes the modal 
        // (the Daypicker gets rerendered always when the currentYearAndMonth changes and rerenders with the current day when it gets opened again)
        currentTime: new Date(new Date().getTime()),
        // currentTime: moment().unix(),

        daysBetweenCurrentDateAndDeadline: undefined,

    };

    

    handleDayClick = (day) => {

        if (!this.props.currentTodoInModal.completed) {
            //The following condition will allow execution only if the selected day timestamp is a number greater than the currentTime timestamp
            //The following condition prevents the user from selecting deadlines in the past 
            this.setCurrentTime()
            let chosenDeadline = day / 1000 + 3600 * 12
            let currentTime = this.state.currentTime / 1000

            // console.log(chosenDeadline - currentTime)

            if (chosenDeadline - currentTime > 0) {
                //Today at 12am(midnight) will always have a greater timestamp than now timestamp
                //If now timestamp > the timestamp of the day in which the deadline is set, no action will be done (cannot choose the day, message with deadline won't be prompted)
                //If the same day is selected, see the console.log above. On every click it will show how many seconds are left until the current day will no longer be clickable
                this.setCurrentTime() //Makes sure that CurrentTime is set and the render is done with the updated time
                this.setState({ selectedDay: day },
                    () => {
                        this.props.setDeadline((this.state.selectedDay.getTime() / 1000) + 3600 * 12
                /*Time transformed in seconds + 12 hours => day ends at 12am(midnight) the next day (For some reason in daypicker component, the day ends at 12 pm)*/,
                            this.props.currentTodoInModal.id)
                    });
            }
            else {

            }
        }

    }


    setCurrentDay = () => {
        this.setState({ currentYearAndMonth: new Date(new Date().getFullYear(), new Date().getMonth()) })
    }

    setCurrentTime = () => {
        this.setState({ currentTime: new Date(new Date().getTime()) })
    }

    getdaysBetweenCurrentDateAndDeadline = () => {
        if (!this.props.currentTodoInModal.completed) {
            // console.log(moment.unix(this.props.currentTodoInModal.deadline).format("MM/DD/YYYY h:mm:ss a"))
            let deadLineStamp = this.props.currentTodoInModal.deadline;
            let currentDateStamp = this.state.currentTime / 1000;
            let secondsFromCurrentDateToDeadline = deadLineStamp - currentDateStamp;
            let daysRemaining = Math.floor(secondsFromCurrentDateToDeadline / 86400)
            let hoursRemaining = Math.floor((secondsFromCurrentDateToDeadline - (daysRemaining * 86400)) / 3600)
            // console.log( secondsFromCurrentDateToDeadline - (daysRemaining * 86400) ) 

            if (daysRemaining >= 0) {
                return `You have ${daysRemaining} days and ${hoursRemaining} hours to complete this task`
            } else if (daysRemaining < 0) {
                return `Your assignment is overdue by ${Math.abs(daysRemaining)} days`
            }
        }
        else {
            return `Your todo has been completed`
        }
    }

    Navbar = ({
        nextMonth,
        previousMonth,
        className,
        localeUtils,
    }) => {
        const months = localeUtils.getMonths();
        const prev = months[previousMonth.getMonth()];
        const next = months[nextMonth.getMonth()];
  
        return (
            <div className={className}>
                <button onClick={() => this.setState({ currentYearAndMonth: previousMonth })}>
                    ← {prev.slice(0, 3)}
                </button>
                <button onClick={() => this.setState({ currentYearAndMonth: nextMonth })}>
                    {next.slice(0, 3)} →
            </button>
            </div>
        );
    }


    render() {
        return (
            <div>
                <Rodal
                    closeOnEsc={true}
                    visible={this.props.visible}
                    onClose={() => {
                        this.props.hideDetailsProp()
                        this.setCurrentDay()
                        this.setCurrentTime()
                    }}
                    animation='rotate'
                    measure={'%'}
                    height={'fit-content'}
                    width={mobile.matches === false ? 80 : 95}
                >
                    <div>
                        <h1>{this.props.currentTodoInModal.description}</h1>
                        <h2>Created at: <em>{moment.unix(this.props.currentTodoInModal.createdAt).format("MM/DD/YYYY h:mm:ss a")}</em></h2>
                        {this.props.currentTodoInModal.updatedAt !== null && <h2>Updated <em><b>{moment(moment.unix(this.props.currentTodoInModal.updatedAt)).fromNow()}</b></em></h2>}
                        <textarea
                            placeholder='Type in the extended description for your todo...'
                            onChange={(e) => { this.props.editExtendedDescriptionProp(e.target.value, this.props.currentTodoInModal.id) }}
                            value={this.props.currentTodoInModal.extendedDescription}>
                        </textarea>
                        <h2>Set deadline</h2>
                        <DayPicker
                            navbarElement={this.Navbar}
                            onDayClick={this.handleDayClick}
                            month={this.state.currentYearAndMonth}
                            selectedDays={new Date((this.props.currentTodoInModal.deadline * 1000) - 3600 * 12)} // - 3600*12 See this.handleDayClick -> setDeadline
                            disabledDays={[
                                {
                                    before: this.state.currentTime,
                                },
                            ]}
                        />
                        <h2>{this.getdaysBetweenCurrentDateAndDeadline()} </h2>
                    </div>
                </Rodal>
            </div>
        )
    }

}


export default DetailsModal;







