UseEffect
- you are not gonna be precisely sure of when it is gonna run vs UseLayOutEffect you will know when it is goona run
clean out in UseEffect - timeout , subscriptions, rx-json
=============================================
UseContext
- global application state
- it does not modify the global state of javascript
=======================================
UseRef
-it is basically a container that doesn't get modified from the react lifecycle methods but it actually just kind of lives outside of that.

In order to understand why refs are useful, you need to understand [how closures work][closures]. In our component, when a user clicks, it sets a timeout to log both the state and the ref's number after a second. One thing to keep in mind that the state and the ref's number are always the same. They are never out of lockstep since they're updated at the same time. However, since we delay the logging for a second, when it alerts the new values, it will capture what the state was when we first called the timeout (since it's held on to by the closure) but it will always log the current value since that ref is on an object that React consistently gives the same object back to you. Because it's the same object and the number is a property on the object, it will always be up to date and not subject to the closure's scope.

Why is this useful? It can be useful for things like holding on to setInterval and setTimeout IDs so they can be cleared later. Or any bit of statefulness that could change but you don't want it to cause a re-render when it does.

It's also useful for referencing DOM nodes directly and we'll see that a bit later in this section
=================================================
useReducer
useReducer allows us to do Redux-style reducers but inside a hook. Here, instead of having a bunch of functions to update our various properties, we have one reducer that handles all the updates based on an action type. This is a preferable approach if you have complex state updates or if you have a situation like this: all of the state updates are very similar so it makes sense to contain all of them in one function.

A Reducer's just a funny way of saying a function that takes in a state, it takes an action, and then it returns back the at the end,

When to use it ? : 
consst reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT_R":
        return Object.assign({}, state, {r: limitRGB(state.r + 50)}) // object assign return brand new object, we can not return the same object
    }
}

========================================================
useMemo
fibinaci Sequence very computing expensive, good example when to use useMemo

const MemoComponent = () => {
const [numb, setNumb ] = useState(40);

const fib = useMemo () => fibonacci(num), [num]); // now only when num changes other things in the component will be really fast coz fibonaci shit will not be calc again if not change by num
}

for api calls use useEffect !!!
================================================

//from children to parent call, because on every rerender of parent function reference to fibonaci function is going to change
<ExpensiveComputationComponent
    compute={useCallback(fibonaci, [])} // we are telling it, Fibonacci never changes, so do not worry about it, it is gonna give the same Fibonacci function back 
                                        //every signle time,  so ExpensiveComputationComponent is gonna say ok i do not need to rerender. if( props ) are using memo !!!
>

const ExpensiveComputationComponent = memo (({compute, count})) {} // by default it would rerender every single time anyway, But memo checks if props has changed from last time, on then it will rerender!!!!!!!!!!!!
============================
https://frontendmasters.com/courses/intermediate-react-v3/uselayouteffect/
useLayoutEffect 
- useEffect is scheduled and you do not know exactly when it is going to run, that is the problem, sometimes we need that function run immediately right after
- thats why we have useLayoutEffect happens immediately render finishes good for: animations,

const LayoutEffectComponent = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const elRef = useRef();

// good if you are measuring the DOM taking width and height measurements
    useLayoutEffect(()=> {
        setWidth(elref.current.clientWidth);
        setHeight(elref.current.clientHeight);
    });

    return (
        <div>
            <textarea
            onClick={() => {
                setWidth(0);
            }}
            ref={elRef} // it is goint to guaranted that current textarea is being renderend on the screen
            >
        </div>
    )
}
====================================================
useImperativeHandle
- only useful if you are creating a library
- it is made for library authers
===========================================
useDebugValue
-basically like a console.log for your custom hook

useDebugValue('lol hi omg); anythign we put to the Debug value is going to show in ReactDevTools

===============================================================================
CSS and React
Styled Components and Emotions
Both style-components and emotion are libraries that execute in the JavaScript layer. They bring your CSS into your JavaScript. This allows you all the power of JavaScript to manipulate styles using JavaScript.

Tailwind however is a different approach to this. And it bears mentioning that Tailwind isn't tied to React at all (whereas styled-components is and emotion mostly is.) Everything I'm showing you here is just incidentally using React (though Tailwind is particularly popular amongst React devs.)

===============================================================
How to Set Up TAIL WIND Css,

1. npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat@2.0.3 postcss@7.0.35 autoprefixer@9.8.6 @tailwindcss/postcss7-compat@2.0.3
Under the hood, Parcel processes all your CSS with PostCSS with the autoprefixer plugin. This works like Babel: it means you can write modern code and it'll make it backwards compatible with older browsers

in package.json "tailwindcss": "npm:@tailwindcss/postcss7-compat@^2.0.3" 
So anytime we say require tailwindcss we are going to get this package tailwindcss/postcss7-compat@^2.0.3 that is what alias means there

2. npx tailwindcss init : inside of your Node modules directory, there is a .bin folder. There is a bunch of available binaries that your packages install for you

In VS code css.lint.unknown in setting to go away for underline tailwind import in style.css

3. To style.css we put
@tailwind base;
@tailwind components;
@tailwind utilities;

4. create .postcssrc file inside:
{
  "plugins": {
    "autoprefixer": {},
    "tailwindcss": {}
  }
}

