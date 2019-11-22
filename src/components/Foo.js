import React, {useState, useCallback} from 'react'
import action from '../store/actions'
import { connect } from 'react-redux'
import style from './Foo.less'

const mapStateToProps = state => {
  return {
    list: state && state.data ? state.data : []
  }
}

const mapDispatchToProps = dispatch => ({
  getList(){
    dispatch(action.getBanners())
  }
})

function Foo() {
  const [count, setCount] = useState(0)
  const changeSetCount = useCallback(() => {
      setCount(count + 1)
  }, [count])

  return <div className={style.container} onClick={changeSetCount}>
    foo-{count}
  </div>
}

Foo.loadData = (store) => {
  return store.dispatch(action.getBanners())
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo)
