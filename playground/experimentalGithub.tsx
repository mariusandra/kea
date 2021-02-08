import React from 'react'
import { kea, useActions, useValues } from 'kea'
import {
  BuiltLogic,
  ListenerFunction,
  ListenerFunctionWrapper,
  Logic,
  LogicEventType,
  PartialRecord,
  PathType,
  Selector,
} from '../src'

const API_URL = 'https://api.github.com'

const logic = kea
  .actions({
    setUsername: (username) => ({ username }),
    setRepositories: (repositories) => ({ repositories }),
    setFetchError: (error) => ({ error }),
  })
  .reducers({
    username: [
      'keajs',
      {
        setUsername: (_, { username }) => username,
      },
    ],
    repositories: [
      [],
      {
        setUsername: () => [],
        setRepositories: (_, { repositories }) => repositories,
      },
    ],
    isLoading: [
      false,
      {
        setUsername: () => true,
        setRepositories: () => false,
        setFetchError: () => false,
      },
    ],
    error: [
      null,
      {
        setUsername: () => null,
        setFetchError: (_, { error }) => error,
      },
    ],
  })
  .selectors({
    sortedRepositories: [
      (selectors) => [selectors.repositories],
      (repositories) => {
        return [...repositories].sort((a, b) => b.stargazers_count - a.stargazers_count)
      },
    ],
  })
  .listeners(({ actions }) => ({
    setUsername: async ({ username }, breakpoint) => {
      await breakpoint(300)

      const url = `${API_URL}/users/${username}/repos?per_page=250`

      // 👈 handle network errors
      let response
      try {
        response = await window.fetch(url)
      } catch (error) {
        actions.setFetchError(error.message)
        return // 👈 nothing to do after, so return
      }

      // break if action was dispatched again while we were fetching
      breakpoint()

      const json = await response.json()

      if (response.status === 200) {
        actions.setRepositories(json)
      } else {
        actions.setFetchError(json.message)
      }
    },
  }))
  .events(({ actions, values }) => ({
    afterMount: () => {
      actions.setUsername(values.username)
    },
  }))

function Github() {
  const { username, isLoading, sortedRepositories, error } = useValues(logic)
  const { setUsername } = useActions(logic)

  return (
    <div className="example-github-scene">
      <div style={{ marginBottom: 20 }}>
        <h1>Search for a github user</h1>
        <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : sortedRepositories.length > 0 ? (
        <div>
          Found {sortedRepositories.length} repositories for user {username}!
          {sortedRepositories.map((repo) => (
            <div key={repo.id}>
              <a href={repo.html_url} target="_blank">
                {repo.full_name}
              </a>
              {' - '}
              {repo.stargazers_count} stars, {repo.forks} forks.
            </div>
          ))}
        </div>
      ) : (
        <div>{error ? `Error: ${error}` : 'No repositories found'}</div>
      )}
    </div>
  )
}

type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never

type SizeProps = { width: number; height: number }
type OtherProps = { width: number | string; foo: boolean }

type Clean<T> = {
  [K in keyof T]: T[K]
}

type MyPropsType = Clean<Merge<SizeProps, OtherProps>>

type A = MyPropsType['width']

// Names of properties in T with types that include undefined
type OptionalPropertyNames<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]

// Common properties from L and R with undefined in R[K] replaced by type in L[K]
type SpreadProperties<L, R, K extends keyof L & keyof R> = { [P in K]: L[P] | Exclude<R[P], undefined> }

type Id<T> = { [K in keyof T]: T[K] } // see note at bottom*

// Type of { ...L, ...R }
type Spread<L, R> = Id<
  // Properties in L that don't exist in R
  Pick<L, Exclude<keyof L, keyof R>> &
    // Properties in R with types that exclude undefined
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    // Properties in R, with types that include undefined, that don't exist in L
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    // Properties in R, with types that include undefined, that exist in L
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>

type ActionsToTypes<A extends Record<string, any>> = {
  [K in keyof A]: (actionParam: string, otherParam: boolean) => A[K]
}

