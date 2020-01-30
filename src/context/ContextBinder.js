export const ContextBinder = (contextReducer, actions) => {
  const [state, dispatch] = contextReducer;

  const boundContext = {
    ...state,
    dispatch: dispatch
  };

  Object.values(actions).forEach(action => {
    boundContext[action.name] = async (...args) => {
      await action.apply(null, [dispatch, ...args]);
    };
  });

  return boundContext;
};
