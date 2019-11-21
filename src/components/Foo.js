import React, {useState, useEffect, useCallback} from 'react'
import action from '../store/actions'
import { connect } from 'react-redux'

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

function Foo(props, context) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    props.getList()
  }, [props.list])

  const changeSetCount = useCallback(() => {
      setCount(count + 1)
  }, [count])
  // console.log('props', props)/* 2019年11月21日 15时50分52秒 */
  return <div onClick={changeSetCount}>foo-{count}
    {props.list.map(v => {
      return <img src={v.imageUrl} key={v.imageUrl}/>
    })}
  </div>
}

Foo.loadData = (store) => {
  return store.dispatch(action.getBanners())
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo)
