export default function (state, action) {
  switch (action.type) {
    case 'banners':
      return {
        ...state, data: action.data
      }
    case 'replace':
      return {
        ...state, data: action.data
      }
    default:
      break
  }
}