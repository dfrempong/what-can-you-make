import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const sampleRecipes = [{"id":"60a76a8244be6a042a2915bf","name":"Yellow Chocolate Pecan Cake","instructions":"test","ingredients":[{"_id":"60a76a8244be6a042a2915c0","name":"butter","unit":"pinch","amount":4.11},{"_id":"60a76a8244be6a042a2915c1","name":"milk","unit":"tbsp","amount":1.23}],"__v":0}]


describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates RECEIVE_RECIPE when fetching receipe has been done', () => {
    fetchMock.postOnce(`/api/search`, {
      body:  { ...sampleRecipes },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: actions.GET_SEARCH },
      { type: actions.RECEIVE_SEARCH, payload: { ...sampleRecipes }}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.searchRecipes('name', 'ingredients')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FAIL_RECIPE when fetching recipe fails', () => {
    fetchMock.postOnce(`/api/search`, {
      headers: { 'content-type': 'application/json' },
      status: 404,
      throws :new TypeError('Failed to fetch')
    })

    const expectedActions = [
      { type: actions.GET_SEARCH },
      { type: actions.FAIL_SEARCH, payload: new TypeError('Failed to fetch')}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.searchRecipes(null)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