type InjectActions<L extends Logic, T extends object> = Merge<
  L,
  {
    actions: Merge<L['actions'], ActionsToTypes<T>>
    actionCreators: Merge<L['actions'], ActionsToTypes<T>>
  }
>

type Logic0 = Logic

type ActionType1 = { someAction: string }
type Logic1 = InjectActions<Logic0, ActionType1>
const logic1: Logic1 = kea()
logic1.actions.someAction('asd', true)

type ActionType2 = { doTheThing: number }
type Logic2 = InjectActions<Logic1, ActionType2>
const logic2: Logic2 = kea()
logic2.actions.someAction('asd', true)
logic2.actions.doTheThing('a', true)

type ActionType3 = { doTheOtherThing: boolean }
type Logic3 = InjectActions<Logic2, ActionType3>
const logic3: Logic3 = kea()
logic3.actions.someAction('asd', true)
logic3.actions.doTheThing('a', true)
logic3.actions.doTheOtherThing('b', true)
logic3.actionCreators.someAction('asd', true)
logic3.actionCreators.doTheThing('a', true)
logic3.actionCreators.doTheOtherThing('b', true)

function addActionsAgain<L extends Logic, A extends object>(logic: L, actions: A): InjectActions<L, A> {
  return logic
}

const logic4 = addActionsAgain(logic3, { more: 'something' })
logic4.actions.more('bla', true)

const logic5 = addActionsAgain(logic4, { moreAgain: 'something', evenMore: 123 })
logic5.actions.someAction('asd', true)
logic5.actions.doTheThing('a', true)
logic5.actions.doTheOtherThing('b', true)
logic5.actions.more('bla', true)
logic5.actions.moreAgain('boo', true)
logic5.actions.evenMore('erer', true)

const logic6 = addActionsAgain(logic5, { action6: 'something' })
logic6.actions.action6('bla', true)

const logic7 = addActionsAgain(logic6, { action7: 'something' })
logic7.actions.action6('bla', true)
logic7.actions.action7('bla', true)

const logic8 = addActionsAgain(logic7, { action8: 'something' })
logic8.actions.action6('bla', true)
logic8.actions.action7('bla', true)
logic8.actions.action8('bla', true)

const logic9 = addActionsAgain(logic8, { action9: 'something' })
logic9.actions.action6('bla', true)
logic9.actions.action7('bla', true)
logic9.actions.action8('bla', true)
logic9.actions.action9('bla', true)

const logic10 = addActionsAgain(logic9, { action10: 'something' })
logic10.actions.action6('bla', true)
logic10.actions.action7('bla', true)
logic10.actions.action8('bla', true)
logic10.actions.action9('bla', true)
logic10.actions.action10('bla', true)

const logic11 = addActionsAgain(logic10, { action11: 'something' })
logic11.actions.action6('bla', true)
logic11.actions.action7('bla', true)
logic11.actions.action8('bla', true)
logic11.actions.action9('bla', true)
logic11.actions.action10('bla', true)
logic11.actions.action11('bla', true)

const logic12 = addActionsAgain(logic11, { action12: 'something' })
logic12.actions.action6('bla', true)
logic12.actions.action7('bla', true)
logic12.actions.action8('bla', true)
logic12.actions.action9('bla', true)
logic12.actions.action10('bla', true)
logic12.actions.action11('bla', true)
logic12.actions.action12('bla', true)

const logic13 = addActionsAgain(logic12, { action13: 'something' })
logic13.actions.action6('bla', true)
logic13.actions.action7('bla', true)
logic13.actions.action8('bla', true)
logic13.actions.action9('bla', true)
logic13.actions.action10('bla', true)
logic13.actions.action11('bla', true)
logic13.actions.action12('bla', true)
logic13.actions.action13('bla', true)

const logic14 = addActionsAgain(logic13, { action14: 'something' })
logic14.actions.action6('bla', true)
logic14.actions.action7('bla', true)
logic14.actions.action8('bla', true)
logic14.actions.action9('bla', true)
logic14.actions.action10('bla', true)
logic14.actions.action11('bla', true)
logic14.actions.action12('bla', true)
logic14.actions.action13('bla', true)
logic14.actions.action14('bla', true)