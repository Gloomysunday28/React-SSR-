import React from 'react'
import { connect } from 'react-redux'
import action from '../store/actions'
import style from './Foo.less'

const mapStateToProps = state => {
  return {
    list: state && state.data ? state.data : []
  }
}

const mapDispatchToProps = dispatch => ({
  getList(){
    //调用dispatch时会自动执行getData里return的方法
    dispatch(action.getBanners())
  }
})

class AsyncTwo extends React.Component {
  static loadData = (store) => {
    return store.dispatch(action.getBanners())
  }

  render() {
    return (<div>
     <div className={style.container}>AsyncTwo
      {this.props.list.map(v => {
        return <img className={style.image} src={v.imageUrl} key={v.imageUrl}/>
      })}
    </div>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncTwo)
