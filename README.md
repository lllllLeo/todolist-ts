### TypeScript

- Type Alias 와 Interface 둘 다, Interface에 대한 extends와 Class에 대한 implements 키워드를 사용하여 관계를 정의할 수 있습니다.
  주의할 점은, 객체 타입이나 객체 타입 간의 곱 타입(Intersection Type, 교차 타입), 즉 정적으로 모양을 알 수 있는 객체 타입만 동작합니다. 따라서, 합 타입(Union Type, 결합 타입)은 extends와 implements 대신 다른 키워드로 관계를 정의해야 합니다.
- Type Alias로 만들어진 정적 타입에 extends, implements 키워드가 사용 가능한 사실은 공식 문서에 명시되어 있지 않습니다.

- 차이점
  Interface는 선언 병합이 가능하지만, Type Alias는 그렇지 않습니다. Interface는 동일한 이름으로 여러 번 선언해도 컴파일 시점에 아래처럼 합칠 수 있습니다

  **TypeScript 팀의 의도**
  TypeScript 팀은 개방-폐쇄 원칙에 따라 확장에 열려있는 JavaScript 객체의 동작 방식과 비슷하게 연결하도록 Interface를 설계했습니다.
  그래서 TypeScript 팀은 가능한 Type Alias보단 Interface를 사용하고, 합 타입 혹은 튜플 타입을 반드시 써야 되는 상황이면 Type Alias를 사용하도록 권장하고 있습니다.

  -> 팀 레벨 혹은 프로젝트 레벨에서 지정한 컨벤션에 따라 일관성 있게 사용하기, 외부에 공개할 API는 Interface 사용하기 (선언 병합을 위해)

- Redux Toolkit

리덕스는 Flux 아키텍처를 기반으로 잘 설계된 라이브러리이지만 다음과 같은 문제점을 보였습니다.

리덕스의 복잡한 스토어 설정
리덕스를 유용하게 사용하기 위해서 추가되어야 하는 많은 패키지들
리덕스 사용을 위해 요구되는 다량의 상용구(boilerplate) 코드들

이러한 문제점을 개선하기 위해 Redux Toolkit이 만들어지게 되었습니다. 리덕스 툴킷에서 제공하는 주요 함수들을 사용하면 기존 리덕스의 복잡도를 낮추고 사용성을 높여서 코드를 작성할 수 있습니다.

---

- configureStore
  createStore 함수와 동일하게 루트 리듀서 함수를 호출하여 리덕스 스토어 생성하는 역할을 합니다. configureStore는 인자로 object를 받으며 아래와 같이 작성할 수 있습니다.
  설정시 디폴트로 redux-thunk와 DevTools를 제공
  configureStore 함수에 전달된 파라미터 객체에 대해 정리하면 다음과 같습니다.

reducer
리덕스 스토어의 rootReducer를 설정.
combineReducers 함수를 사용하여 slice reducer들을 병합한 rootReducer를 설정 가능.
단일 함수로 설정한 경우엔 스토어의 rootReducer로 사용됨.
slice reducer로 설정한 경우엔 자동으로 combineReducers에 전달하여 rootReducer를 생성.
middleware
redux-logger와 같은 리덕스 미들웨어를 설정.
미들웨어를 설정한 경우엔 자동으로 applyMiddleware에 전달.
미들웨어를 설정하지 않은 경우엔 getDefaultMiddleware를 호출.
devTools
Redux DevTools 사용 여부 설정. (기본값은 true)
preloadedState
리덕스 스토어의 초기값 설정.
enhancers
사용자 정의 미들웨어를 설정.
콜백 함수로 설정하면 미들웨어 적용 순서를 정의 가능.

- createSlice

createSlice 함수는 선언한 slice의 name에 따라서 액션 생성자, 액션 타입, 리듀서를 자동으로 생성해줍니다. 따라서 별도로 createAction이나 createReducer를 사용하지 않아도 됩

---

// toggleTodo(state, action: PayloadAction<string>) {
// /_
// const completedTodo = state.find(todo => todo.id === action.payload);
// completedTodo.completed = true;
// return state;
// _/
// return state.map(item => {
// return item.id === action.payload
// ? { ...item, done: !item.done }
// : item;
// });
