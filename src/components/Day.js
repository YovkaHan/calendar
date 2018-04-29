/**
 * Created by Jordan3D on 4/25/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {actionFunction, addObject, assignObjects, editSetObject, selectOneObject, clearOneObject, setScheduleItem} from '../actions'
import {intervalCount} from '../reducers'
import Cell from './Cell'
import Flags from './Flags'
import TimeTable from './TimeTable'


const dayCreation = ({dayObject, dbObject, name, dispatch}, creation) => {
  switch (creation.phase) {
    case 0 : {
      // Создание объектов
      for(let i=0; i<creation.timetableLen; i++){
        dispatch(addObject())
      }
      creation.phase = 1;
      break;
    }
    case 1 : {
      // Назначение объектов
      let free = [];
      if(dbObject.free.length>=24){
        free = dbObject.free.slice(-24);
      }
      //
      // Присвоение объектов
      dispatch(editSetObject('week', {operation: 'view-timetable-full', name}, free));
      dispatch(assignObjects(free));
      creation.phase = 2;
      break;
    }
    case 2 : {
      // Назначение интервалов
      // Конфигурация schedule
      const item = {
        id: 0,
        interval: [0,0],
        name: dayObject.view.name,
      };

      dayObject.view.timetable.map((o, index, arr) => {
        let cItem = {...item};
        cItem.id = o.id;
        cItem.interval = intervalCount(index, arr.length);

        dispatch(setScheduleItem(cItem));
      });

      creation.phase = 3;
      break;
    }
    default:
      break;
  }

}

const selectedCheck = (arr, db, stateSelect) => {
  const copyStateSelect = {...stateSelect};
  if(arr.length > 0) {
    let num = arr.length;
    for (let i = arr.length; i > 0; i--) {
      if (db[arr[i-1].id].selected) {
        num--;
      }
    }
    copyStateSelect.all = (num === 0);
    copyStateSelect.part = (num !== arr.length);
  }
  return copyStateSelect;
};

export const compareSelected = (oldObject, newObject) => {
  function jsonEqual(a,b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return jsonEqual(oldObject, newObject);
}

class Day extends Component {
  static propTypes = {
    dayObject: PropTypes.object.isRequired,
    dbObject:  PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    itemClick: PropTypes.func.isRequired,
    itemEnter: PropTypes.func.isRequired,
    itemLeave: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    chosen: PropTypes.bool.isRequired
  };

  constructor(props){
    super(props);
    this.toogleFlag = this.toogleFlag.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.creation = {
      timetableLen: 24,
      phase: 0
    }
  }

  componentDidMount () {
    dayCreation(this.props, this.creation)
    //dispatch()
  }

  componentWillReceiveProps (newProps) {
    const newSelected = selectedCheck(newProps.dayObject.view.timetable, newProps.dbObject, newProps.dayObject.state.selected);
    if(!compareSelected(newProps.dayObject.state.selected, newSelected)){
      newProps.dispatch(
        editSetObject(
          'day',
          {operation: 'state-selected', name: newProps.name},
          newSelected)
      );
    }

    if(this.creation.phase === 1){
      dayCreation(newProps, this.creation)
    }else if(this.creation.phase === 2){
      dayCreation(newProps, this.creation)
    }
  }

  toogleFlag (flag, value, foo) {
    if(value === 'on'){
      foo();
      this.props.dispatch(actionFunction(flag.off)(this.props.dayObject.view.timetable));
    }else {
      foo();
      this.props.dispatch(actionFunction(flag.on)(this.props.dayObject.view.timetable));
    }
  }

  itemClick (){
    arguments.splice = [].splice;
    let set = arguments.splice(arguments.length-1, 1)[0];

    if (set) {
      this.props.dispatch(
        editSetObject(
          'day',
          {operation: 'state-chosen', name: this.props.name},
          true)
      );
    }
    this.props.itemClick.apply(null, arguments);
  }

  mouseUp () {
    this.props.dispatch(
      editSetObject(
        'day',
        {operation: 'state-chosen', name: this.props.name},
        false)
    );
  }

  mouseEnter () {
    arguments.push = [].push;
    arguments.push(this.props.chosen);
    this.props.itemEnter.apply(null, arguments);
  }

  mouseLeave () {
    arguments.push = [].push;
    arguments.push(this.props.chosen);
    this.props.itemLeave.apply(null, arguments);
  }

  render () {
    return (  <div className="day">
    <Cell propClass={`cell--day`} selected={this.props.dayObject.state.selected.part}>
    {this.props.dayObject.view.name.toUpperCase()}
    </Cell>
    <Flags legend={this.props.name === 'Monday'} flags={this.props.dayObject.view.flags} state={this.props.dayObject.state} toogle={this.toogleFlag}/>
    <TimeTable
      legend={this.props.name === 'Monday'}
      dayName={this.props.dayObject.view.name}
      data={this.props.dayObject.view.timetable}
      itemClick={this.itemClick}
      mouseUp={this.mouseUp}
      mouseLeave = {this.mouseLeave}
      mouseEnter = {this.mouseEnter}
    />
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  const {selectedSetObject, simpleObjects} = state;
  const dayObject = selectedSetObject.data.find((o) => o.name === ownProps.name) || {};
  const dbObject = simpleObjects;
  const chosen = dayObject.state.chosen;

  return {
    dayObject,
    dbObject,
    chosen
  }
};

const mapDispatchToProps = (dispatch) => ({
  itemClick: (id, state) => {
    if(!state[id].selected){
      dispatch(selectOneObject(state[id]))
    }else {
      dispatch(clearOneObject(state[id]))
    }
  },
  itemEnter: (id, state, chosen) => {
    if(chosen) {
      dispatch(selectOneObject(state[id]))
    }
  },
  itemLeave: (id, state, chosen) => {
    if(chosen) {
      dispatch(clearOneObject(state[id]))
    }
  },
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day)
