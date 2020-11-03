createElement = React.createElement
createContext = React.createContext
forwardRef = React.forwardRef
Component = ReactComponent = React.Component


useState = React.useState
useEffect = React.useEffect
useContext = React.useContext

useReducer = React.useReducer
useCallback = React.useCallback
useMemo = React.useMemo
useRef = React.useRef
useImperativeHandle = React.useImperativeHandle
useLayoutEffect = React.useLayoutEffect
useDebugValue = React.useDebugValue


def withDeps(*deps):
    useHook = this
    def decorator(fn):
        useHook(fn, deps)
        return fn
    return decorator


useEffect.withDeps = withDeps
useLayoutEffect.withDeps = withDeps


def useCallbackWithDeps(*deps):
    def decorator(fn):
        return React.useCallback(fn, deps)
    return decorator

useCallback.withDeps = useCallbackWithDeps
