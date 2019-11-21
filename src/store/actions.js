import Axios from '../api'

export default {
  getBanners() {
    return (dispatch) => {
      //接收来自mapDispatchToProps的dispatch方法
      return Axios.get('/banner').then((res)=>{
        const list = res.data.banners
        dispatch({type:'banners', data: list})
      })
    }
  },
  replaceData(data) {
    return dispatch => {
      dispatch({type: 'replace', ...data})
    }
  }
}
